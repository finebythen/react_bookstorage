from django.contrib.auth import get_user_model
from django.db import models
from django.forms import ValidationError
from django.template.defaultfilters import slugify
from django.urls import reverse
from datetime import date


USER = get_user_model()


class BaseModel(models.Model):
    created_by = models.ForeignKey(USER, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        get_latest_by = 'created_at'


class Author(BaseModel):

    class Gender(models.TextChoices):
        NO = 'NO', 'No gender chosen'
        DIVERSE = 'DI', 'Diverse'
        FEMALE = 'FE', 'Female'
        MALE = 'MA', 'Male'

    id = models.BigAutoField(primary_key=True, editable=False, unique=True)
    first_name = models.CharField(max_length=50, null=False, blank=False)
    last_name = models.CharField(max_length=50, null=False, blank=False)
    born = models.DateField(null=False, blank=False)
    died = models.DateField(null=True, blank=True)
    passed = models.BooleanField(default=False)
    gender = models.CharField(max_length=2, choices=Gender.choices, default=Gender.NO)
    slug = models.SlugField(null=False, blank=False, unique=True)

    class Meta:
        ordering = ['last_name', 'first_name']
        constraints = [
            models.UniqueConstraint(fields=['last_name', 'first_name'], name='unique_name_constraint'),
        ]
        indexes = [
            models.Index(fields=['last_name', 'first_name'], name='index_unique_name'),
        ]
        verbose_name = 'Author'
        verbose_name_plural = 'Authors'
    
    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'
    
    def save(self, *args, **kwargs):
        self.passed = True if self.died is not None else False
        self.slug = slugify(f'{self.last_name}-{self.first_name}') if not self.slug else self.slug
        super(Author, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('author-detail', kwargs={'slug': self.slug})
    
    def clean(self):
        if self.born > self.died:
            raise ValidationError("Date of born can't be further in time than date of death!")

    @property
    def age(self):
        if self.passed:
            delta = self.died - self.born
            return delta.days // 365
        else:
            delta = date.today() - self.born
            return delta.days // 365


class Book(BaseModel):

    class Genre(models.TextChoices):
        CRIME = 'CR', 'Crime'
        EDUCATION = 'ED', 'Education'
        FANTASY = 'FA', 'Fantasy'
        FICTION = 'FI', 'Fiction'
        NO = 'NO', 'No genre'
        NONFICTION = 'NF', 'Non Fiction'
        ROMANCE = 'RO', 'Romance'
        THRILLER = 'TH', 'Thriller'
    
    id = models.BigAutoField(primary_key=True, unique=True)
    author = models.ForeignKey(Author, null=False, blank=False, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(max_length=500, null=True, blank=True)
    genre = models.CharField(max_length=2, choices=Genre.choices, default=Genre.NO)
    pages = models.PositiveIntegerField(default=0)
    slug = models.SlugField(null=False, blank=False, unique=True)

    class Meta:
        ordering = ['title']
        constraints = [
            models.UniqueConstraint(fields=['author', 'title'], name='uniqe-author-title-constraint'),
        ]
        indexes = [
            models.Index(fields=['author', 'title'], name='index-author-title'),
        ]
        verbose_name = 'Book'
        verbose_name_plural = 'Books'

    def __str__(self) -> str:
        return self.title[:50]

    def save(self, *args, **kwargs):
        self.description = 'No description' if not self.description else self.description
        self.slug = slugify(f'{self.author}-{self.title}') if not self.slug else self.slug
        super(Book, self).super(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('book-detail', kwargs={'slug': self.slug})
    
    @property
    def full_description(self):
        return f'{self.title} from {self.author__first_name} {self.author__last_name}'