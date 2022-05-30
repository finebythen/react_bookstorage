import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/book/';

const initialState = {
    books: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

export const getBooks = createAsyncThunk('api/book', async () => {
    const response = await axios.get(BASE_URL);
    return response.data.results;
});

export const postBook = createAsyncThunk('api/book', async(initialBook) => {
    const response = await axios.post(BASE_URL, initialBook);
    return response.data;
});

const booksSlice = createSlice({
    name: 'books',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getBooks.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.books = action.payload;
                state.status = 'succeeded';
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default booksSlice.reducer;