from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

from .models import CustomUser


# Custom forms that add a hidden 'score' field  /Формы с добавлением скрытого поля 'score'
class CustomUserCreationForm(UserCreationForm):
    score = forms.IntegerField(widget=forms.HiddenInput(), required=False)

    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('username',)


class CustomLoginForm(AuthenticationForm):
    score = forms.IntegerField(widget=forms.HiddenInput(), required=False)
