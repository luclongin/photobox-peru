import { Box, Grid, Typography, IconButton } from "@mui/material";
import React, {useState} from "react";
import theme from "../../../utils/theme";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch } from "react-redux";
import { allPhotosDeleted } from "../../../features/photoEdition/PhotoSlice";
import { phraseDeleted } from "../../../features/additionalPhrase/AdditionalPhraseSlice";
const CartItem = ({id, title, image, quantity, price, cartCount, setCartCount}) => {
      const dispatch = useDispatch();
      
      const handleDeleteCartItem = (e) => {
            if(id === 'photosSet') {
                  // photoSet 
                  dispatch(allPhotosDeleted());
                  //alert("photoSet");
            } else {
                  // additional Phrase
                  dispatch(phraseDeleted({id: id}));
                  //alert("phrase")
            }
      }
      return(
            <Box sx={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 2,
                  //border: '1px solid ' + theme.palette.primary.main,
                  mb: 1,
                  boxShadow: 3
            }}>
                  <Grid container sx={{padding: 1}}>
                        <Grid item xs="auto" justifyContent="center" alignItems="center" sx={{}}>
                              <Box sx={{
                                    width: 60,
                                    height: 50,
                                    borderRadius: 2,
                                    backgroundColor: theme.palette.primary.main
                              }}>
                              </Box>
                        </Grid>
                        <Grid item xs={6} alignItems="center" sx={{position: 'relative'}}>
                              <Typography variant="carth1" sx={{
                                    position: 'absolute', top: 4, left: 10
                              }}>{title}</Typography>
                              <Typography variant="carth2" sx={{
                                    position: 'absolute', bottom: 2, left: 10
                              }}>{quantity}x</Typography>
                        </Grid>
                        <Grid item xs={3} sx={{position: 'relative', backgroundColor: ''}}>
                              <IconButton sx={{
                                    position: 'absolute',
                                    top: -10,
                                    right: -20,
                                    
                              }} onClick={handleDeleteCartItem}>
                                    <HighlightOffIcon fontSize="small" />
                              </IconButton>
                              <Typography variant="carth2" sx={{
                                    position: 'absolute',
                                    bottom: 2,
                                    right: -10,
                                    color: "#000000"
                              }}>
                                    {price} S/
                              </Typography>
                        </Grid>
                  </Grid>
            </Box>
      );
}

export default CartItem;