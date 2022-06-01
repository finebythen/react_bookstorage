import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/book/';

const initialState = {
    books: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

export const getBooks = createAsyncThunk('api/getBooks', async (id=null, { rejectWithValue }) => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data.results;
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

export const postBook = createAsyncThunk('api/postBook', async(book, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL, book);
        return response.data;
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

export const updateBook = createAsyncThunk('api/updateBook', async(book, { rejectWithValue }) => {
    try {
        const { slug } = book;
        const response = await axios.put(`${BASE_URL}/${slug}`, book);
        return response.data;
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
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

export const selectAllBooks = (state) => state.books;

export default booksSlice.reducer;