from django.urls import path
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializers import UserRegistrationSerializer
import json

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    try:
        serializer = UserRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'success': True,
                'message': 'Usuário criado com sucesso!',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }, status=status.HTTP_201_CREATED)
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
        
        # Buscar usuário pelo email
        try:
            user_obj = User.objects.get(email=email)
            user = authenticate(username=user_obj.username, password=password)
        except User.DoesNotExist:
            user = None
        
        if user:
            return Response({
                'success': True,
                'message': 'Login realizado com sucesso!',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'name': f"{user.first_name} {user.last_name}".strip()
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

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
]

@csrf_exempt
def login_user(request):
    """API para login de usuários"""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Autenticar usuário (buscar username pelo email)
            email = data.get('email')
            password = data.get('password')
            
            try:
                user_obj = User.objects.get(email=email)
                user = authenticate(username=user_obj.username, password=password)
            except User.DoesNotExist:
                user = None
            
            if user:
                return JsonResponse({
                    'success': True,
                    'message': 'Login realizado com sucesso!',
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                        'name': f"{user.first_name} {user.last_name}".strip()
                    }
                })
            else:
                return JsonResponse({
                    'success': False,
                    'message': 'Email ou senha incorretos'
                }, status=401)
        
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': f'Erro no login: {str(e)}'
            }, status=400)
    
    return JsonResponse({'error': 'Método não permitido'}, status=405)

def users_list(request):
    """API para listar usuários"""
    users = User.objects.all()
    users_data = []
    
    for user in users:
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'name': f"{user.first_name} {user.last_name}".strip(),
            'date_joined': user.date_joined.isoformat()
        }
        
        # Adicionar dados do perfil se existir
        if hasattr(user, 'profile'):
            profile = user.profile
            user_data.update({
                'bio': profile.bio,
                'course': profile.course,
                'campus': profile.campus,
                'avatar': profile.avatar.url if profile.avatar else None,
                'rating': float(profile.rating),
                'total_sales': profile.total_sales
            })
        
        users_data.append(user_data)
    
    return JsonResponse({'results': users_data})

def user_detail(request, user_id):
    """API para detalhes de um usuário específico"""
    try:
        user = User.objects.get(id=user_id)
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'name': f"{user.first_name} {user.last_name}".strip(),
            'date_joined': user.date_joined.isoformat()
        }
        
        # Adicionar dados do perfil se existir
        if hasattr(user, 'profile'):
            profile = user.profile
            user_data.update({
                'bio': profile.bio,
                'course': profile.course,
                'campus': profile.campus,
                'avatar': profile.avatar.url if profile.avatar else None,
                'rating': float(profile.rating),
                'total_sales': profile.total_sales
            })
        
        return JsonResponse(user_data)
        
    except User.DoesNotExist:
        return JsonResponse({'error': 'Usuário não encontrado'}, status=404)

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('users/', users_list, name='users-list'),
    path('users/<int:user_id>/', user_detail, name='user-detail'),
]