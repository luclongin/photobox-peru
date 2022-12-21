import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CheckoutService from "../../services/CheckoutService";

const initialState = [];

export const createPreference = createAsyncThunk(
      "createPreference",
      async (data) => {
            const res = await CheckoutService.createPreference(data);
            return res.data;
      }
);

export const getFeedback = createAsyncThunk(
      "getFeedback",
      async () => {
            const res = await CheckoutService.getFeedback();
            return res.data;
      }
);

const checkoutSlice = createSlice({
      name: "checkout",
      initialState,
      extraReducers: {
            [createPreference.fulfilled]: (state, action) => {
                  return;
            },
            [getFeedback.fulfilled]: (state, action) => {
                  return;
            },
      },
});


const { reducer } = checkoutSlice;
export default reducer;