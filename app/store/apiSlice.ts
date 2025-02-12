import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/api/products',
        }),
        getProductById: builder.query({
            query: (productId) => `/api/product/${productId}`,
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = apiSlice;
