import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      id: "",
      type: "",
      value: ""
};

const AppliedDiscountSlice = createSlice({
      name: 'appliedDiscount',
      initialState,
      reducers: {
            setAppliedDiscount: {
                  reducer(state, action) {
                        const newState = {
                              id: action.payload.id,
                              type: action.payload.type,
                              value: action.payload.value
                        }
                        return newState;
                  }
            },
            getAppliedDiscount: (state, action) => {
                return state;
            }
      }
})

export const {setAppliedDiscount, getAppliedDiscount} = AppliedDiscountSlice.actions;

export default AppliedDiscountSlice.reducer;