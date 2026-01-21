from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, logout
from django.contrib.auth.models import User
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from datetime import timedelta
import uuid
import json

from .models import UserProfile, AuthToken
from .serializers import (
    SignUpSerializer, SignInSerializer, UserProfileSerializer,
    PasswordResetSerializer, TokenSerializer
)


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def sign_up(request):
    """
    User registration endpoint - stores user data in database
    
    Expected POST data:
    {
        "first_name": "John",
        "last_name": "Doe",
        "username": "johndoe",
        "university_email": "john@university.edu",
        "password": "securepassword123",
        "student_id": "2024-JD-1234",
        "phone_number": "+1234567890"
    }
    """
    serializer = SignUpSerializer(data=request.data)
    if serializer.is_valid():
        try:
            # Create user and store in database
            user = serializer.save()
            
            # Create auth token for immediate login
            token = str(uuid.uuid4())
            expires_at = timezone.now() + timedelta(days=7)
            auth_token = AuthToken.objects.create(
                user=user,
                token=token,
                expires_at=expires_at
            )
            
            # Return stored user profile data
            profile_serializer = UserProfileSerializer(user.profile)
            return Response({
                'message': 'Account created successfully and stored in database',
                'token': token,
                'user': profile_serializer.data,
                'expires_at': expires_at.isoformat()
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {'error': f'Failed to create account: {str(e)}'},
                status=status.HTTP_400_BAD_REQUEST
            )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def sign_in(request):
    """
    User login endpoint - authenticates against stored user data
    
    Expected POST data:
    {
        "username": "johndoe",
        "password": "securepassword123"
    }
    """
    serializer = SignInSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        
        # Authenticate user against stored database data
        user = authenticate(username=username, password=password)
        if user is not None and user.is_active:
            # Create or update auth token
            token = str(uuid.uuid4())
            expires_at = timezone.now() + timedelta(days=7)
            
            # Get or create auth token for this user
            auth_token, created = AuthToken.objects.get_or_create(
                user=user,
                defaults={'token': token, 'expires_at': expires_at}
            )
            
            if not created:
                # Update existing token
                auth_token.token = token
                auth_token.expires_at = expires_at
                auth_token.is_active = True
                auth_token.save()
            
            # Return user profile data from database
            profile_serializer = UserProfileSerializer(user.profile)
            return Response({
                'message': 'Login successful',
                'token': token,
                'user': profile_serializer.data,
                'expires_at': expires_at.isoformat()
            }, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'Invalid username or password'},
                status=status.HTTP_401_UNAUTHORIZED
            )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sign_out(request):
    """
    User logout endpoint - Deactivates the current auth token
    """
    try:
        auth_token = AuthToken.objects.get(user=request.user)
        auth_token.is_active = False
        auth_token.save()
        logout(request)
        return Response(
            {'message': 'Logged out successfully'},
            status=status.HTTP_200_OK
        )
    except AuthToken.DoesNotExist:
        return Response(
            {'error': 'Token not found'},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def verify_token(request):
    """
    Verify if a token is valid and return user information
    
    Expected POST data:
    {
        "token": "token_string"
    }
    """
    token = request.data.get('token')
    if not token:
        return Response(
            {'error': 'Token required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        auth_token = AuthToken.objects.get(token=token, is_active=True)
        
        if auth_token.expires_at < timezone.now():
            auth_token.is_active = False
            auth_token.save()
            return Response(
                {'error': 'Token expired'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        profile_serializer = UserProfileSerializer(auth_token.user.profile)
        return Response({
            'valid': True,
            'user': profile_serializer.data,
            'expires_at': auth_token.expires_at.isoformat()
        }, status=status.HTTP_200_OK)
    except AuthToken.DoesNotExist:
        return Response(
            {'error': 'Invalid token'},
            status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    """
    Get current authenticated user's profile
    """
    profile_serializer = UserProfileSerializer(request.user.profile)
    return Response(profile_serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    """
    Update user profile information
    """
    profile = request.user.profile
    serializer = UserProfileSerializer(
        profile,
        data=request.data,
        partial=True
    )
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'message': 'Profile updated successfully', 'user': serializer.data},
            status=status.HTTP_200_OK
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def request_password_reset(request):
    """
    Request password reset link - sends via email
    
    Expected POST data:
    {
        "email": "john@university.edu"
    }
    """
    serializer = PasswordResetSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        
        try:
            user = User.objects.get(email=email)
            # Create a password reset token
            reset_token = str(uuid.uuid4())
            
            # TODO: Send email with reset link
            # For now, we'll just return the token in response (NOT FOR PRODUCTION)
            return Response({
                'message': 'Password reset link sent to your email',
                'reset_token': reset_token  # Only for demo/development
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(
                {'message': 'If email exists, reset link will be sent'},
                status=status.HTTP_200_OK
            )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def health_check(request):
    """
    Health check endpoint - verify backend is running
    """
    return Response({
        'status': 'ok',
        'message': 'CampusNav API is running'
    }, status=status.HTTP_200_OK)
