from django.test import SimpleTestCase
from django.urls import resolve, reverse
from ..api.urls import (
    AuthorListCreateView, AuthorRetrieveUpdateDestroyView, BookListCreateView, BookRetrieveUpdateDestroyView
)


class AuthorUrlTest(SimpleTestCase):
    def test_authors_is_resolved(self):
        url = reverse('author-list')
        self.assertEqual(resolve(url).func.view_class, AuthorListCreateView)
    
    def test_author_is_resolved(self):
        url = reverse('author-detail', args=['doe-john'])
        self.assertEqual(resolve(url).func.view_class, AuthorRetrieveUpdateDestroyView)


class BookUrlTest(SimpleTestCase):
    def test_books_is_resolved(self):
        url = reverse('book-list')
        self.assertEqual(resolve(url).func.view_class, BookListCreateView)
    
    def test_book_is_resolved(self):
        url = reverse('book-detail', args=['some-book'])
        self.assertEqual(resolve(url).func.view_class, BookRetrieveUpdateDestroyView)
