import { createSlice } from "@reduxjs/toolkit";

const initialState = {letter1: "", letter2: "", letter3: ""};
const LetterSlice = createSlice({
      name: 'letters',
      initialState,
      reducers: {
            dispatchLetters: {
                reducer(state, action) {
                    const newState = {
                        letter1: action.payload.letter1,
                        letter2: action.payload.letter2,
                        letter3: action.payload.letter3,
                    }
                    return newState;
                }
            },
      }
})

export const {
    dispatchLetters
} = LetterSlice.actions;


export default LetterSlice.reducer;