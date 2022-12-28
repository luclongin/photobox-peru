import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imgResolution: false
};

const ErrorMessagesSlice = createSlice({
      name: 'errorMessages',
      initialState,
      reducers: {
        setImgResolutionMsg: (state, action) => {
              state.imgResolution = action.payload;
        },
    }
});

export const {setImgResolutionMsg} = ErrorMessagesSlice.actions;

export default ErrorMessagesSlice.reducer;