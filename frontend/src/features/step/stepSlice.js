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
            setStep: (state, action) => {
                  state.value = action.payload
            }
      }
})

export const {incrementStep, decrementStep, setStep} = StepSlice.actions;

export default StepSlice.reducer;