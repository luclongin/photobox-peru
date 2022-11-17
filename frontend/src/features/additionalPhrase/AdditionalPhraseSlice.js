import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

export const defaultPhrases = {
      "family": {
            phraseText: "Family",
            phraseType: "default"
      },
      "friends": {
            phraseText: "Friends",
            phraseType: "default"
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
                  prepare({phraseText, phraseType, phraseColor}) {
                        return {
                              payload: {
                                    id: nanoid(),
                                    phraseText,
                                    phraseType,
                                    phraseColor
                              }
                        }
                  }
            },
            // adding default phrase data from dictionary
            defaultPhraseAdded(state, action) {
                  const {defaultPhrase} = action.payload;
                  const {phraseText, phraseType} = defaultPhrases[defaultPhrase];
                  state.push({
                        id: nanoid(),
                        phraseText: phraseText,
                        phraseType: phraseType,
                        phraseColor: "default"
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