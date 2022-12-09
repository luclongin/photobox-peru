import { createSlice } from "@reduxjs/toolkit";

const initialState = {yape: false, plin: false};
const HandleDialogsSlice = createSlice({
      name: 'dialogs',
      initialState,
      reducers: {
            setDialogsState: {
                reducer(state, action) {
                    const newState = {
                        yape: action.payload.yape,
                        plin: action.payload.plin
                    }
                    return newState;
                }
            },
      }
})

export const {
    setDialogsState
} = HandleDialogsSlice.actions;


export default HandleDialogsSlice.reducer;