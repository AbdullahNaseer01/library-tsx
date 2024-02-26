// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import {Book} from "../../Types/types"


// export interface SearchBooksParams {
//   query: string;
//   startIndex: number;
//   maxResults: number;
// }
// export interface BooksResponse {
//   kind: string;
//   totalItems: number;
//   items: Book[];
// }
// export interface SearchState {
//   isLoading: boolean;
//   data: BooksResponse | null;
//   isError: boolean;
// }

// export const searchBooks = createAsyncThunk(
//   "searchBooks",
//   async ({ query, startIndex, maxResults }: SearchBooksParams) => {
//     const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}:keyes&startIndex=${startIndex}&maxResults=${maxResults}&key=${import.meta.env.VITE_APIKEY}`);
//     const data = await response.json();
//     return data;
//   }
// );

// const initialState: SearchState = {
//   isLoading: false,
//   data: null,
//   isError: false,
// };

// const searchSlice = createSlice({
//   name: "searchBooks",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(searchBooks.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(searchBooks.rejected, (state) => {
//       state.isLoading = false;
//       state.isError = true;
//     });
//     builder.addCase(searchBooks.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.data = action.payload;
//     });
//   },
// });

// export default searchSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Book } from "../../types/types";

export interface SearchBooksParams {
  query: string;
  startIndex: number;
  maxResults: number;
}

export interface BooksResponse {
  kind: string;
  totalItems: number;
  items: Book[];
}

export interface SearchState {
  isLoading: boolean;
  data: BooksResponse | null;
  isError: boolean;
}

export const searchBooks = createAsyncThunk(
  "searchBooks",
  async ({ query, startIndex, maxResults }: SearchBooksParams) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}:keyes&startIndex=${startIndex}&maxResults=${maxResults}&key=${import.meta.env.VITE_APIKEY}`);
      return response.data;
    } catch (error) {
      throw error;
    }
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
    builder
      .addCase(searchBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchBooks.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default searchSlice.reducer;
