from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    CAMPUS_CHOICES = [
        ('gama', 'Campus Gama'),
        ('darcy-ribeiro', 'Campus Darcy Ribeiro'),
        ('planaltina', 'Campus Planaltina'),
        ('ceilandia', 'Campus Ceilândia'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    campus = models.CharField(max_length=20, choices=CAMPUS_CHOICES)
    bio = models.TextField(blank=True, null=True)
    
    # Campos de avatar - apenas URL (armazenamento no Supabase)
    avatar_url = models.URLField(blank=True, null=True, help_text="URL do avatar no Supabase Storage")
    avatar_path = models.CharField(max_length=500, blank=True, null=True, help_text="Caminho do avatar no storage para deleção")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.campus}"
    
    def get_avatar(self):
        """Retorna URL do avatar ou placeholder"""
        return self.avatar_url or "/placeholder-avatar.jpg"
    
    def delete_avatar(self):
        """Remove avatar do storage quando necessário"""
        if self.avatar_path:
            from products.storage_helper import storage_helper
            storage_helper.delete_from_supabase(self.avatar_path, bucket_name="avatars")
    
    def delete(self, *args, **kwargs):
        """Override para deletar avatar antes de remover perfil"""
        self.delete_avatar()
        super().delete(*args, **kwargs)