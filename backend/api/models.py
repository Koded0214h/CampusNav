from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    google_id = models.CharField(max_length=255, blank=True, null=True)
    # email and name are already in AbstractUser (email, first_name, last_name)
    # created_at is date_joined in AbstractUser

    def __str__(self):
        return self.email

class Campus(models.Model):
    name = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    radius = models.FloatField(help_text="Radius in meters")

    def __str__(self):
        return self.name

class Location(models.Model):
    TYPE_CHOICES = [
        ('lecture_hall', 'Lecture Hall'),
        ('hostel', 'Hostel'),
        ('library', 'Library'),
        ('facility', 'Facility'),
        ('other', 'Other'),
    ]

    campus = models.ForeignKey(Campus, on_delete=models.CASCADE, related_name='locations')
    name = models.CharField(max_length=255)
    aliases = models.JSONField(default=list, blank=True)  # Store list of strings
    latitude = models.FloatField()
    longitude = models.FloatField()
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    is_verified = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_locations')
    
    def __str__(self):
        return self.name

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'location')

    def __str__(self):
        return f"{self.user} - {self.location} ({self.rating})"