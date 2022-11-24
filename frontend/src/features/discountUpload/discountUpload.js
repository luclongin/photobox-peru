import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DiscountService from "../../services/DiscountService";

const initialState = [];

export const createDiscount = createAsyncThunk(
      "orders/createDiscount",
      async (discount) => {
            const res = await DiscountService.createDiscount(discount);
            return res.data;
      }
);

export const checkDiscount = createAsyncThunk(
      "orders/checkDiscount",
      async (discountId) => {
            const res = await DiscountService.checkDiscount(discountId);
            let result;
            if(res.data.exists) {
                  console.log("res data:", res.data);
                  // if the discount exists
                  result = {
                        discountId: res.data.id,
                        discountAmount: res.data.amount
                  }
            } else {
                  // if the discount is wrong
                  result = false;
            }
            return result;
      }
)

export const getDiscounts = createAsyncThunk(
      "orders/getDiscounts",
      async () => {
            const res = await DiscountService.getDiscounts();
            return res.data;
      }
);

export const deleteDiscount = createAsyncThunk(
      "orders/discounts",
      async (discountId) => {
            console.log("thunkbefore");
            const res = await DiscountService.deleteDiscount(discountId);
            console.log("thunkafter");
            return res.data;
      }
)

const discountSlice = createSlice({
      name: "discounts",
      initialState,
      extraReducers: {
            [createDiscount.fulfilled]: (state, action) => {
                  state.push(action.payload);
            },
            [getDiscounts.fulfilled]: (state, action) => {
                  return [...action.payload];
            },
            [checkDiscount.fulfilled]: (state, action) => {
                  return;
            },
            [deleteDiscount.fulfilled]: (state, action) => {
                  let index = state.findIndex(({discountId}) => discountId === action.payload.discountId);
                  state.splice(index, 1);
            }
      },
});


const { reducer } = discountSlice;
export default reducer;