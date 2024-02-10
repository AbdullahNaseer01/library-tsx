// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // interface FetchBookDetailsParams {
// //   id: string;
// // }

// // interface BookDetailsState {
// //   isLoading: boolean;
// //   data: any | null;  
// //   isError: boolean;
// // }

// // export const fetchBookDetails = createAsyncThunk(
// //   "bookDetails/fetchBookDetails",
// //   async ({ id }: FetchBookDetailsParams) => {
// //     const response = await fetch(
// //       `https://www.googleapis.com/books/v1/volumes/${id}`
// //     );
// //     const data = await response.json();
// //     return data;
// //   }
// // );

// // const initialState: BookDetailsState = {
// //   isLoading: false,
// //   data: null,
// //   isError: false,
// // };

// // const bookDetailsSlice = createSlice({
// //   name: "bookDetails",
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder.addCase(fetchBookDetails.pending, (state) => {
// //       state.isLoading = true;
// //     });
// //     builder.addCase(fetchBookDetails.rejected, (state) => {
// //       state.isLoading = false;
// //       state.isError = true;
// //     });
// //     builder.addCase(fetchBookDetails.fulfilled, (state, action) => {
// //       state.isLoading = false;
// //       state.data = action.payload;
// //     });
// //   },
// // });

// // export default bookDetailsSlice.reducer;



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// interface FetchBookDetailsParams {
//   id: string;
// }

// interface BookDetailsState {
//   isLoading: boolean;
//   data: any | null;  
//   isError: boolean;
// }

// export const fetchBookDetails = createAsyncThunk(
//   "bookDetails/fetchBookDetails",
//   async ({ id }: FetchBookDetailsParams) => {
//     const response = await fetch(
//       `https://www.googleapis.com/books/v1/volumes/${id}`
//     );
//     const data = await response.json();
//     return data;
//   }
// );

// const initialState: BookDetailsState = {
//   isLoading: false,
//   data: null,
//   isError: false,
// };

// const bookDetailsSlice = createSlice({
//   name: "bookDetails",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchBookDetails.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(fetchBookDetails.rejected, (state) => {
//       state.isLoading = false;
//       state.isError = true;
//     });
//     builder.addCase(fetchBookDetails.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.data = action.payload;
//     });
//   },
// });

// export default bookDetailsSlice.reducer;



// bookDetailsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Book } from "../../Types/types"; // Import the Book interface

interface FetchBookDetailsParams {
  id: string;
}

interface BookDetailsState {
  isLoading: boolean;
  data: Book | null; // Use Book interface for data
  isError: boolean;
}

export const fetchBookDetails = createAsyncThunk<Book, FetchBookDetailsParams>( // Define return type as Book
  "bookDetails/fetchBookDetails",
  async ({ id }: FetchBookDetailsParams) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );
    const data: Book = await response.json(); // Parse response as Book
    return data;
  }
);

const initialState: BookDetailsState = {
  isLoading: false,
  data: null,
  isError: false,
};

const bookDetailsSlice = createSlice({
  name: "bookDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookDetails.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchBookDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});

export default bookDetailsSlice.reducer;
