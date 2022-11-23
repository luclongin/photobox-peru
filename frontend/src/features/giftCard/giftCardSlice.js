import { createSlice } from "@reduxjs/toolkit";

const initialState = {giftCardId: "", giftCardAmount: "", giftCardDate: ""};

const GiftCardSlice = createSlice({
      name: 'giftcard',
      initialState,
      reducers: {
            setGiftCard: {
                  reducer(state, action) {
                        const newState = {
                              giftCardId: action.payload.giftCardId,
                              giftCardAmount: action.payload.giftCardAmount,
                              giftCardDate: action.payload.giftCardDate,
                        }
                        console.log("newState", newState);
                        return newState;
                  }
              },
            deleteGiftCard: (state) => {
                  return initialState
            }
      }
})

export const {setGiftCard, deleteGiftCard} = GiftCardSlice.actions;

export default GiftCardSlice.reducer;