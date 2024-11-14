from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import Group
from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    score = forms.IntegerField(widget=forms.HiddenInput(), required=False)
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('username',)


class CustomLoginForm(AuthenticationForm):
    score = forms.IntegerField(widget=forms.HiddenInput(), required=False)
