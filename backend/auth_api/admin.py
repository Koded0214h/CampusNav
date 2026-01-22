from django.contrib import admin
from .models import UserProfile, AuthToken


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'student_id', 'university_email', 'department', 'created_at')
    search_fields = ('user__username', 'student_id', 'university_email')
    list_filter = ('year_of_study', 'department', 'created_at')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(AuthToken)
class AuthTokenAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_active', 'created_at', 'expires_at')
    search_fields = ('user__username', 'token')
    list_filter = ('is_active', 'created_at')
    readonly_fields = ('token', 'created_at')
