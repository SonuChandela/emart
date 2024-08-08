import { createSlice, createSelector } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem(state, action) {
            const { cartItem, itemQuantity } = action.payload;
            const { id } = cartItem;
            // findout item from state 
            const existingProduct = state.items.find(item => item.id === id);
            // const prdQty = itemQuantity || 1;
            if (existingProduct && existingProduct.quantity < 10) {
                existingProduct.quantity += 1; // Increase quantity if the item already exists
            } else if (existingProduct === undefined) {
                state.items.push({ ...cartItem, quantity: 1 });
            }
        },
        removeItem(state, action) {
            const id = action.payload;
            return {
                ...state,
                items: state.items.filter((item) => item.id !== id)
            };
        }, substrackQuantity(state, action) {
            const { id, itemQuantity } = action.payload;
            // findout item from state 
            const filterProduct = state.items.find(item => item.id === id);
            if (filterProduct && filterProduct.quantity > 1) {
                filterProduct.quantity -= 1;
            }
        }, updateQuantity(state, action) {
            const { cartItem, itemQuantity } = action.payload;
            const { id } = cartItem;
            const filterProduct = state.items.find(item => item.id === id);
            if (filterProduct ) {
                filterProduct.quantity = itemQuantity;
            } else {
                state.items.push({ ...cartItem, quantity: itemQuantity });
            }
        }
    }
});

const selectCartItems = state => state.cart.items;

export const selectSubtotal = createSelector(
    [selectCartItems],
    items => {
        return items?.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
);
export const { addItem, removeItem, substrackQuantity, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;