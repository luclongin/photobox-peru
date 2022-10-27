import React from 'react';
import Paper from '@mui/material/Paper';
import { Radio } from '@mui/material';
import {RadioGroup, FormControlLabel} from '@mui/material';
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
            <Paper elevation={3} sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: 280,
                  height: 280
            }}>
                  {title}

                  <RadioGroup
                        row
                        aria-labelledby="chooseProduct-sameSize"
                        name="chooseProduct"
                        onChange={changeHandler}
                  >
                        <FormControlLabel checked={handleChecked()} value={productName} control={<Radio />} />
                  </RadioGroup>
            </Paper>
  )
}

export default ProductCard;