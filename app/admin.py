from django.contrib import admin
from .models import Author, Book


class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'last_name', 'first_name', 'slug', 'age',)
    list_filter = ('last_name',)
    prepopulated_fields = {'slug': ('last_name', 'first_name',)}


class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'published', 'slug',)
    prepopulated_fields = {'slug': ('author', 'title',)}


admin.site.site_header = 'React Bookstorage (0.0.1)'
admin.site.register(Author, AuthorAdmin)
admin.site.register(Book, BookAdmin)