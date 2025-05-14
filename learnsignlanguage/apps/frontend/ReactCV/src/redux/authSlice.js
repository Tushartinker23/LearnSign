import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const loginUser = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:3000/backend/api/login-or-signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Login failed');
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const signupUser = createAsyncThunk('auth/signup', async (payload, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:3000/backend/api/login-or-signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Signup failed');
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
            .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(signupUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(signupUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
            .addCase(signupUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    }
});

export default authSlice.reducer;
