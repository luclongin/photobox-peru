import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import OrderService from "../../services/OrderService";

const initialState = [];

export const createOrder = createAsyncThunk(
      "orders/createOrder",
      async (orderData) => {
            const res = await OrderService.createOrder(orderData);
            console.log("thunkafter");
            return res.data;
      }
);

export const retrieveOrders = createAsyncThunk(
      "orders/retrieve",
      async () => {
            const res = await OrderService.getAll();
            return res.data;
      }
);

const ordersSlice = createSlice({
      name: "order",
      initialState,
      extraReducers: {
            [createOrder.fulfilled]: (state, action) => {
                  state.push(action.payload);
            },
            [retrieveOrders.fulfilled]: (state, action) => {
                  return [...action.payload];
            },
      },
});

const { reducer } = ordersSlice;
export default reducer;