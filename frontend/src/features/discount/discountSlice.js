import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const DiscountSlice = createSlice({
      name: 'discountAmount',
      initialState,
      reducers: {
            setDiscountAmount: (state, action) => {
                  return action.payload
            },
            getDiscountAmount: (state, action) => {
                return state;
            }
      }
})

export const {setDiscountAmount, getDiscountAmount} = DiscountSlice.actions;

export default DiscountSlice.reducer;