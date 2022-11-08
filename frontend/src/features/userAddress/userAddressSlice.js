import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      userFullName: "",
      userEmail: "",
      userAddress: "",
      userPhoneNumber: "",
      userDistrict: "",
      userCity: ""
};

const AddressSlice = createSlice({
      name: 'address',
      initialState,
      reducers: {
            setAddress: (state, action) => {
                  return action.payload
            },
            deleteAddress: (state) => {
                  return ""
            }
      }
})

export const {setAddress, deleteAddress} = AddressSlice.actions;

export default AddressSlice.reducer;