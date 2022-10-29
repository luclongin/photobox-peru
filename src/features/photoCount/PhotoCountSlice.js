import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      value: 0,
};

const PhotoCountSlice = createSlice({
      name: 'photoCount',
      initialState,
      reducers: {
            incrementPhotoCount: state => {
                  state.value += 1
            },
            decrementPhotoCount: state => {
                  state.value -= 1
            },
      }
})

export const {incrementPhotoCount, decrementPhotoCount} = PhotoCountSlice.actions;

export default PhotoCountSlice.reducer;