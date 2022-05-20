import datetime
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils import timezone
from ..models import Author, Book


USER = get_user_model()


class AuthorTest(TestCase):
    def setUp(self):
        user = USER.objects.create_user('johndoe@email.com', 'johndoepassword')
        author = Author.objects.create(
            id=1,
            first_name='John',
            last_name='Doe',
            born=datetime.date(1950, 1, 1),
            died=datetime.date(2020, 2, 1),
            passed=True,
            gender='NO',
            slug='doe-john',
            created_by=user,
            created_at=timezone.now(),
            updated_at=timezone.now(),
        )
    
    def test_author_exists(self):
        author = Author.objects.get(id=1)
        authors = Author.objects.count()

        self.assertEqual(author.get_absolute_url(), 'author-detail/1/')
        self.assertEqual(str(author), 'John Doe')
        self.assertEqual(authors, 1)
        self.assertNotEqual(authors, 0)