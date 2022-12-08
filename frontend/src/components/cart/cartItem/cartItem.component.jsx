import { Box, Grid, Typography, IconButton } from "@mui/material";
import React, {useState} from "react";
import theme from "../../../utils/theme";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useSelector, useDispatch } from "react-redux";
import { allPhotosDeleted } from "../../../features/photoEdition/PhotoSlice";
import { phraseDeleted } from "../../../features/additionalPhrase/AdditionalPhraseSlice";

const CartItem = ({id, title, subtitle, image, quantity, price, cartCount, setCartCount}) => {
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
                  boxShadow: 2
            }}>
                  <Grid container sx={{padding: 1, height: '75px'}}>
                        <Grid item xs="auto" justifyContent="center" alignItems="center" sx={{}}>
                              <Box sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 2,
                                    
                                    backgroundColor: theme.palette.primary.main
                              }}>
                              </Box>
                        </Grid>
                        <Grid item xs={7} alignItems="center" sx={{position: 'relative'}}>
                              <Grid container>
                                    <Grid item xs={12}>
                                          <Typography variant="carth1" sx={{
                                                position: 'absolute', top: 4, left: 10, textAlign: 'left'}}>
                                                {title}
                                          </Typography>
                                    </Grid>  
                                    <Grid item xs={12}>
                                          <Typography variant="carth3" sx={{
                                                position: 'absolute', top: 23, left: 10, textAlign: 'left', color: '#9B8E9A'}}>
                                                {subtitle}
                                          </Typography>
                                    </Grid>  
                                    <Grid item xs={12} sx={{backgroundColor: 'orange'}}>
                                          <Typography variant="carth2" sx={{
                                                position: 'absolute', bottom: 1, left: 10
                                          }}>
                                                {quantity}x
                                          </Typography>
                                    </Grid>    
                              </Grid>
                              
                        </Grid>
                        <Grid item xs={2} sx={{position: 'relative'}}>
                              <IconButton sx={{
                                    position: 'absolute',
                                    top: -10,
                                    right: -20,
                                    
                              }} onClick={handleDeleteCartItem}>
                                    <HighlightOffIcon fontSize="small" />
                              </IconButton>
                              <Typography variant="carth1" sx={{
                                    position: 'absolute',
                                    bottom: 0,
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