import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Book } from "../../Types/types";

interface FetchMonthBooksParams {
  startIndex: number;
  maxResults: number;
}

interface MonthState {
  isLoading: boolean;
  data: Book[] | null;
  isError: boolean;
}

export const fetchMonthBooks = createAsyncThunk<Book[], FetchMonthBooksParams>(
  "fetchMonthBooks",
  async ({ startIndex, maxResults }: FetchMonthBooksParams) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=rich+dad:keyes&startIndex=${startIndex}&maxResults=${maxResults}&key=${import.meta.env.VITE_APIKEY}`);
      return response.data.items as Book[];
    } catch (error) {
      throw error;
    }
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
    builder
      .addCase(fetchMonthBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMonthBooks.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchMonthBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default monthSlice.reducer;
