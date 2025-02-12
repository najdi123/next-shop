import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

export function makeStore() {
    return configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
    })
}

export const store = makeStore()
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>