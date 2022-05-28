import { configureStore } from '@reduxjs/toolkit'
import authorsSlice from '../features/authors/authorsSlice'
import booksSlice from '../features/books/booksSlice'

export const store = configureStore({
    reducer: {
        authors: authorsSlice,
        books: booksSlice
    },
})