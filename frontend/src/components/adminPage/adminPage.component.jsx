import { Box, Divider, Grid, Button, Paper } from "@mui/material";
import React, {useEffect} from "react";
import { Fragment } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveOrders } from "../../features/order/orders";
import { getPhotos } from "../../features/photoUpload/photoUpload";
import { getUsers } from "../../features/userInfoUpload/userInfoUpload";
import { getAdditionalPhrases } from "../../features/additionalPhraseUpload/additionalPhraseUploadSlice";
import { deleteOrder } from "../../features/order/orders";
import { deleteUser } from "../../features/userInfoUpload/userInfoUpload";
import { deletePhoto } from "../../features/photoUpload/photoUpload";
import { deleteAdditionalPhrase } from "../../features/additionalPhraseUpload/additionalPhraseUploadSlice";

const AdminPage = () => {
      const dispatch = useDispatch();
      const orders = useSelector(state => state.orders);
      const uploadedPhotos = useSelector(state => state.uploadedPhotos);
      const uploadedUsers = useSelector(state => state.uploadedUser);
      const uploadedPhrases = useSelector(state => state.uploadedAdditionalPhrases);
      
      const initFetchOrders = useCallback(() => {
            dispatch(retrieveOrders());
      }, [dispatch]);

      useEffect(() => {
            initFetchOrders()
      }, [initFetchOrders]);

      const initFetchUploadedPhotos = useCallback(() => {
            dispatch(getPhotos());
      }, [dispatch]);

      useEffect(() => {
            initFetchUploadedPhotos()
      }, [initFetchUploadedPhotos]);

      const initFetchUploadedUsers = useCallback(() => {
            dispatch(getUsers());
      }, [dispatch]);

      useEffect(() => {
            initFetchUploadedUsers()
      }, [initFetchUploadedUsers]);

      const initFetchUploadedPhrases = useCallback(() => {
            dispatch(getAdditionalPhrases());
      }, [dispatch]);

      useEffect(() => {
            initFetchUploadedPhrases()
      }, [initFetchUploadedPhrases]);

      return(
            <Box sx={{justifyContent: 'center', display: 'flex', backgroundColor: '#eee'}}>
                  <Grid container spacing={2} sx={{width: "80%"}}>
                        <Grid item xs={12} md={12}>
                              <h1>Lista de pedidos</h1>
                        </Grid>
                  {
                        orders.map((order, orderIndex) => {
                              return(
                                    <Grid key={orderIndex} item xs={12} md={12} sx={{
                                          justifyContent: 'center',
                                          display: 'flex'
                                    }}>
                                          <Paper elevation={2} sx={{
                                                width: "100%", pl: 2, pr: 2, pb: 2
                                          }}>   
                                                <p><b>Pedido</b> {order.orderId}</p>
                                                <p><b>Cliente</b> {order.userId}</p>
                                                {
                                                      uploadedUsers.map((user, userIndex) => {
                                                            if(user.userId === order.userId) {
                                                                        return(
                                                                        <Box key={userIndex}>
                                                                              <p><b>Nombre Completo</b> {user.userFullName}</p>
                                                                              <p><b>Email</b> {user.userEmail}</p>
                                                                              <p><b>Numero de telefono</b> {user.userPhoneNumber}</p>
                                                                              <p><b>Dirección</b> {user.userAddress}</p>
                                                                              <p><b>Distrito</b> {user.userDistrict}</p>
                                                                              <p><b>Ciudad</b> {user.userCity}</p>
                                                                        </Box>
                                                                        );
                                                                  
                                                            }
                                                      })
                                                }
                                                <p><b>Delivery</b> {order.deliveryType}</p>
                                                <p><b>Set</b> {order.productType}</p>
                                                <Divider sx={{mt: 2, mb: 2}}></Divider>
                                                {
                                                      uploadedPhotos.map((photo, photoIndex) => {
                                                            if(photo.orderId === order.orderId) {
                                                                  return(
                                                                       <img key={photoIndex} width="250" height="250" alt="myphoto" src={`http://localhost:8080/uploads/${photo.photoName}`} />      
                                                                  );
                                                            }
                                                      })
                                                }
                                                <Divider sx={{mt: 2, mb: 2}}></Divider>
                                                {
                                                      uploadedPhrases.map((additionalPhrase, phraseIndex) => {
                                                            if(additionalPhrase.orderId === order.orderId) {
                                                                  return(
                                                                        <Box key={phraseIndex}>
                                                                              <Box>
                                                                                    <p><b>Letrero adicional</b></p>
                                                                                    <p><b>ID</b> {additionalPhrase.phraseId}</p>
                                                                                    <p><b>Tipo</b> {additionalPhrase.phraseType}</p>
                                                                                    <p><b>Texto</b> {additionalPhrase.phraseText}</p>
                                                                                    <p><b>Color</b> {additionalPhrase.phraseColor}</p>
                                                                              </Box>
                                                                              <Divider sx={{mt: 2, mb: 2}}></Divider>
                                                                        </Box>
                                                                  );
                                                            }
                                                      })
                                                }

                                                <Box sx={{mt: 2}}>
                                                      <Button variant="contained" sx={{backgroundColor: 'red'}}
                                                      onClick={(e) => {
                                                            dispatch(deleteOrder(order.orderId));
                                                            dispatch(deletePhoto(order.orderId));
                                                            dispatch(deleteUser(order.userId));
                                                            //uploadedPhrases could be null
                                                            if(uploadedPhrases) {
                                                                  dispatch(deleteAdditionalPhrase(order.orderId));
                                                            }
                                                      }
                                                      }>Eliminar Pedido</Button>
                                                </Box>                                          
                                          </Paper>
                                    </Grid>
                              );
                        })
                  }
                  </Grid>
            </Box>
      );
}

export default AdminPage;