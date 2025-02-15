import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "@/types";

type AddReviewPayload = {
    productId: number;
    name: string;
    review: string;
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => "/api/products",
        }),
        getProductById: builder.query<Product, number>({
            query: (productId) => `/api/product/${productId}`,
        }),
        addReview: builder.mutation<Product, AddReviewPayload>({
            query: ({ productId, name, review }) => ({
                url: `/api/product/${productId}/review`,
                method: "POST",
                body: { name, review },
            }),
            async onQueryStarted({ productId, name, review }, { dispatch, queryFulfilled }) {
                // Optimistically update the cache for getProductById
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("getProductById", productId, (draft) => {
                        draft.reviews.unshift({
                            name,
                            review,
                            timestamp: new Date().toISOString(),
                        });
                    })
                );

                try {
                    // Wait for the API response
                    const { data: updatedProduct } = await queryFulfilled;

                    // Replace the entire product data to ensure we don't duplicate the review
                    dispatch(
                        apiSlice.util.updateQueryData("getProductById", productId, (draft) => {
                            Object.assign(draft, updatedProduct);
                        })
                    );
                } catch {
                    // If API call fails, revert optimistic update
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAddReviewMutation,
} = apiSlice;
