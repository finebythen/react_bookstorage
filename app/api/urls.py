from django.urls import path
from rest_framework.schemas import get_schema_view


urlpatterns = [
    path('openapi', get_schema_view(title="React Bookstore", description="-", version="0.0.1"), name='openapi-schema'),
]