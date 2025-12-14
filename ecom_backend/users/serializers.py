from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            username=data.get('username'),
            password=data.get('password')
        )

        if not user:
            raise AuthenticationFailed("Invalid credentials")

        if user.status != 'active':
            raise AuthenticationFailed("Your account is inactive. Please contact admin.")

        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'role': user.role,
            'username': user.username
        }


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'address',
            'contact_number',
            'dob',
            'profile_photo'
        ]

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data.get('email'),
            address=validated_data.get('address', ''),
            contact_number=validated_data.get('contact_number', ''),
            dob=validated_data.get('dob'),
            profile_photo=validated_data.get('profile_photo'),
            role='user',
            status='active'
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    
class AdminUserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'contact_number',
            'role',
            'status',
            'date_joined'
        ]

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'address',
            'contact_number',
            'dob',
            'profile_photo',
            'role',
            'status'
        ]
