from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .models import Product
from .serializers import ProductSerializer
from .storage_helper import storage_helper

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]  # Temporário para desenvolvimento
    
    def get_queryset(self):
        """Filtrar produtos por seller_id se fornecido"""
        queryset = Product.objects.all()
        seller_id = self.request.query_params.get('seller_id', None)
        
        if seller_id is not None:
            queryset = queryset.filter(seller_id=seller_id)
        
        return queryset.order_by('-created_at')
    
    def create(self, request, *args, **kwargs):
        """Override create para lidar com upload de imagens"""
        try:
            # Debug: ver dados recebidos
            print("=== DEBUG CREATE PRODUCT ===")
            print("Headers:", dict(request.headers))
            print("Data:", dict(request.data))
            print("Files:", dict(request.FILES))
            print("User authenticated:", request.user.is_authenticated)
            print("User:", request.user)
            
            # Extrair dados do produto
            product_data = {}
            for field in ['title', 'description', 'price', 'campus', 'status']:
                product_data[field] = request.data.get(field)
            
            # Criar produto primeiro sem imagens
            serializer = self.get_serializer(data=product_data)
            serializer.is_valid(raise_exception=True)
            
            # Definir seller - tentar pegar do request data primeiro
            seller_id = request.data.get('seller_id')
            if seller_id:
                try:
                    seller = User.objects.get(id=seller_id)
                except User.DoesNotExist:
                    seller = None
            else:
                seller = None
            
            # Se não tiver seller definido, usar autenticado ou default
            if not seller:
                if request.user.is_authenticated:
                    seller = request.user
                else:
                    # Usuário padrão para desenvolvimento
                    seller, created = User.objects.get_or_create(
                        username='default_user',
                        defaults={'email': 'default@example.com'}
                    )
            
            print(f"Seller escolhido: {seller} (ID: {seller.id})")
            
            product = serializer.save(seller=seller)
            
            # Processar imagens se enviadas
            images_uploaded = []
            for i in range(1, 6):  # Máximo 5 imagens
                image_key = 'image' if i == 1 else f'image_{i}'
                
                if image_key in request.FILES:
                    image_file = request.FILES[image_key]
                    
                    # Processar e upload da imagem
                    result = storage_helper.process_and_upload_image(
                        image_file, 
                        bucket_name="products",
                        folder=f"products/{product.id}"
                    )
                    
                    if result["success"]:
                        # Salvar URL e path no produto
                        if i == 1:
                            product.image_url = result["url"]
                            product.image_path = result["file_path"]
                        else:
                            setattr(product, f'image_{i}_url', result["url"])
                            setattr(product, f'image_{i}_path', result["file_path"])
                        
                        images_uploaded.append({
                            "index": i,
                            "url": result["url"],
                            "success": True
                        })
                    else:
                        images_uploaded.append({
                            "index": i,
                            "error": result["error"],
                            "success": False
                        })
            
            # Salvar produto com URLs das imagens
            if images_uploaded:
                product.save()
            
            # Preparar resposta
            response_data = ProductSerializer(product).data
            response_data['images_uploaded'] = images_uploaded
            
            return Response(response_data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({
                'error': f'Erro ao criar produto: {str(e)}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    
    def update(self, request, *args, **kwargs):
        """Override update para lidar com novas imagens"""
        try:
            product = self.get_object()
            
            # Atualizar campos básicos
            serializer = self.get_serializer(product, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            
            # Processar novas imagens se enviadas
            images_uploaded = []
            for i in range(1, 6):
                image_key = 'image' if i == 1 else f'image_{i}'
                
                if image_key in request.FILES:
                    image_file = request.FILES[image_key]
                    
                    # Deletar imagem antiga se existe
                    if i == 1 and product.image_path:
                        storage_helper.delete_from_supabase(product.image_path)
                    elif i > 1:
                        old_path = getattr(product, f'image_{i}_path', None)
                        if old_path:
                            storage_helper.delete_from_supabase(old_path)
                    
                    # Upload nova imagem
                    result = storage_helper.process_and_upload_image(
                        image_file,
                        bucket_name="products", 
                        folder=f"products/{product.id}"
                    )
                    
                    if result["success"]:
                        if i == 1:
                            product.image_url = result["url"]
                            product.image_path = result["file_path"]
                        else:
                            setattr(product, f'image_{i}_url', result["url"])
                            setattr(product, f'image_{i}_path', result["file_path"])
                        
                        images_uploaded.append({
                            "index": i,
                            "url": result["url"],
                            "success": True
                        })
                    else:
                        images_uploaded.append({
                            "index": i,
                            "error": result["error"],
                            "success": False
                        })
            
            # Salvar alterações
            if images_uploaded:
                product.save()
            
            response_data = ProductSerializer(product).data
            response_data['images_uploaded'] = images_uploaded
            
            return Response(response_data)
            
        except Exception as e:
            return Response({
                'error': f'Erro ao atualizar produto: {str(e)}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def upload_product_image(request, product_id):
    """Endpoint dedicado para upload de imagens de produto"""
    try:
        product = Product.objects.get(id=product_id)
        
        if 'image' not in request.FILES:
            return Response({
                'error': 'Nenhuma imagem enviada'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        image_file = request.FILES['image']
        slot = request.data.get('slot', 1)  # Slot da imagem (1-5)
        
        if slot < 1 or slot > 5:
            return Response({
                'error': 'Slot deve ser entre 1 e 5'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Processar e upload
        result = storage_helper.process_and_upload_image(
            image_file,
            bucket_name="products",
            folder=f"products/{product.id}"
        )
        
        if not result["success"]:
            return Response({
                'error': result["error"]
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Deletar imagem antiga se existe
        if slot == 1 and product.image_path:
            storage_helper.delete_from_supabase(product.image_path)
        elif slot > 1:
            old_path = getattr(product, f'image_{slot}_path', None)
            if old_path:
                storage_helper.delete_from_supabase(old_path)
        
        # Salvar nova URL
        if slot == 1:
            product.image_url = result["url"]
            product.image_path = result["file_path"]
        else:
            setattr(product, f'image_{slot}_url', result["url"])
            setattr(product, f'image_{slot}_path', result["file_path"])
        
        product.save()
        
        return Response({
            'success': True,
            'url': result["url"],
            'slot': slot,
            'message': f'Imagem {slot} carregada com sucesso'
        })
        
    except Product.DoesNotExist:
        return Response({
            'error': 'Produto não encontrado'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'error': f'Erro no upload: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)