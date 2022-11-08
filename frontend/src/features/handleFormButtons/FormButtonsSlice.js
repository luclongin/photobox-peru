import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      enableBackButton: false,
      enableNextButton: false,
      enableSubmitButton: false
};

const FormButtonsSlice = createSlice({
      name: 'formButtons',
      initialState,
      reducers: {
            nextButtonEnabled: (state, action) => {
                  state.enableNextButton = action.payload;
            },
            backButtonEnabled: (state, action) => {
                  state.enableBackButton = action.payload;
            },
            submitButtonEnabled: (state, action) => {
                  state.enableSubmitButton = action.payload;
            }

      }
})

export const { nextButtonEnabled, backButtonEnabled, submitButtonEnabled } = FormButtonsSlice.actions;
export default FormButtonsSlice.reducer;