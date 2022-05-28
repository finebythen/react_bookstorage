import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/author/';

const initialState = {
    authors: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

export const getAuthors = createAsyncThunk('api/author', async () => {
    const response = await axios.get(BASE_URL);
    return response.data.results;
})

const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getAuthors.pending, (state, action) => {
               state.status = 'loading';
            })
            .addCase(getAuthors.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.authors = action.payload;
            })
            .addCase(getAuthors.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default authorsSlice.reducer;