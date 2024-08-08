import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
})

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const response = await fetch('https://dummyjson.com/products');
    const result = await response.json();
    return result.products;
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: 'loading',
    },
    reducers: {
        showProducts(state, action) {
            state.data = action.payload;
            state.status = 'succeeded'
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
        }).addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        }).addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    },
})



export const { showProducts, filterByID } = productSlice.actions;
export default productSlice.reducer