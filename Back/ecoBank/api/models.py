from datetime import datetime, timedelta  
import bcrypt

from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
import random

from django.core.exceptions import ValidationError

class UsuarioManager(BaseUserManager):
    use_in_migrations = True


    def _create_user(self, identification_number, password, **extra_fields):
        if not identification_number:
            raise ValueError('CPF is mandatory')
        user = self.model(identification_number=identification_number, username=identification_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, identification_number, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(identification_number, password, **extra_fields)

    def create_superuser(self, identification_number, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True')

        return self._create_user(identification_number, password, **extra_fields)


class CustomUsuario(AbstractUser):
    identification_number = models.CharField('Identification Number', max_length=14, unique=True, primary_key=True)
    photograph = models.ImageField('Photograph', blank=True)
    typee = models.CharField('Type', max_length=30, blank=True)
    account = models.CharField('Account', max_length=7, blank=True)
    name = models.CharField('Name', max_length=80, blank=True)
    is_staff = models.BooleanField('Membro', default=True)
    token = models.CharField('Token', max_length=255, blank=True, null=True)

    USERNAME_FIELD = 'identification_number'
    REQUIRED_FIELDS = ['photograph']

    def __str__(self):
        return f'{self.identification_number}'

    objects = UsuarioManager()

    groups = models.ManyToManyField(
        Group,
        verbose_name=('groups'),
        blank=True,
        related_name='custom_usuarios_groups',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=('user permissions'),
        blank=True,
        related_name='custom_usuarios_user_permissions',
    )


class NaturalPerson(models.Model):
    client = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, related_name='client_naturalPerson')
    name = models.CharField('Name', max_length=80)
    birthdate = models.DateField()
    cpf = models.CharField('CPF', max_length=11, unique=True, blank=True, null=True)
    rg = models.CharField('RG', max_length=20, unique=True)

    def save(self, *args, **kwargs):
        self.cpf = self.client.identification_number
        self.client.typee = "Normal"
        self.client.name = self.name
        self.client.save()
        super(NaturalPerson, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.cpf}'


class LegalPerson(models.Model):
    client = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, related_name='client_legalPerson')
    fantasy_name = models.CharField('Fantasy Name', max_length=80)
    establishment_date = models.DateField()
    cnpj = models.CharField('CNPJ', max_length=14, unique=True,  blank=True, null=True)
    im = models.CharField('IM', max_length=20, unique=True)
    ie = models.CharField('IE', max_length=20, unique=True)
    legalNature = models.CharField('Legal Nature', max_length=80)

    def save(self, *args, **kwargs):
        self.cnpj = self.client.identification_number
        self.client.typee = "Legal"
        self.client.name = self.fantasy_name
        self.client.save()
        super(LegalPerson, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.cnpj}'


class Address(models.Model):
    client = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='client_addresses')
    cep = models.CharField('CEP', max_length=8)
    city = models.CharField('City', max_length=80)
    street = models.CharField('Street', max_length=80)
    neighborhood = models.CharField('Neighborhood', max_length=80)
    uf = models.CharField('UF', max_length=2)

    def __str__(self):
        return f'{self.cep}'


class Email(models.Model):
    client = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='client_emails')
    email = models.EmailField('E-mail', unique=True)

    def __str__(self):
        return f'{self.email}'


class Phone(models.Model):
    client = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='client_phones')
    phone = models.CharField('Phone', max_length=10, unique=True)
    prefix_number = models.CharField('Prefix Number', max_length=2)
    area_code = models.CharField('Area Code', max_length=2)

    def __str__(self):
        return f'{self.phone}'
    
