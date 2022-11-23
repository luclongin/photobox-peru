import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LetterService from "../../services/LetterService";

const initialState = [];

export const createLetter = createAsyncThunk(
      "orders/createLetter",
      async (data) => {
            const res = await LetterService.createLetter(data);
            return res.data;
      }
);

export const getLetters = createAsyncThunk(
      "orders/getLetters",
      async () => {
            const res = await LetterService.getLetters();
            return res.data;
      }
);

export const deleteLetter = createAsyncThunk(
      "orders/deleteLetter",
      async (orderId) => {
            const res = await LetterService.deleteLetter(orderId);
            return res.data;
      }
)

const letterUploadSlice = createSlice({
      name: "letters",
      initialState,
      extraReducers: {
            [createLetter.fulfilled]: (state, action) => {
                  state.push(action.payload);
            },
            [getLetters.fulfilled]: (state, action) => {
                  return [...action.payload];
            },
            [deleteLetter.fulfilled]: (state, action) => {
                  let index = state.findIndex(({orderId}) => orderId === action.payload.orderId);
                  state.splice(index, 1);
            },
      }
});



const { reducer } = letterUploadSlice;
export default reducer;