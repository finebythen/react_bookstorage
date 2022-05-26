import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const GET_URL = 'http://127.0.0.1:8000/api/author';

const initialState = {
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const getAuthors = createAsyncThunk('api/author', async () => {
    const response = await axios.get(GET_URL);
    return response.data;
});