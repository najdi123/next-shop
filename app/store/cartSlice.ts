import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

export interface CartItem {
    product: Product;
    color: string;
    size: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        /**
         * Add (or increment) an item in the cart.
         * - If item with same (product.id, color, size) exists, quantity += action.payload.quantity
         * - else, push new item
         */
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const { product, color, size } = action.payload;
            const existingItem = state.items.find(
                (i) =>
                    i.product.id === product.id &&
                    i.color === color &&
                    i.size === size
            );
            console.log('add product called 99999999999999999999')
            console.log('action.payload', action.payload)
            if (existingItem) {
                console.log('iffffffffff')

                existingItem.quantity += action.payload.quantity;
            } else {
                console.log('elseeeeeeeeeeee')

                state.items.push(action.payload);
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {
    addToCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
