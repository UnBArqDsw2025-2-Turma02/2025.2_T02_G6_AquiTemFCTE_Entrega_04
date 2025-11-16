from django.urls import path
from .views import ProductListCreateView, ProductDetailView, upload_product_image

urlpatterns = [
    path('', ProductListCreateView.as_view(), name='product-list-create'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('<int:product_id>/upload-image/', upload_product_image, name='product-upload-image'),
]