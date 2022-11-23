import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import OrderService from "../../services/OrderService";

const initialState = [];

export const createOrder = createAsyncThunk(
      "orders/createOrder",
      async (orderData) => {
            const res = await OrderService.createOrder(orderData);
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

export const deleteOrder = createAsyncThunk(
      "orders/delete",
      async (orderId) => {
            const res = await OrderService.deleteOrder(orderId);
            return res.data;
      }
)

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
            [deleteOrder.fulfilled]: (state, action) => {
                  let index = state.findIndex(({orderId}) => orderId === action.payload.orderId);
                  console.log("index yoyo:", index);
                  state.splice(index, 1);
            },
      },
});

const { reducer } = ordersSlice;
export default reducer;