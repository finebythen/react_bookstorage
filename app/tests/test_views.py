import datetime
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import Author, Book


USER = get_user_model()


class AuthorTest(APITestCase):
    def setUp(self):
        self.user = USER.objects.create_user('johndoe@email.com', 'johndoepassword')
        self.data = {
            'id': 1,
            'first_name': 'Jane',
            'last_name': 'Doe',
            'born': datetime.date(1940, 1, 1),
            'died': datetime.date(2010, 12, 31),
            'passed': True,
            'gender': 'FE',
            'slug': 'doe-jane',
            'created_by': self.user.id,
            'created_at': timezone.now(),
            'updated_at': timezone.now(),
        }

    def test_create_obj(self):
        url = reverse('author-list')
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Author.objects.count(), 1)
        self.assertEqual(Author.objects.get().first_name, 'Jane')
    
    def test_delete_obj(self):
        url = reverse('author-detail', kwargs={'slug': 'doe-jane'})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Author.objects.count(), 0)


class BookTest(APITestCase):
    def setUp(self):
        self.user = USER.objects.create_user('johndoe@email.com', 'johndoepassword')
        self.author = Author.objects.create(
            id=1,
            first_name='Jane',
            last_name='Doe',
            born=datetime.date(1940, 1, 1),
            died=datetime.date(2010, 12, 31),
            passed=True,
            gender='FE',
            slug='doe-jane',
            created_by=self.user,
            created_at=timezone.now(),
            updated_at=timezone.now(),
        )
        self.book = {
            'id': 1,
            'author': self.author.id,
            'title': 'Some book title',
            'description': 'No description.',
            'genre': 'NO',
            'pages': 42,
            'slug': '1-some-book-title',
            'published': datetime.date(1999, 6, 1),
            'created_by': self.user.id,
            'created_at': timezone.now(),
            'updated_at': timezone.now(),
        }

    def test_create_obj(self):
        url = reverse('book-list')
        response = self.client.post(url, self.book, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Book.objects.count(), 1)
        self.assertEqual(Book.objects.get().title, 'Some book title')
    
    def test_delete_obj(self):
        url = reverse('book-detail', kwargs={'slug': '1-some-book-title'})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Book.objects.count(), 0)