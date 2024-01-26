import { configureStore } from '@reduxjs/toolkit'
import booksReducer from "./slices/books"
import monthReducer from "./slices/monthSlice"
import searchReducer from './slices/searchBoookSlice'
import bookDetailsReducer from './slices/bookDetailsSlice'
export const store = configureStore({
    reducer: {
        books: booksReducer,
        monthBooks: monthReducer,
        searchBooks:searchReducer,
        bookDetails: bookDetailsReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch