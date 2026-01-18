from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CampusViewSet, LocationViewSet, ReviewViewSet, google_auth, get_route

router = DefaultRouter()
router.register(r'campuses', CampusViewSet)
router.register(r'locations', LocationViewSet, basename='location')
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/google/', google_auth, name='google_auth'),
    path('routes/', get_route, name='get_route'),
]
