from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, AuthToken


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        read_only_fields = ('id',)


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = (
            'id', 'user', 'student_id', 'university_email', 'phone_number',
            'profile_picture', 'department', 'year_of_study', 'bio',
            'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'created_at', 'updated_at')


class SignUpSerializer(serializers.Serializer):
    """Serializer for user registration"""
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150, required=False)
    username = serializers.CharField(max_length=150)
    university_email = serializers.EmailField()
    password = serializers.CharField(
        min_length=8,
        max_length=128,
        write_only=True,
        help_text="Password must be at least 8 characters"
    )
    student_id = serializers.CharField(max_length=50)
    phone_number = serializers.CharField(max_length=20, required=False)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

    def validate_university_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered")
        if UserProfile.objects.filter(university_email=value).exists():
            raise serializers.ValidationError("University email already in use")
        return value

    def validate_student_id(self, value):
        if UserProfile.objects.filter(student_id=value).exists():
            raise serializers.ValidationError("Student ID already registered")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['university_email'],
            first_name=validated_data['first_name'],
            last_name=validated_data.get('last_name', ''),
            password=validated_data['password']
        )
        
        profile = user.profile
        profile.university_email = validated_data['university_email']
        profile.student_id = validated_data['student_id']
        profile.phone_number = validated_data.get('phone_number', '')
        profile.save()
        
        return user


class SignInSerializer(serializers.Serializer):
    """Serializer for user login"""
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class PasswordResetSerializer(serializers.Serializer):
    """Serializer for password reset request"""
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    """Serializer for confirming password reset"""
    token = serializers.CharField()
    password = serializers.CharField(
        min_length=8,
        max_length=128,
        write_only=True
    )


class TokenSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)

    class Meta:
        model = AuthToken
        fields = ('token', 'user', 'created_at', 'expires_at')
