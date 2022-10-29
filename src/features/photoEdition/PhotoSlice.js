import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = []

const photoSlice = createSlice({
      name: 'photos',
      initialState,
      reducers: {
            photoAdded: {
                  reducer(state, action) {
                        state.push(action.payload)
                  },
                  prepare(imgDimensions) {
                        return {
                              payload: {
                                    id: nanoid(),
                                    imgSrc: null,
                                    imgResult: null,
                                    imgDimensions,
                                    hidden: true
                              }
                        }
                  }
            },
            photoDirectAdded: {
                  reducer(state, action) {
                        state.push(action.payload)
                  },
                  prepare({imgSrc, imgDimensions}) {
                        return {
                              payload: {
                                    id: nanoid(),
                                    imgSrc,
                                    imgResult: imgSrc,
                                    imgDimensions,
                                    hidden: false
                              }
                        }
                  }
            },
            photoUpdatedSrc(state, action) {
                  const {id, imgSrc} = action.payload;
                  const existingPhoto = state.find(photo => photo.id === id);
                  if(existingPhoto) {
                        existingPhoto.imgSrc = imgSrc;
                        existingPhoto.imgResult = imgSrc;
                        existingPhoto.hidden = false;
                  }
            },
            photoUpdatedResult(state, action) {
                  const {id, imgResult} = action.payload;
                  const existingPhoto = state.find(photo => photo.id === id);
                  if(existingPhoto) {
                        existingPhoto.imgResult = imgResult;
                  } 
            },
            photoDeleted(state, action) {
                  const {id} = action.payload;
                  const existingPhoto = state.find(photo => photo.id === id);
                  const idx = state.indexOf(existingPhoto);
                  state.splice(idx, 1);
            },
            allPhotosDeleted(state) {
                  return []
            }
      }
})

export const {
            photoAdded,
            photoDirectAdded,
            photoUpdatedSrc,
            photoUpdatedResult,
            photoDeleted,
            allPhotosDeleted
      } = photoSlice.actions;


export default photoSlice.reducer;