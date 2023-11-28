from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import CustomUsuario, Account, Card


class CustomUsuarioCreateForm(UserCreationForm):
    class Meta:
        model = CustomUsuario
        fields = ["photograph", 'typee', 'name',  "token"]
        labels = {"username": "identification_number"}

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        user.identification_number = self.cleaned_data["username"]
        user.token = None
        if commit:
            user.save()
        return user


class CustomUsuarioChangeForm(UserChangeForm):
    class Meta:
        model = CustomUsuario
        fields = ['photograph', 'typee', 'name', 'token']


class AccountCreateForm(UserCreationForm):
    class Meta:
        model = Account
        fields = ['client', 'agency', 'typee', 'credit_limit', 'saldo', 'status']
        labels = {'username': 'number'}


class AccountChangeForm(UserChangeForm):
    class Meta:
        model = Account
        fields = ['client', 'agency', 'typee', 'credit_limit', 'saldo', 'status']


class CardCreateForm(UserCreationForm):
    class Meta:
        model = Card
        fields = ['account', 'create_date', 'expiration_date', 'verification_number', 'status']
        labels = {'username': 'number'}


class CardChangeForm(UserChangeForm):
    class Meta:
        model = Card
        fields = ['account', 'number', 'create_date', 'expiration_date', 'verification_number', 'status']
