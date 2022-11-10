import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import OrderService from "../../services/OrderService";

const initialState = [];

export const createOrder = createAsyncThunk(
      "orders/create",
      async (orderData) => {
            const res = await OrderService.create(orderData);
            console.log("thunkafter");
            return res.data;
      }
);

export const uploadCroppedPhotos = createAsyncThunk(
      "orders/upload",
      async (photo) => {
            const res = await OrderService.upload(photo);
            return res.data;
      }
);

export const retrieveOrders = createAsyncThunk(
      "orders/retrieve",
      async () => {
            console.log("thunkbefore");
            const res = await OrderService.getAll();
            console.log("thunkbefore");
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
            [uploadCroppedPhotos.fulfilled]: (state, action) => {
                  return state;
            },
      },
});

const { reducer } = ordersSlice;
export default reducer;