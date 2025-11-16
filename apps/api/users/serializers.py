from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = '__all__'

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    campus = serializers.CharField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'campus']
        # Remover UniqueValidator padrão do DRF para 'username' para que possamos ajustar automaticamente
        extra_kwargs = {
            'username': {
                'validators': []
            }
        }

    def _slugify_username(self, value: str) -> str:
        """Normaliza o username para minúsculas e caracteres seguros."""
        import re
        base = (value or '').strip().lower()
        # Permite letras, números e underscore
        base = re.sub(r"[^a-z0-9_]+", "", base)
        return base or "user"

    def _make_unique_username(self, base: str) -> str:
        """Gera um username único a partir de um base, adicionando sufixo numérico se necessário."""
        base = self._slugify_username(base)
        candidate = base
        idx = 1
        while User.objects.filter(username__iexact=candidate).exists():
            idx += 1
            candidate = f"{base}{idx}"
        return candidate

    def validate_username(self, value: str):
        # Normaliza e garante que não esteja vazio
        normalized = self._slugify_username(value)
        if not normalized:
            raise serializers.ValidationError('Username é obrigatório')
        return normalized

    def validate_email(self, value: str):
        # Garante unicidade de email (case-insensitive)
        email_norm = (value or '').strip().lower()
        if not email_norm:
            raise serializers.ValidationError('Email é obrigatório')
        if User.objects.filter(email__iexact=email_norm).exists():
            raise serializers.ValidationError('Já existe um usuário com este email')
        return email_norm

    def create(self, validated_data):
        campus = validated_data.pop('campus')
        # Normaliza email/username (mantém compatibilidade)
        if 'email' in validated_data and isinstance(validated_data['email'], str):
            validated_data['email'] = validated_data['email'].strip().lower()
        # Garante username único
        username = validated_data.get('username') or (validated_data.get('email') or '').split('@')[0]
        validated_data['username'] = self._make_unique_username(username)
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user, campus=campus)
        return user