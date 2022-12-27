import { Box, Divider, Grid, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Paper, Container, Typography, InputAdornment } from "@mui/material";
import React, {useEffect} from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
import { getLetters } from "../../features/lettersUpload/lettersUploadSlice";
import { useState } from "react";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { createDiscount, getDiscounts } from "../../features/discountUpload/discountUpload";
import { nanoid } from "@reduxjs/toolkit";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const AdminPage = () => {
      const dispatch = useDispatch();
      const orders = useSelector(state => state.orders);
      const uploadedPhotos = useSelector(state => state.uploadedPhotos);
      const uploadedUsers = useSelector(state => state.uploadedUser);
      const uploadedPhrases = useSelector(state => state.uploadedAdditionalPhrases);
      const uploadedLetters = useSelector(state => state.uploadedLetters);
      const [couponStartDate, setCouponStartDate] = useState(null);
      const [couponEndDate, setCouponEndDate] = useState(null);
      const discounts = useSelector(state => state.uploadedDiscounts);

      const initFnc = useCallback(() => {
            dispatch(getDiscounts());
            dispatch(getLetters());
            dispatch(retrieveOrders());
            dispatch(getPhotos());
            dispatch(getUsers());
            dispatch(getAdditionalPhrases());
      }, [dispatch]);

      useEffect(() => {
            initFnc();
      }, [initFnc]);

      const [coupon, setCoupon] = useState({
            type: "percentage",
            code: "",
            value: "",
            startDate: null,
            endDate: null
      });

      const handleCouponChange = (e) => {
            const name = e.target.name;
            setCoupon({
                  ...coupon,
                  [name]: e.target.value
            });
      }

      const handleStartDateChange = (newValue) => {
            setCouponStartDate(newValue);
            setCoupon({
                  ...coupon,
                  startDate: newValue.toISOString()
            });
      }
      const handleEndDateChange = (newValue) => {
            setCouponEndDate(newValue);
            setCoupon({
                  ...coupon,
                  endDate: newValue.toISOString()
            });
      }

      const handleSubmitCoupon = (e) => {
            e.preventDefault();
            let couponData = new FormData();
            const couponId = coupon.code;
            couponData.append('discountId', couponId);
            couponData.append('discountType', 'coupon');
            if(coupon.type === "percentage") {
                  couponData.append('discountAmount', "");
                  couponData.append('discountPercentage', coupon.value);
            } else {
                  couponData.append('discountAmount', coupon.value);
                  couponData.append('discountPercentage', "");
            }
            couponData.append('discountStartDate', coupon.startDate);
            couponData.append('discountEndDate', coupon.endDate);
            couponData.append('discountUsedAddresses', "");
            if(couponId !== "" && coupon.value !== "" && coupon.startDate !== ""
            && coupon.startDate !== "" && coupon.type !== "") {
                  dispatch(createDiscount(couponData)).then(res => {
                        setCoupon({
                              type: "percentage",
                              code: "",
                              value: "",
                              startDate: null,
                              endDate: null
                        });
                        setCouponStartDate(null);
                        setCouponEndDate(null);
                  });
            }
      }

      return(
            <Container fluid="true">
                  <Box>
                        <Button variant="contained" sx={{}}>
                              Refresh
                        </Button>
                  </Box>
                  <Box>
                        <Grid container>
                              <Grid item xs={12}>
                                    <h1>
                                          Crear nuevo coupon
                                    </h1>
                              </Grid>
                              <Grid item xs={12} sx={{mt: 0}}>
                                    <TextField
                                          label="Codigo de coupon"
                                          variant="outlined"
                                          onChange={handleCouponChange}
                                          name="code"
                                          value={coupon.code}
                                    />
                              </Grid>
                              <Grid item xs={12} sx={{mt: 2}}>
                                    <FormControl>
                                          <FormLabel>Tipo de coupon</FormLabel>
                                          <RadioGroup
                                          row
                                          value={coupon.type}
                                          name="type"
                                          onChange={handleCouponChange}
                                          >
                                                <FormControlLabel value="percentage" control={<Radio />} label="Porcentaje" />
                                                <FormControlLabel value="amount" control={<Radio />} label="Monto fijo" />
                                          </RadioGroup>
                                    </FormControl>
                              </Grid>
                              <Grid item xs={12}>
                                    <TextField
                                                label="Monto"
                                                variant="outlined"
                                                name="value"
                                                onChange={handleCouponChange}
                                                value={coupon.value}
                                                InputProps={{
                                                      endAdornment:<InputAdornment position="end">
                                                                  {coupon.type==="percentage" ? "%" : "S/"}
                                                                  </InputAdornment>
                                                }}
                                          />
                              </Grid>
                              <Grid item xs={12} sx={{mt: 1, display: "inline-flex", width: "50%" }}>
                                    <Box>
                                          <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <DatePicker
                                                      label="Fecha de inicio"
                                                      value={couponStartDate}
                                                      name="startDate"
                                                      onChange={handleStartDateChange}
                                                      renderInput={(params) => <TextField {...params} />}
                                                />
                                          </LocalizationProvider>
                                    </Box>
                                    <Box sx={{ml: 2}}>
                                          <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <DatePicker
                                                      label="Fecha de fin"
                                                      name="endDate"
                                                      value={couponEndDate}
                                                      onChange={handleEndDateChange}
                                                      renderInput={(params) => <TextField {...params} />}
                                                />
                                          </LocalizationProvider>
                                    </Box>
                                    
                              </Grid>
                              <Grid item xs={12} sx={{mt: 2}}>
                                    <Button variant="contained" onClick={handleSubmitCoupon} sx={{backgroundColor: '#FF36C4', p: 1.5}}>
                                          Iniciar Coupon
                                    </Button>
                              </Grid>
                        </Grid>
                  </Box>
                  <Divider sx={{mt: 5, mb: 2}}></Divider>
                  <Box>
                        <Grid container sx={{width: '80%'}}>
                              <Grid item xs={12}>
                                    <h1>Lista de descuentos</h1>
                              </Grid>   
                              <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">                                          <TableHead>
                                                <TableRow>
                                                      <TableCell>Descuento ID</TableCell>
                                                      <TableCell align="right">Tipo</TableCell>
                                                      <TableCell align="right">Monto (S/)</TableCell>
                                                      <TableCell align="right">Porcentaje</TableCell>
                                                      <TableCell align="right">Fecha creacion</TableCell>
                                                      <TableCell align="right">Fecha expiracion</TableCell>
                                                </TableRow>
                                          </TableHead>
                                          <TableBody>
                                                {
                                                      discounts.map((discount, discountIndex) => {
                                                            return(<TableRow key={discount.discountId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                  <TableCell component="th" scope="row">
                                                                        {discount.discountId}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                        {discount.discountType}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                        {discount.discountAmount}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                        {discount.discountPercentage}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                        {discount.discountStartDate}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                        {discount.discountEndDate}
                                                                  </TableCell>
                                                            </TableRow>);
                                                      })
                                                }
                                          </TableBody>
                                    </Table>
                              </TableContainer>
                        </Grid>
                  </Box>
                  <Divider sx={{mt: 5, mb: 2}}></Divider>
                  <Box sx={{justifyContent: 'center', display: 'flex', backgroundColor: '#eee', mt: 5}}>
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
                                                      <p><b>Precio</b> {order.totalPrice}</p>
                                                      <p><b>Metodo de pago</b> {order.paymentType}</p>
                                                      <p><b>Estado de pago</b> {order.hasPaid}</p>
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
                                                      
                                                      <p>
                                                            {
                                                                  uploadedLetters.map((letter, letterIndex) => {
                                                                        if(letter.orderId === order.orderId) {
                                                                              return(
                                                                                    <Fragment>
                                                                                          <p><b>Letters</b></p>
                                                                                          <span key={letterIndex}>{letter.letter1}</span>
                                                                                          <span key={letterIndex}>{letter.letter2}</span>
                                                                                          <span key={letterIndex}>{letter.letter3}</span>
                                                                                    </Fragment>
                                                                              );
                                                                        }
                                                                  })
                                                            }
                                                      </p>
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
            </Container>
      );
}

export default AdminPage;