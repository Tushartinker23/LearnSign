import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const API_BASE_URL = 'http://localhost:3000/backend/api';
export const createScore = createAsyncThunk(
  'score/createScore',
  async (scoreDto, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/score-creation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scoreDto),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to create score');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getScore = createAsyncThunk(
  'score/getScore',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/score/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch score');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getTopUsersByScore = createAsyncThunk(
  'score/getTopUsersByScore',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getTopscore`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch top scores');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    currentScore: null,
    topScores: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearScoreState: (state) => {
      state.currentScore = null;
      state.topScores = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createScore.fulfilled, (state, action) => {
        state.loading = false;
        state.currentScore = action.payload;
      })
      .addCase(createScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getScore.fulfilled, (state, action) => {
        state.loading = false;
        state.currentScore = action.payload;
      })
      .addCase(getScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTopUsersByScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopUsersByScore.fulfilled, (state, action) => {
        state.loading = false;
        state.topScores = action.payload;
      })
      .addCase(getTopUsersByScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearScoreState } = scoreSlice.actions;
export default scoreSlice.reducer;