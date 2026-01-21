from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfile(models.Model):
    """Extended user profile for CampusNav"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    student_id = models.CharField(max_length=50, unique=True)
    university_email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20, blank=True)
    profile_picture = models.URLField(blank=True)
    department = models.CharField(max_length=100, blank=True)
    year_of_study = models.CharField(max_length=50, blank=True, choices=[
        ('freshman', 'Freshman'),
        ('sophomore', 'Sophomore'),
        ('junior', 'Junior'),
        ('senior', 'Senior'),
        ('graduate', 'Graduate'),
    ])
    bio = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.student_id}"

    class Meta:
        verbose_name_plural = "User Profiles"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Create profile when user is created"""
    if created:
        UserProfile.objects.get_or_create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Save profile when user is saved"""
    instance.profile.save()


class AuthToken(models.Model):
    """Store authentication tokens for session management"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='auth_token')
    token = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Token for {self.user.username}"

    class Meta:
        verbose_name_plural = "Auth Tokens"
