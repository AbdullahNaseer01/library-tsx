import { configureStore } from '@reduxjs/toolkit'
import booksReducer from "./slices/booksSlice"
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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch