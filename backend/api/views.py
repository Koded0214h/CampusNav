from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from .models import Campus, Location, Review, User
from .serializers import CampusSerializer, LocationSerializer, ReviewSerializer
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

@api_view(['POST'])
@permission_classes([AllowAny])
def google_auth(request):
    # TODO: Implement actual Google OAuth verification
    # For MVP/Day 1, we might just mock or expect a token
    return Response({"message": "Auth endpoint placeholder", "token": "mock_token"}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def get_route(request):
    # Placeholder for Google Directions API
    # Needs source and destination lat/lng
    return Response({
        "routes": [],
        "message": "Routing not implemented yet (requires Google API Key)"
    })