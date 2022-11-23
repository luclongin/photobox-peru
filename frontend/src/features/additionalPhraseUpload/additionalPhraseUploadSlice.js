import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AdditionalPhraseService from "../../services/AdditionalPhraseService";

const initialState = [];

export const createAdditionalPhrase = createAsyncThunk(
      "orders/createAdditionalPhrase",
      async (phraseData) => {
            const res = await AdditionalPhraseService.createAdditionalPhrase(phraseData);
            return res.data;
      }
);

export const getAdditionalPhrases = createAsyncThunk(
      "orders/getAdditionalPhrases",
      async () => {
            const res = await AdditionalPhraseService.getAdditionalPhrases();
            return res.data;
      }
);

export const deleteAdditionalPhrase = createAsyncThunk(
      "orders/deleteAdditionalPhrase",
      async (orderId) => {
            const res = await AdditionalPhraseService.deleteAdditionalPhrase(orderId);
            return res.data;
      }
)

const uploadedAdditionalPhraseSlice = createSlice({
      name: "additionalPhrase",
      initialState,
      extraReducers: {
            [createAdditionalPhrase.fulfilled]: (state, action) => {
                  state.push(action.payload);
            },
            [getAdditionalPhrases.fulfilled]: (state, action) => {
                  return [...action.payload];
            },
            [deleteAdditionalPhrase.fulfilled]: (state, action) => {
                  let index = state.findIndex(({orderId}) => orderId === action.payload.orderId);
                  state.splice(index, 1);
            },
      }
});



const { reducer } = uploadedAdditionalPhraseSlice;
export default reducer;