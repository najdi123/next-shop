import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

export interface CartItem {
    product: Product;
    color: string;
    size: string;
    quantity: number;
}

interface CartState {
    items: Record<string, CartItem>;
}

const initialState: CartState = {
    items: {},
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const { product, color, size, quantity } = action.payload;
            const productKey = `${product.id}_${color}_${size}`; // Unique key

            if (state.items[productKey]) {
                state.items[productKey].quantity += quantity;
            } else {
                state.items[productKey] = action.payload;
            }
        },

        removeFromCart: (
            state,
            action: PayloadAction<{ productId: number; color: string; size: string }>
        ) => {
            const { productId, color, size } = action.payload;
            const productKey = `${productId}_${color}_${size}`;

            delete state.items[productKey]; // Removes item
        },

        updateCartItemQuantity: (
            state,
            action: PayloadAction<{ productId: number; color: string; size: string; newQuantity: number }>
        ) => {
            const { productId, color, size, newQuantity } = action.payload;
            const productKey = `${productId}_${color}_${size}`;

            if (newQuantity <= 0) {
                delete state.items[productKey];
            } else if (state.items[productKey]) {
                state.items[productKey].quantity = newQuantity;
            }
        },

        clearCart: (state) => {
            state.items = {};
        },
    },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
