import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/UserService";

const initialState = [];

export const createUser = createAsyncThunk(
      "orders/createUser",
      async (userData) => {
            const res = await UserService.createUser(userData);
            return res.data;
      }
);

export const getUsers = createAsyncThunk(
      "orders/users",
      async () => {
            console.log("thunkbeforeuser");
            const res = await UserService.getUsers();
            console.log("thunkafteruser");
            return res.data;
      }
);

const uploadedUserSlice = createSlice({
      name: "uploadedUser",
      initialState,
      extraReducers: {
            [createUser.fulfilled]: (state, action) => {
                  state.push(action.payload);
            },
            [getUsers.fulfilled]: (state, action) => {
                  return [...action.payload];
            }
      }
});

const { reducer } = uploadedUserSlice;
export default reducer;