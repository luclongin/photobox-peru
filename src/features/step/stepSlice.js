import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      value: 0,
};

const StepSlice = createSlice({
      name: 'step',
      initialState,
      reducers: {
            incrementStep: state => {
                  state.value += 1
            },
            decrementStep: state => {
                  state.value -= 1
            },
      }
})

export const {incrementStep, decrementStep} = StepSlice.actions;

export default StepSlice.reducer;