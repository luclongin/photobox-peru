import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialItem = {
    id: nanoid(),
    imgSrc: null,
    imgResult: null,
    imgDimensions,
    hidden: true,
    type: null
}

const initialState = {
    0: initialItem,
    1: initialItem,
    2: initialItem
}

const letrasPhotoSlice = createSlice({
      name: 'letrasPhotos',
      initialState,
      reducers: {
            letrasPhotoUpdatedSrc(state, action) {
                  const {id, imgSrc, type} = action.payload;
                  const existingPhoto = state.find(photo => photo.id === id);
                  if(existingPhoto) {
                        existingPhoto.imgSrc = imgSrc;
                        existingPhoto.imgResult = imgSrc;
                        existingPhoto.hidden = false;
                        existingPhoto.type = type;
                  }
            },
            letrasPhotoUpdatedResult(state, action) {
                  const {id, imgResult} = action.payload;
                  const existingPhoto = state.find(photo => photo.id === id);
                  if(existingPhoto) {
                        existingPhoto.imgResult = imgResult;
                  } 
            },
            letrasPhotoDeleted(state, action) {
                  const {id} = action.payload;
                  const existingPhoto = state.find(photo => photo.id === id);
                  const idx = state.indexOf(existingPhoto);
                  state.splice(idx, 1);
            }
      }
})

export const {
    letrasPhotoUpdatedSrc,
    letrasPhotoUpdatedResult,
    letrasPhotoDeleted,
      } = letrasPhotoSlice.actions;


export default letrasPhotoSlice.reducer;