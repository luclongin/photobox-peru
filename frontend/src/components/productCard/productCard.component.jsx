import React from 'react';
import Paper from '@mui/material/Paper';
import { Box, ButtonBase, Radio, Typography } from '@mui/material';
import {RadioGroup, FormControlLabel, Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../../features/productSelection/ProductSlice';
import { nextButtonEnabled } from '../../features/handleFormButtons/FormButtonsSlice';
import { useState, useEffect} from 'react';
import {Card, CardContent, CardMedia, CardActionArea} from '@mui/material';
import SameSizeImg from '../../images/sameSize.png';
import LetrasImg from '../../images/letras.png';
import GiftCardImg from '../../images/giftCard.png';


/*
      The box that shows on the first step for each product
*/
const ProductCard = ({title, productName}) => {  
      
      const getImgByProduct = (productName) => {
            switch(productName) {
                  case "sameSize":
                        return(
                              <Box sx={{
                                    paddingTop: '30px'
                              }}>
                                    <img src={SameSizeImg} width={230}/>
                              </Box>);
                  case "letras":
                        return (<Box sx={{paddingTop: '20px'}}>
                                    <img src={LetrasImg} width={160}/>
                              </Box>);
                  case "giftCard":
                        return (<Box sx={{paddingTop: '40px'}}>
                                    <img src={GiftCardImg} width={220}/>
                              </Box>);
                  default:
                        return null;
            }
      }      

      const dispatch = useDispatch();
      const selectedProduct = useSelector(state => state.product);

      const handleClick = () => {
            dispatch(setProduct(productName));
            dispatch(nextButtonEnabled(true));
      }

      // Returns checked for radio
      const getChecked = () => {
            if (selectedProduct === productName && selectedProduct !== "") {
                  return(true)
            }
            return(false);
      }

      // If selected, color of radio changes
      const getStroke = (checked) => {
            if(checked) {
                  return "#FF66C4";
            } else {
                  return "#BCB7BC"
            };
      }

      // Homemade RadioButton
      const RadioButton = ({ checked }) => (
            <svg
                width="23px"
                height="23px"
                viewBox="0 0 24 24"
                fontSize="23px">
                <circle
                    cx="50%"
                    cy="50%"
                    r="11px"
                    stroke={getStroke(checked)}

                    strokeWidth="1px"
                    fill="none"
                />
                {checked && (
                    <circle
                        cx="50%"
                        cy="50%"
                        r="6px"
                        fill="#FF66C4"
                    />
                )}
            </svg>
        );


      return(
            <Card sx={{width: 320, height: 360 }}>
                  <CardActionArea sx={{
                              width: '100%',
                              height: '100%'
                        }} onClick={handleClick} value="dog">
                        <CardContent sx={{position: 'relative', height: "100%", padding: 0}}>
                              {getImgByProduct(productName)}
                              <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                              }}>
                                    <Typography variant="h5" sx={{
                                          position: 'absolute',
                                          bottom: 55
                                    }}>
                                          {title}
                                    </Typography>
                              </Box>
                              <RadioGroup
                                    row
                                    aria-labelledby="chooseProduct-sameSize"
                                    name="chooseProduct"
                                    sx={{
                                          justifyContent: 'center'
      
                                    }}
                              >
                                    <FormControlLabel checked={getChecked()} value={productName} control={<RadioButton />} sx={{
                                          margin: '0',
                                          position: 'absolute',
                                          bottom: 20
                                    }}/>
                              </RadioGroup>
                        </CardContent>
                  </CardActionArea>
            </Card>
      );
}

export default ProductCard;