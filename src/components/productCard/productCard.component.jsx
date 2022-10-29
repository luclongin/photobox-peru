import React from 'react';
import Paper from '@mui/material/Paper';
import { Radio } from '@mui/material';
import {RadioGroup, FormControlLabel, Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../../features/productSelection/ProductSlice';
import { nextButtonEnabled } from '../../features/handleFormButtons/FormButtonsSlice';

const ProductCard = ({title, productName}) => {   
      const dispatch = useDispatch();
      const changeHandler = (e) => {
            dispatch(setProduct(e.target.value));
            dispatch(nextButtonEnabled(true));
      }
      
      const selectedProduct = useSelector(state => state.product);
      const handleChecked = () => {
            return (selectedProduct === productName);
      }

      return (
            <Button onClick={handleClick}>
                  <Paper elevation={3} sx={{
                  width: 240,
                  height: 240,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: "center",
                  position: 'relative'
            }}>
                  {
                  title
                  }
                  <RadioGroup
                        row
                        aria-labelledby="chooseProduct-sameSize"
                        name="chooseProduct"
                        onChange={changeHandler}
                        sx={{
                              position: 'absolute',
                              bottom: 15
                        }}
                  >
                        <FormControlLabel checked={handleChecked()} value={productName} control={<Radio />} sx={{
                              margin: '0'
                        }}/>
                  </RadioGroup>
            </Paper></Button>
  )
}

export default ProductCard;