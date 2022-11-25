import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

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