import os
import io
from PIL import Image
from django.core.files.base import ContentFile
import requests
from urllib.parse import quote

class SupabaseStorageHelper:
    """Helper para gerenciar upload de imagens no Supabase Storage"""
    
    def __init__(self):
        self.supabase_url = "http://127.0.0.1:54321"
        self.storage_api = f"{self.supabase_url}/storage/v1"
        # Usar service_role key para operações de storage
        self.service_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU"
        
    def create_bucket(self, bucket_name, public=True):
        """
        Cria um bucket no Supabase Storage
        
        Args:
            bucket_name: Nome do bucket
            public: Se o bucket deve ser público (default: True)
        
        Returns:
            dict: Resultado da operação
        """
        try:
            headers = {
                'Authorization': f'Bearer {self.service_key}',
                'Content-Type': 'application/json',
            }
            
            data = {
                'id': bucket_name,
                'name': bucket_name,
                'public': public
            }
            
            response = requests.post(
                f"{self.storage_api}/bucket",
                headers=headers,
                json=data
            )
            
            if response.status_code == 200:
                return {
                    "success": True,
                    "bucket": bucket_name,
                    "message": f"Bucket '{bucket_name}' criado com sucesso"
                }
            elif response.status_code == 409:
                # Bucket já existe
                return {
                    "success": True,
                    "bucket": bucket_name,
                    "message": f"Bucket '{bucket_name}' já existe"
                }
            else:
                return {
                    "success": False,
                    "error": f"Erro ao criar bucket: {response.status_code} - {response.text}"
                }
                
        except Exception as e:
            return {
                "success": False,
                "error": f"Erro ao criar bucket: {str(e)}"
            }
        
    def compress_and_resize_image(self, image_file, max_width=800, max_height=600, quality=85):
        """
        Comprime e redimensiona imagem automaticamente
        
        Args:
            image_file: Arquivo de imagem
            max_width: Largura máxima (default: 800px)
            max_height: Altura máxima (default: 600px) 
            quality: Qualidade JPEG (default: 85%)
        
        Returns:
            ContentFile: Arquivo processado
        """
        try:
            # Abrir imagem
            with Image.open(image_file) as img:
                # Converter para RGB se necessário
                if img.mode in ('RGBA', 'LA', 'P'):
                    img = img.convert('RGB')
                
                # Calcular novo tamanho mantendo aspecto
                original_width, original_height = img.size
                
                # Calcular proporção para redimensionar
                width_ratio = max_width / original_width
                height_ratio = max_height / original_height
                ratio = min(width_ratio, height_ratio, 1)  # Não ampliar
                
                new_width = int(original_width * ratio)
                new_height = int(original_height * ratio)
                
                # Redimensionar se necessário
                if ratio < 1:
                    img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                
                # Comprimir e salvar em buffer
                buffer = io.BytesIO()
                img.save(buffer, format='JPEG', quality=quality, optimize=True)
                buffer.seek(0)
                
                # Criar ContentFile
                filename = os.path.splitext(image_file.name)[0] + '.jpg'
                return ContentFile(buffer.read(), name=filename)
                
        except Exception as e:
            raise ValueError(f"Erro ao processar imagem: {str(e)}")
    
    def upload_to_supabase(self, image_file, bucket_name="products", folder="images"):
        """
        Faz upload da imagem para o Supabase Storage
        
        Args:
            image_file: Arquivo de imagem (já processado)
            bucket_name: Nome do bucket (default: "products")
            folder: Pasta dentro do bucket (default: "images")
        
        Returns:
            dict: {"success": bool, "url": str, "error": str}
        """
        try:
            # Gerar nome único do arquivo
            import uuid
            import time
            unique_filename = f"{int(time.time())}_{uuid.uuid4().hex[:8]}_{image_file.name}"
            file_path = f"{folder}/{unique_filename}"
            
            headers = {
                "Authorization": f"Bearer {self.service_key}",
                "Content-Type": "image/jpeg"
            }
            
            # Upload para Supabase
            upload_url = f"{self.storage_api}/object/{bucket_name}/{file_path}"
            
            response = requests.post(
                upload_url,
                headers=headers,
                data=image_file.read()
            )
            
            if response.status_code in [200, 201]:
                # Construir URL pública
                public_url = f"{self.supabase_url}/storage/v1/object/public/{bucket_name}/{file_path}"
                
                return {
                    "success": True,
                    "url": public_url,
                    "file_path": file_path,
                    "error": None
                }
            else:
                return {
                    "success": False,
                    "url": None,
                    "error": f"Erro no upload: {response.text}"
                }
                
        except Exception as e:
            return {
                "success": False,
                "url": None,
                "error": f"Erro no upload: {str(e)}"
            }
    
    def delete_from_supabase(self, file_path, bucket_name="products"):
        """
        Remove imagem do Supabase Storage
        
        Args:
            file_path: Caminho do arquivo no bucket
            bucket_name: Nome do bucket
        
        Returns:
            bool: True se removido com sucesso
        """
        try:
            headers = {
                "Authorization": f"Bearer {self.service_key}",
                "Content-Type": "application/json"
            }
            
            delete_url = f"{self.storage_api}/object/{bucket_name}/{file_path}"
            response = requests.delete(delete_url, headers=headers)
            
            return response.status_code in [200, 204]
            
        except Exception as e:
            print(f"Erro ao deletar imagem: {str(e)}")
            return False
    
    def process_and_upload_image(self, image_file, bucket_name="products", folder="images"):
        """
        Pipeline completo: comprime, redimensiona e faz upload
        
        Args:
            image_file: Arquivo de imagem original
            bucket_name: Nome do bucket
            folder: Pasta dentro do bucket
        
        Returns:
            dict: {"success": bool, "url": str, "error": str}
        """
        try:
            print(f"=== STORAGE HELPER DEBUG ===")
            print(f"Bucket: {bucket_name}, Folder: {folder}")
            print(f"Image file: {image_file}, Size: {getattr(image_file, 'size', 'unknown')}")
            
            # 1. Verificar/criar bucket
            bucket_result = self.create_bucket(bucket_name)
            print(f"Bucket result: {bucket_result}")
            
            # 2. Comprimir e redimensionar
            print("Processando imagem...")
            processed_image = self.compress_and_resize_image(image_file)
            print(f"Imagem processada: {processed_image.name}, size: {processed_image.size}")
            
            # 3. Upload para Supabase
            print("Fazendo upload...")
            result = self.upload_to_supabase(processed_image, bucket_name, folder)
            print(f"Upload result: {result}")
            
            return result
            
        except Exception as e:
            error_msg = f"Erro no processamento: {str(e)}"
            print(f"ERRO: {error_msg}")
            return {
                "success": False,
                "url": None,
                "error": error_msg
            }

# Instância global para uso nos views
storage_helper = SupabaseStorageHelper()