import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = new Array();

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
                                    hidden: true,
                                    type: null
                              }
                        }
                  }
            },
            photoDirectAdded: {
                  reducer(state, action) {
                        state.push(action.payload)
                  },
                  prepare({imgSrc, imgDimensions, type}) {
                        return {
                              payload: {
                                    id: nanoid(),
                                    imgSrc,
                                    imgResult: imgSrc,
                                    imgDimensions,
                                    hidden: false,
                                    type
                              }
                        }
                  }
            },
            photoUpdatedSrc(state, action) {
                  const {id, imgSrc, type} = action.payload;
                  const existingPhoto = state.find(photo => photo.id === id);
                  if(existingPhoto) {
                        existingPhoto.imgSrc = imgSrc;
                        existingPhoto.imgResult = imgSrc;
                        existingPhoto.hidden = false;
                        existingPhoto.type = type;
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
            }
      }
})

export const {
            photoAdded,
            photoDirectAdded,
            photoSetName,
            photoUpdatedSrc,
            photoUpdatedResult,
            photoDeleted,
            allPhotosDeleted
      } = photoSlice.actions;


export default photoSlice.reducer;