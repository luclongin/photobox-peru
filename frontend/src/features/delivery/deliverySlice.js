import { createSlice } from "@reduxjs/toolkit";

const initialState = "gratis";

const DeliverySlice = createSlice({
      name: 'delivery',
      initialState,
      reducers: {
            setDelivery: (state, action) => {
                  return action.payload
            },
      }
})

export const {setDelivery} = DeliverySlice.actions;

export default DeliverySlice.reducer;