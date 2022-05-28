from rest_framework import serializers
from ..models import Author, Book


class AuthorSerializer(serializers.ModelSerializer):
    age = serializers.ReadOnlyField()

    class Meta:
        model = Author
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    full_author_name = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = '__all__'
    
    def get_full_author_name(self, instance):
        return f'{instance.author.first_name} {instance.author.last_name}'