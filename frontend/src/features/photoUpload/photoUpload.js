import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import PhotoService from "../../services/PhotoService";

const initialState = [];

export const uploadCroppedPhotos = createAsyncThunk(
      "orders/upload",
      async (photo) => {
            const res = await PhotoService.uploadPhoto(photo);
            return res.data;
      }
);

export const createPhoto = createAsyncThunk(
      "orders/createPhoto",
      async (photoData) => {
            const res = await PhotoService.createPhoto(photoData);
            return res.data;
      }
);

export const getPhotos = createAsyncThunk(
      "orders/getPhotos",
      async () => {
            const res = await PhotoService.getPhotos();
            return res.data;
      }
);

export const deletePhoto = createAsyncThunk(
      "orders/deletePhoto",
      async (orderId) => {
            const res = await PhotoService.deletePhoto(orderId);
            return res.data;
      }
)

const photosSlice = createSlice({
      name: "photos",
      initialState,
      extraReducers: {
            [createPhoto.fulfilled]: (state, action) => {
                  state.push(action.payload);
            },
            [uploadCroppedPhotos.fulfilled]: (state, action) => {
                  return state;
            },
            [getPhotos.fulfilled]: (state, action) => {
                  return [...action.payload];
            },
            [deletePhoto.fulfilled]: (state, action) => {
                  let index = state.findIndex(({orderId}) => orderId === action.payload.orderId);
                  state.splice(index, 1);
            }
      },
});


const { reducer } = photosSlice;
export default reducer;