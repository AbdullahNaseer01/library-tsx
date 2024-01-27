import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface SearchBooksParams {
  query: string;
  startIndex: number;
  maxResults: number;
}

interface SearchState {
  isLoading: boolean;
  data: any | null;
  isError: boolean;
}

export const searchBooks = createAsyncThunk(
  "searchBooks",
  async ({ query, startIndex, maxResults }: SearchBooksParams) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}:keyes&startIndex=${startIndex}&maxResults=${maxResults}&key=${import.meta.env.VITE_APIKEY}`);
    const data = await response.json();
    return data;
  }
);

const initialState: SearchState = {
  isLoading: false,
  data: null,
  isError: false,
};

const searchSlice = createSlice({
  name: "searchBooks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchBooks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchBooks.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(searchBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});

export default searchSlice.reducer;
