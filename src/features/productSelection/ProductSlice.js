import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const ProductSlice = createSlice({
      name: 'product',
      initialState,
      reducers: {
            setProduct: (state, action) => {
                  return action.payload
            },
            deleteProduct: (state) => {
                  return ""
            }
      }
})

export const {setProduct, deleteProduct} = ProductSlice.actions;

export default ProductSlice.reducer;