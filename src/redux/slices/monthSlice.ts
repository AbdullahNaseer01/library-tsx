import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface FetchMonthBooksParams {
  startIndex: number;
  maxResults: number;
}

interface MonthState {
  isLoading: boolean;
  data: any | null;
  isError: boolean;
}
export const fetchMonthBooks = createAsyncThunk(
  "fetchMonthBooks", // Correct action type
  async ({ startIndex, maxResults }: FetchMonthBooksParams) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=rich+dad:keyes&startIndex=${startIndex}&maxResults=${maxResults}&key=${import.meta.env.VITE_APIKEY}`);
    const data = await response.json();
    return data;
  }
);

const initialState: MonthState = {
  isLoading: false,
  data: null,
  isError: false,
};

const monthSlice = createSlice({
  name: "monthBooks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMonthBooks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMonthBooks.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchMonthBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});

export default monthSlice.reducer;
