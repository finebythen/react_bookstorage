from django.contrib import admin
from .models import Author


class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'last_name', 'first_name', 'slug',)
    list_filter = ('last_name',)
    prepopulated_fields = {'slug': ('last_name', 'first_name',)}

admin.site.site_header = 'React Bookstorage (0.0.1)'
admin.site.register(Author, AuthorAdmin)