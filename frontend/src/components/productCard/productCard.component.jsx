import React from 'react';
import Paper from '@mui/material/Paper';
import { ButtonBase, Radio, Typography } from '@mui/material';
import {RadioGroup, FormControlLabel, Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../../features/productSelection/ProductSlice';
import { nextButtonEnabled } from '../../features/handleFormButtons/FormButtonsSlice';
import { useState, useEffect} from 'react';
import {Card, CardContent, CardMedia, CardActionArea} from '@mui/material';

/*
      The box that shows on the first step for each product
*/
const ProductCard = ({title, productName}) => {   
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
            <Card sx={{width: 320, height: 320 }}>
                  <CardActionArea sx={{
                              width: '100%',
                              height: '100%'
                        }} onClick={handleClick} value="dog">
                        <CardContent>
                              <Typography variant="h5">
                                    {title}
                              </Typography>
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
                                          bottom: 15
                                    }}/>
                              </RadioGroup>
                        </CardContent>
                  </CardActionArea>
            </Card>
      );
}

export default ProductCard;