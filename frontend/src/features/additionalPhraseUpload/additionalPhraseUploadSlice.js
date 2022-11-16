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
            console.log("thunkbefore");
            const res = await AdditionalPhraseService.getAdditionalPhrases();
            console.log("thunkafter");
            return res.data;
      }
);

const uploadedAdditionalPhraseSlice = createSlice({
      name: "additionalPhrase",
      initialState,
      extraReducers: {
            [createAdditionalPhrase.fulfilled]: (state, action) => {
                  state.push(action.payload);
            },
            [getAdditionalPhrases.fulfilled]: (state, action) => {
                  return [...action.payload];
            }
      }
});

const { reducer } = uploadedAdditionalPhraseSlice;
export default reducer;