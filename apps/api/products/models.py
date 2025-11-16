from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    CAMPUS_CHOICES = [
        ('gama', 'Campus Gama'),
        ('darcy-ribeiro', 'Campus Darcy Ribeiro'),
        ('planaltina', 'Campus Planaltina'),
        ('ceilandia', 'Campus Ceilândia'),
        ('fcte', 'Campus FCTE'),
    ]
    
    STATUS_CHOICES = [
        ('disponivel', 'Disponível'),
        ('vendido', 'Vendido'),
        ('reservado', 'Reservado'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    campus = models.CharField(max_length=20, choices=CAMPUS_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='disponivel')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    
    # Campos de imagem - apenas URLs
    image_url = models.URLField(blank=True, null=True, help_text="URL principal da imagem no Supabase Storage")
    image_path = models.CharField(max_length=500, blank=True, null=True, help_text="Caminho da imagem no storage para deleção")
    
    # Imagens adicionais (até 5 imagens por produto)
    image_2_url = models.URLField(blank=True, null=True)
    image_2_path = models.CharField(max_length=500, blank=True, null=True)
    image_3_url = models.URLField(blank=True, null=True) 
    image_3_path = models.CharField(max_length=500, blank=True, null=True)
    image_4_url = models.URLField(blank=True, null=True)
    image_4_path = models.CharField(max_length=500, blank=True, null=True)
    image_5_url = models.URLField(blank=True, null=True)
    image_5_path = models.CharField(max_length=500, blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
    
    def get_all_images(self):
        """Retorna lista com todas as URLs de imagens do produto"""
        images = []
        for i in range(1, 6):
            if i == 1:
                url = self.image_url
            else:
                url = getattr(self, f'image_{i}_url', None)
            
            if url:
                images.append(url)
        return images
    
    def get_main_image(self):
        """Retorna URL da imagem principal ou placeholder"""
        if self.image_url:
            return self.image_url
        # Retornar URL de placeholder válida
        return "https://via.placeholder.com/400x300/cccccc/666666?text=Sem+Imagem"
    
    def delete_all_images(self):
        """Remove todas as imagens do storage quando produto é deletado"""
        from .storage_helper import storage_helper
        
        for i in range(1, 6):
            if i == 1:
                path = self.image_path
            else:
                path = getattr(self, f'image_{i}_path', None)
            
            if path:
                storage_helper.delete_from_supabase(path)
    
    def delete(self, *args, **kwargs):
        """Override para deletar imagens antes de remover produto"""
        self.delete_all_images()
        super().delete(*args, **kwargs)