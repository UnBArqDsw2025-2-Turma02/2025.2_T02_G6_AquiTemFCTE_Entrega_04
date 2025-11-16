from django.urls import path
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializers import UserRegistrationSerializer
from .models import UserProfile

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    try:
        # Extrair dados básicos
        user_data = {}
        for field in ['username', 'email', 'password', 'first_name', 'last_name', 'campus']:
            if field in request.data:
                user_data[field] = request.data[field]
        
        serializer = UserRegistrationSerializer(data=user_data)
        
        if serializer.is_valid():
            user = serializer.save()
            
            # Processar avatar se enviado
            avatar_uploaded = None
            if 'profile_photo' in request.FILES:
                avatar_file = request.FILES['profile_photo']
                
                # Import storage helper
                from products.storage_helper import storage_helper
                
                # Upload avatar
                result = storage_helper.process_and_upload_image(
                    avatar_file,
                    bucket_name="avatars",
                    folder=f"users/{user.id}"
                )
                
                if result["success"]:
                    # Salvar no perfil do usuário
                    profile = user.profile
                    profile.avatar_url = result["url"]
                    profile.avatar_path = result["file_path"]
                    profile.save()
                    
                    avatar_uploaded = {
                        "url": result["url"],
                        "success": True
                    }
                else:
                    avatar_uploaded = {
                        "error": result["error"],
                        "success": False
                    }
            
            response_data = {
                'success': True,
                'message': 'Usuário criado com sucesso!',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }
            
            if avatar_uploaded:
                response_data['avatar_uploaded'] = avatar_uploaded
            
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'success': False,
                'message': 'Dados inválidos',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({
            'success': False,
            'message': f'Erro ao cadastrar usuário: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        
        # Buscar usuário pelo email (case-insensitive) com tolerância a duplicidade
        user_qs = User.objects.filter(email__iexact=(email or '').strip())
        user_obj = None
        if user_qs.exists():
            if user_qs.count() > 1:
                # Em caso de duplicidade, prioriza o mais recente
                user_obj = user_qs.order_by('-date_joined', '-id').first()
            else:
                user_obj = user_qs.first()
        if user_obj:
            user = authenticate(username=user_obj.username, password=password)
        else:
            user = None
        
        if user:
            # Incluir dados do perfil na resposta
            profile_data = {}
            if hasattr(user, 'profile'):
                profile = user.profile
                profile_data = {
                    'campus': profile.campus,
                    'bio': profile.bio,
                    'avatar_url': profile.get_avatar()
                }
            
            return Response({
                'success': True,
                'message': 'Login realizado com sucesso!',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'name': f"{user.first_name} {user.last_name}".strip(),
                    'profile': profile_data
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'success': False,
                'message': 'Email ou senha incorretos'
            }, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({
            'success': False,
            'message': f'Erro no login: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def upload_avatar(request, user_id):
    """Endpoint para upload de avatar do usuário"""
    try:
        user = User.objects.get(id=user_id)
        profile = user.profile
        
        if 'avatar' not in request.FILES:
            return Response({
                'error': 'Nenhum avatar enviado'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        avatar_file = request.FILES['avatar']
        
        # Import storage helper
        from products.storage_helper import storage_helper
        
        # Deletar avatar antigo se existe
        if profile.avatar_path:
            storage_helper.delete_from_supabase(profile.avatar_path, bucket_name="avatars")
        
        # Upload novo avatar
        result = storage_helper.process_and_upload_image(
            avatar_file,
            bucket_name="avatars",
            folder=f"users/{user.id}"
        )
        
        if not result["success"]:
            return Response({
                'error': result["error"]
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Salvar nova URL
        profile.avatar_url = result["url"]
        profile.avatar_path = result["file_path"]
        profile.save()
        
        return Response({
            'success': True,
            'url': result["url"],
            'message': 'Avatar carregado com sucesso'
        })
        
    except User.DoesNotExist:
        return Response({
            'error': 'Usuário não encontrado'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'error': f'Erro no upload: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('<int:user_id>/upload-avatar/', upload_avatar, name='user-upload-avatar'),
]