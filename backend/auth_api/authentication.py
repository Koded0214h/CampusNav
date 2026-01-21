from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from django.utils import timezone
from .models import AuthToken


class CustomTokenAuthentication(BaseAuthentication):
    """
    Custom token authentication for CampusNav
    """
    
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        
        if not auth_header or not auth_header.startswith('Bearer '):
            return None
            
        token = auth_header.split(' ')[1]
        
        try:
            auth_token = AuthToken.objects.get(token=token, is_active=True)
            
            # Check if token is expired
            if auth_token.expires_at < timezone.now():
                auth_token.is_active = False
                auth_token.save()
                raise AuthenticationFailed('Token expired')
                
            return (auth_token.user, auth_token)
            
        except AuthToken.DoesNotExist:
            raise AuthenticationFailed('Invalid token')
    
    def authenticate_header(self, request):
        return 'Bearer'