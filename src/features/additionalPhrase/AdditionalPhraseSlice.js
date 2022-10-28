import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

export const defaultPhrases = {
      "family": {
            text: "Family",
            color: "brown"
      },
      "friends": {
            text: "Friends",
            color: "wood"
      }
};

const AdditionalPhraseSlice = createSlice({
      name: 'photos',
      initialState,
      reducers: {
            customPhraseAdded: {
                  reducer(state, action) {
                        state.push(action.payload)
                  },
                  prepare({text, color}) {
                        return {
                              payload: {
                                    id: nanoid(),
                                    text,
                                    color
                              }
                        }
                  }
            },
            // adding default phrase data from dictionary
            defaultPhraseAdded(state, action) {
                  console.log("start");
                  const {defaultPhrase} = action.payload;
                  const {text, color} = defaultPhrases[defaultPhrase];
                  state.push({
                        id: nanoid(),
                        text: text,
                        color: color
                  });
            },
            phraseDeleted(state, action) {
                  const {id} = action.payload;
                  const existingPhrase = state.find(phrase => phrase.id === id);
                  const idx = state.indexOf(existingPhrase);
                  state.splice(idx, 1);
            },
            allPhrasesDeleted(state) {
                  return []
            }
      }
})

export const {
            customPhraseAdded,
            defaultPhraseAdded,
            phraseDeleted,
            allPhrasesDeleted
      } = AdditionalPhraseSlice.actions;


export default AdditionalPhraseSlice.reducer;