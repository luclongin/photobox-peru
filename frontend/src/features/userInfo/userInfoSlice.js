import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
      userId: "",
      userFullName: "",
      userEmail: "",
      userAddress: "",
      userPhoneNumber: "",
      userDistrict: "",
      userCity: ""
};

const UserInfoSlice = createSlice({
      name: 'userInfo',
      initialState,
      reducers: {
            setAddress: {
                  reducer(state, action) {
                        return action.payload
                  },
                  prepare({
                        userFullName,
                        userEmail,
                        userAddress,
                        userPhoneNumber,
                        userDistrict,
                        userCity
                  }) {
                        return {
                              payload: {
                                    userId: nanoid(),
                                    userFullName,
                                    userEmail,
                                    userAddress,
                                    userPhoneNumber,
                                    userDistrict,
                                    userCity
                              }
                        }
                  }
            },
            deleteAddress: (state) => {
                  return ({
                        userId: "",
                        userFullName: "",
                        userEmail: "",
                        userAddress: "",
                        userPhoneNumber: "",
                        userDistrict: "",
                        userCity: ""
                  });
            }
      }
})

export const {setAddress, deleteAddress} = UserInfoSlice.actions;

export default UserInfoSlice.reducer;