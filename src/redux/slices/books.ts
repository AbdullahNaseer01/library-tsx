// // import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// // interface FetchBooksParams {
// //   startIndex: number;
// //   maxResults: number;
// // }

// // interface BooksState {
// //   isLoading: boolean;
// //   data: any | null; // Replace 'any' with the actual type of your book data
// //   isError: boolean;
// // }

// // export const fetchBooks = createAsyncThunk(
// //   "fetchBooks",
// //   async ({ startIndex, maxResults }: FetchBooksParams) => {
// //     const response = await fetch(
// //       `https://www.googleapis.com/books/v1/volumes?q=science:keyes&startIndex=${startIndex}&maxResults=${maxResults}&key=${import.meta.env.VITE_APIKEY}`
// //     );
// //     const data = await response.json();
// //     return data;
// //   }
// // );

// // const initialState: BooksState = {
// //   isLoading: false,
// //   data: null,
// //   isError: false,
// // };

// // const booksSlice = createSlice({
// //   name: "books",
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder.addCase(fetchBooks.pending, (state) => {
// //       state.isLoading = true;
// //     });
// //     builder.addCase(fetchBooks.rejected, (state, action) => {
// //       state.isLoading = false;
// //       state.isError = true;
// //       console.log("error", (action.payload as PayloadAction));
// //     });
// //     builder.addCase(fetchBooks.fulfilled, (state, action) => {
// //       state.isLoading = false;
// //       state.data = action.payload;
// //     });
// //   },
// // });

// // export default booksSlice.reducer;



// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// interface FetchBooksParams {
//   startIndex: number;
//   maxResults: number;
// }

// interface BooksState {
//   isLoading: boolean;
//   data: any | null; 
//   isError: boolean;
// }

// export const fetchBooks = createAsyncThunk(
//   "fetchBooks",
//   async ({ startIndex, maxResults }: FetchBooksParams) => {
//     const response = await fetch(
//       `https://www.googleapis.com/books/v1/volumes?q=science:keyes&startIndex=${startIndex}&maxResults=${maxResults}&key=${import.meta.env.VITE_APIKEY}`
//     );
//     const data = await response.json();
//     return data;
//   }
// );

// const initialState: BooksState = {
//   isLoading: false,
//   data: null,
//   isError: false,
// };

// const booksSlice = createSlice({
//   name: "books",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchBooks.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(fetchBooks.rejected, (state, action) => {
//       state.isLoading = false;
//       state.isError = true;
//       console.log("error", (action.payload as PayloadAction));
//     });
//     builder.addCase(fetchBooks.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.data = action.payload;
//     });
//   },
// });

// export default booksSlice.reducer;



import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {Book} from "../../Types/types"

// Interfaces for data structures
// interface Book {
//   id: string;
//   volumeInfo?: {
//       title?: string;
//       authors?: string[];
//       publishedDate?: string;
//       pageCount?: number;
//       printType?: string;
//       maturityRating?: string;
//       imageLinks?: {
//           smallThumbnail?: string;
//           thumbnail?: string;
//       };
//   };
// }

interface BooksResponse {
  kind: string;
  totalItems: number;
  items: Book[];
}

// Fetch books action with type parameters
interface FetchBooksParams {
  startIndex: number;
  maxResults: number;
}

// Books state with specific data type
interface BooksState {
  isLoading: boolean;
  data: BooksResponse | null; // Use the BooksResponse type
  isError: boolean;
}

export const fetchBooks = createAsyncThunk<BooksResponse, FetchBooksParams>(
  "fetchBooks",
  async ({ startIndex, maxResults }: FetchBooksParams) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=science:keyes&startIndex=${startIndex}&maxResults=${maxResults}&key=${import.meta.env.VITE_APIKEY}`
    );
    const data = await response.json();
    return data;
  }
);

const initialState: BooksState = {
  isLoading: false,
  data: null,
  isError: false,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log("error", (action.payload as PayloadAction));
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload as BooksResponse; // Type assertion
    });
  },
});

export default booksSlice.reducer;
