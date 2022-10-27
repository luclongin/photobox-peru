import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const ProductSlice = createSlice({
      name: 'product',
      initialState,
      reducers: {
            setProduct: (state, action) => {
                  return action.payload
            }
      }
})

export const {setProduct} = ProductSlice.actions;

export default ProductSlice.reducer;