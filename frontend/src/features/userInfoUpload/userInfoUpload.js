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
            const res = await UserService.getUsers();
            return res.data;
      }
);

export const deleteUser = createAsyncThunk(
      "orders/deleteUser",
      async (userId) => {
            const res = await UserService.deleteUser(userId);
            console.log("returned res:", res);
            return res.data;
      }
)

const uploadedUserSlice = createSlice({
      name: "uploadedUser",
      initialState,
      extraReducers: {
            [createUser.fulfilled]: (state, action) => {
                  state.push(action.payload);
            },
            [getUsers.fulfilled]: (state, action) => {
                  return [...action.payload];
            },
            [deleteUser.fulfilled]: (state, action) => {
                  let index = state.findIndex(({userId}) => userId === action.payload.userId);
                  state.splice(index, 1);
            }
      }
});

const { reducer } = uploadedUserSlice;
export default reducer;