from django.urls import path
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView
from .tokens import MyTokenObtainPairView
from .views import AuthorListCreateView, AuthorRetrieveUpdateDestroyView, BookListCreateView, BookRetrieveUpdateDestroyView


urlpatterns = [
    path('openapi', get_schema_view(title="React Bookstore", description="-", version="0.0.1"), name='openapi-schema'),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),

    path('author/', AuthorListCreateView.as_view(), name='author-list'),
    path('author/<slug:slug>/', AuthorRetrieveUpdateDestroyView.as_view(), name='author-detail'),
    path('book/', BookListCreateView.as_view(), name='book-list'),
    path('book/<slug:slug>/', BookRetrieveUpdateDestroyView.as_view(), name='book-detail'),
]