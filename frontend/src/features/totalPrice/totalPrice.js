import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const TotalPriceSlice = createSlice({
      name: 'totalPrice',
      initialState,
      reducers: {
            setTotalPrice: (state, action) => {
                  return action.payload
            }
      }
})

export const {setTotalPrice} = TotalPriceSlice.actions;

export default TotalPriceSlice.reducer;