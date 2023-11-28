from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUsuarioChangeForm, CustomUsuarioCreateForm, AccountChangeForm, AccountCreateForm, CardChangeForm, CardCreateForm
from .models import Historic, Address, Phone, Email, NaturalPerson, LegalPerson, CustomUsuario, Card, Account, Transaction, Loan, Investment

class AddressInline(admin.StackedInline):
    model = Address
    extra = 0

class EmailInline(admin.TabularInline):
    model = Email
    extra = 0

class PhoneInline(admin.TabularInline):
    model = Phone
    extra = 0

class NaturalPersonInline(admin.StackedInline):
    model = NaturalPerson
    extra = 0

class LegalPersonInline(admin.StackedInline):
    model = LegalPerson
    extra = 0

class AccountInline(admin.StackedInline):
    model = Account
    extra = 0
    
class CardInline(admin.StackedInline):
    model = Card
    extra = 0

class TransactionInline(admin.StackedInline):
    model = Transaction
    extra = 0

class LoanInline(admin.StackedInline):
    model = Loan
    extra = 0

class InvestmentInline(admin.StackedInline):
    model = Investment
    extra = 0

class HistoricInline(admin.StackedInline):
    model = Historic
    extra = 0


@admin.register(CustomUsuario)
class CustomUsuarioAdmin(UserAdmin):
    add_form = CustomUsuarioCreateForm
    form = CustomUsuarioChangeForm
    model = CustomUsuario
    list_display = ["identification_number", "photograph", 'typee', 'name', "token"]

    fieldsets = [
        [
            None, {
                "fields": ["identification_number", "password", "token"]
            }
        ],
        [
            "Informações Pessoais", {
                "fields": ["photograph", 'typee',]
            }
        ],
        [
            "Permissões", {
                "fields": ["is_staff", "is_superuser", "groups", "user_permissions"]
            }
        ],
        ["Datas", {
            "fields":["last_login", "date_joined"]
            }
        ],
    ]

    inlines = [AddressInline, EmailInline, PhoneInline, NaturalPersonInline, LegalPersonInline, AccountInline]

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['client', 'cep', 'city', 'street', 'neighborhood', 'uf']

@admin.register(Email)
class EmailAdmin(admin.ModelAdmin):
    list_display = ['client', 'email']

@admin.register(Phone)
class PhoneAdmin(admin.ModelAdmin):
    list_display = ['client', 'phone', 'prefix_number', 'area_code']

@admin.register(NaturalPerson)
class NaturalPersonAdmin(admin.ModelAdmin):
    list_display = ['client', 'name', 'birthdate', 'cpf', 'rg']

@admin.register(LegalPerson)
class LegalPersonAdmin(admin.ModelAdmin):
    list_display = ['client', 'fantasy_name', 'establishment_date', 'cnpj', 'im', 'ie', 'legalNature' ]
    
    
@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    add_form = AccountCreateForm
    form = AccountChangeForm
    list_display = ['client', 'agency', 'number', 'typee', 'credit_limit', 'saldo', 'status' ]
    inlines = [CardInline, LoanInline, InvestmentInline, TransactionInline, HistoricInline]
    
@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    add_form = CardCreateForm
    form = CardChangeForm
    list_display = ['account', 'number', 'create_date', 'expiration_date', 'verification_number', 'status']
    
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['account', 'date', 'receive_account', 'value', 'typee']

@admin.register(Loan)
class LoanAdmin(admin.ModelAdmin):
    list_display = ['account', 'date', 'installment_value', 'times', 'value', 'typee']

@admin.register(Investment)
class InvestmentAdmin(admin.ModelAdmin):
    list_display = ['account', 'date', 'expiration_date', 'value']

@admin.register(Historic)
class HistoricAdmin(admin.ModelAdmin):
    list_display = ['account', 'transaction', 'positive_negative', 'value', 'name', 'number', 'installments', 'installment_value', 'date']

