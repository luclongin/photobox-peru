import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

const defaultPhrases = {
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
                  prepare(text, color) {
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
                  const {defaultPhrase} = action.payload;
                  const {defaultText, defaultColor} = defaultPhrases[defaultPhrase];
                  state.push({
                        id: nanoid(),
                        text: defaultText,
                        color: defaultColor
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