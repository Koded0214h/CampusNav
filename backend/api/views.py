from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.conf import settings

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from .models import Campus, Location, Review, User
from .serializers import CampusSerializer, LocationSerializer, ReviewSerializer, TokenSerializer
from django.db.models import Q

class CampusViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Campus.objects.all()
    serializer_class = CampusSerializer
    
    def get_queryset(self):
        # MVP assumes one active campus, or we can filter
        return Campus.objects.all()

class LocationViewSet(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Location.objects.all()
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(aliases__icontains=search)
            )
        return queryset

    def perform_create(self, serializer):
        # Suggestions default to unverified
        serializer.save(created_by=self.request.user if self.request.user.is_authenticated else None, is_verified=False)

class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        location_id = self.request.query_params.get('location_id')
        if location_id:
            return Review.objects.filter(location_id=location_id)
        return Review.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.helpers import complete_social_login
from allauth.socialaccount.models import SocialAccount
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.conf import settings
from django.shortcuts import redirect
from django.urls import reverse

# ... (other imports and viewsets)

class GoogleLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        access_token = request.data.get('access_token')
        if not access_token:
            return Response({"error": "Access token is required."}, status=status.HTTP_400_BAD_REQUEST)

        adapter = GoogleOAuth2Adapter(request)
        try:
            # Dynamically get the SocialApp for Google
            from allauth.socialaccount.models import SocialApp
            app = SocialApp.objects.get(provider='google')
            
            # Complete the login using the adapter
            # The complete_login method expects an HttpRequest, and a SocialApp instance
            # It also expects the access_token (or code) and will fetch user details from Google.
            sociallogin = adapter.complete_login(request, app, access_token=access_token)
            
            # Manually complete the social login process
            # This ensures that user.backend is set and other allauth hooks run
            complete_social_login(request, sociallogin)

            user = sociallogin.user
            # Get or create DRF token
            token, created = Token.objects.get_or_create(user=user)
            return Response({"key": token.key, "user_id": user.pk}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def get_route(request):
    # Placeholder for Google Directions API
    # Needs source and destination lat/lng
    return Response({
        "routes": [],
        "message": "Routing not implemented yet (requires Google API Key)"
    })