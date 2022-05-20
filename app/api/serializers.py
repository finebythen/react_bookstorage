from rest_framework import serializers
from ..models import Author, Book


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    full_author_name = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = '__all__'
    
    def get_full_author_name(self, obj):
        return f'{obj.author.first_name} {obj.author.last_name}'