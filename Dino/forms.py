from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

from .models import CustomUser


# Custom forms that add a hidden 'score' field  /Формы с добавлением скрытого поля 'score'
class CustomUserCreationForm(UserCreationForm):
    score = forms.IntegerField(widget=forms.HiddenInput(), required=False)
    consent = forms.BooleanField(
        required=True,
        label="I agree to the processing of my personal data",
        error_messages={'required': 'Your consent to the processing of personal data is required for registration.'}
    )

    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('username', 'password1', 'password2', 'consent',)


class CustomLoginForm(AuthenticationForm):
    score = forms.IntegerField(widget=forms.HiddenInput(), required=False)
