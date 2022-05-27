from datetime import date
from rest_framework import serializers
from ..models import Author, Book


class AuthorSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField()

    class Meta:
        model = Author
        fields = '__all__'
    
    def get_age(self, instance):
        if instance.passed:
            delta = instance.died - instance.born
            return delta.days // 365
        else:
            delta = date.today() - instance.born
            return delta.days // 365


class BookSerializer(serializers.ModelSerializer):
    full_author_name = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = '__all__'
    
    def get_full_author_name(self, instance):
        return f'{instance.author.first_name} {instance.author.last_name}'