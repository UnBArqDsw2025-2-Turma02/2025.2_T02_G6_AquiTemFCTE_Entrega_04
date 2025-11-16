from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    seller_username = serializers.CharField(source='seller.username', read_only=True)
    all_images = serializers.SerializerMethodField()
    main_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'title', 'description', 'price', 'campus', 'status',
            'seller', 'seller_username', 'created_at', 'updated_at',
            'image_url', 'image_2_url', 'image_3_url', 'image_4_url', 'image_5_url',
            'all_images', 'main_image'
        ]
        read_only_fields = ('seller', 'created_at', 'updated_at', 'all_images', 'main_image')
    
    def get_all_images(self, obj):
        """Retorna todas as imagens do produto"""
        return obj.get_all_images()
    
    def get_main_image(self, obj):
        """Retorna imagem principal"""
        return obj.get_main_image()