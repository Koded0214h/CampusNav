from django.urls import path
from . import views

app_name = 'auth_api'

urlpatterns = [
    # Authentication endpoints
    path('auth/sign-up/', views.sign_up, name='sign_up'),
    path('auth/sign-in/', views.sign_in, name='sign_in'),
    path('auth/sign-out/', views.sign_out, name='sign_out'),
    path('auth/verify-token/', views.verify_token, name='verify_token'),
    
    # User endpoints
    path('user/me/', views.get_current_user, name='current_user'),
    path('user/profile/update/', views.update_user_profile, name='update_profile'),
    
    # Password reset
    path('auth/request-password-reset/', views.request_password_reset, name='request_password_reset'),
    
    # Health check
    path('health/', views.health_check, name='health_check'),
]
