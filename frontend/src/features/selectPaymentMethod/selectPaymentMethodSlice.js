import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const PaymentMethodSlice = createSlice({
      name: 'paymentMethod',
      initialState,
      reducers: {
            setPaymentMethod: (state, action) => {
                  return action.payload
            }
      }
})

export const {setPaymentMethod} = PaymentMethodSlice.actions;

export default PaymentMethodSlice.reducer;