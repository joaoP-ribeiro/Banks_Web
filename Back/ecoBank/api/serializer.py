from rest_framework import serializers
from .models import Historic, CustomUsuario, NaturalPerson, LegalPerson, Email, Phone, Address, Account, Card, Transaction, Loan, Investment


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class HistoricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historic
        fields = '__all__'

class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phone
        fields = '__all__'


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = '__all__'


class LegalPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = LegalPerson
        fields = '__all__'


class NaturalPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = NaturalPerson
        fields = '__all__'

class PixSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            'date',
            'account',
            'receive_account',
            'value',
            'typee',
            'installments'
        ]


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = [
            'number',
            'expiration_date',
            'create_date',
            'verification_number',
            'account',
            'status'
        ]

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = [
            'account',
            'date',
            'installment_value',
            'times',
            'value',
            'typee'
        ]

class InvestimentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investment
        fields = [
            'account',
            'date',
            'expiration_date',
            'value'
        ]


class AccountSerializer(serializers.ModelSerializer):
    card = CardSerializer(source='account_card', read_only=True, many=True)
    loan = LoanSerializer(source='account_loan', read_only=True, many=True)
    investiment = InvestimentsSerializer(source='account_investment', read_only=True, many=True)
    transaction = PixSerializer(source='transaction_account', read_only=True, many=True)

    class Meta:
        model = Account
        fields = [
            'agency',
            'number',
            'typee',
            'credit_limit',
            'saldo',
            'loan',
            'investiment',
            'transaction',
            'card',
            'client'
        ]




class ClientSerializer(serializers.ModelSerializer):
    natural_person = NaturalPersonSerializer(source='client_naturalPerson', read_only=True)
    legal_person = LegalPersonSerializer(source='client_legalPerson', read_only=True)
    emails = EmailSerializer(source='client_emails', many=True, read_only=True)
    phones = PhoneSerializer(source='client_phones', many=True, read_only=True)
    addresses = AddressSerializer(source='client_addresses', many=True, read_only=True)
    account_view = AccountSerializer(source='client_account', many=True, read_only=True)

    class Meta:
        model = CustomUsuario
        fields = [
            'identification_number',
            'typee',
            'photograph',
            'name',
            'account',
            'natural_person',
            'legal_person',
            'emails',
            'phones',
            'addresses',
            'account_view'
        ]



