import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import OrderService from "../../services/OrderService";

const initialState = [];

/*
export const createUser = createAsyncThunk(
      "users/create",
      async ({firstName, lastName, photo}) => {
            const res = await UserService.create({firstName: firstName, lastName: lastName, photo: photo});
            return res.data;
      }
);*/

export const uploadCroppedPhotos = createAsyncThunk(
      "orders/upload",
      async (photo) => {
            console.log("thunkbefore");
            const res = await OrderService.upload(photo);
            console.log("thunkafter");
            return res.data;
      }
);
/*
export const retrieveUsers = createAsyncThunk(
      "users/retrieve",
      async () => {
        const res = await UserService.getAll();
        return res.data;
      }
    );

export const findUsersByName = createAsyncThunk(
"tutorials/findByName",
async ({ firstName }) => {
      const res = await UserService.findByName(firstName);
      return res.data;
}
);*/

const ordersSlice = createSlice({
      name: "order",
      initialState,
      extraReducers: {
            /*[createUser.fulfilled]: (state, action) => {
                  state.push(action.payload);
                },
            
            [retrieveUsers.fulfilled]: (state, action) => {
                  return [...action.payload];
            },
            [findUsersByName.fulfilled]: (state, action) => {
                  return [...action.payload];
            },*/
            [uploadCroppedPhotos.fulfilled]: (state, action) => {
                  return state;
            },
      },
});

const { reducer } = ordersSlice;
export default reducer;