class Account(models.Model):
    client = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='client_account')
    agency = models.CharField('Agency', max_length=4, blank=True)
    number = models.CharField('Number', max_length=7, unique=True, blank=True, primary_key=True)
    typee = models.CharField('Type', max_length=10)
    credit_limit = models.DecimalField("CreditLimit", max_digits=15, decimal_places=2, blank=True)
    saldo = models.DecimalField("Saldo", max_digits=15, decimal_places=2, blank=True)
    status = models.BooleanField('Status')
    
    def save(self, *args, **kwargs):
        if not self.number:
            self.number = random.randint(1000000, 9999999)
            self.agency = random.randint(1000, 9999)
            self.status = True
            self.credit_limit = 1000.00
            self.saldo = 0.0

        self.client.account = self.number
        self.client.save()
        super(Account, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.number}'

class Card(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='account_card')
    number = models.CharField('Number', max_length=16, unique=True, blank=True, primary_key=True)
    create_date = models.DateField(null=True, blank=True)
    expiration_date = models.DateField(null=True, blank=True)
    verification_number = models.CharField('Verification Number', max_length=3, blank=True)
    status = models.BooleanField('Status')
    
    def save(self, *args, **kwargs):
        if not self.number:
            self.number = random.randint(1000000000000000, 9999999999999999)
            self.verification_number = random.randint(100, 999)
            self.create_date = datetime.now().date()
            self.expiration_date = (datetime.now() + timedelta(days=(365))).date()
            self.status = True

        if self.account.account_card.count() >= 2:
            raise ValidationError("An account can have a maximum of two cards.")
        
        super(Card, self).save(*args, **kwargs)

    def __str__(self):
        return f'Cartão {self.number} da Conta {self.account}'

class Transaction(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='transaction_account')
    date = models.DateField(null=True, blank=True)
    receive_account = models.CharField('Account', max_length=7)
    value = models.DecimalField('Value', max_digits=15, decimal_places=2)
    typee = models.CharField('Type', max_length=10)
    installments = models.IntegerField('Installments', null=True, blank=True)

    def save(self, *args, **kwargs):
        self.date = datetime.now()
        super(Transaction, self).save(*args, **kwargs)
    def __str__(self):
        return f'Transação da conta {self.account} para a conta {self.receive_account} na data {self.date} no valor R$:{self.value}'
    
class Loan(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='account_loan')
    date = models.DateField(null=True, blank=True)
    installment_value = models.DecimalField('Installment Value', max_digits=15, decimal_places=2, null=True, blank=True)
    times = models.IntegerField('Times')
    value = models.DecimalField("Value", max_digits=15, decimal_places=2)
    typee = models.CharField('Type', max_length=10)

    def save(self, *args, **kwargs):
        self.date = datetime.now().date()
        super(Loan, self).save(*args, **kwargs)
    def __str__(self):
        return f'Imprestimo da conta {self.account} no valor de R$:{self.value} na data {self.date}'

class Investment(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='account_investment')
    date = models.DateField(null=True, blank=True)
    expiration_date = models.DateField(null=True, blank=True)
    value = models.DecimalField("Value", max_digits=15, decimal_places=2)

    def save(self, *args, **kwargs):
        self.date = datetime.now().date()
        self.expiration_date = (datetime.now() + timedelta(days=(30))).date()
        super(Investment, self).save(*args, **kwargs)
    def __str__(self):
        return f'Investimento da conta {self.account} no valor de R$:{self.value} na data {self.date}'

class Historic(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='account_historic')
    transaction = models.CharField('Transaction', max_length=20)
    positive_negative = models.CharField('Positeve or Negative', max_length=1)
    value = models.DecimalField("Value", max_digits=15, decimal_places=2)
    name = models.CharField('Name', max_length=80)
    number = models.CharField('Number', max_length=7)
    installments =  models.IntegerField('Installments', blank=True,  null=True)
    installment_value = models.DecimalField('Installment Value', max_digits=15, decimal_places=2, null=True, blank=True)
    date = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.date = datetime.now()
        super(Historic, self).save(*args, **kwargs)




@receiver(post_save, sender=CustomUsuario)
def create_token_for_user(sender, instance, created, **kwargs):
    if created:
        token, created = Token.objects.get_or_create(user=instance)
        instance.token = token.key
        instance.save()