import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Radio } from '@mui/material';
import {RadioGroup, FormControlLabel} from '@mui/material';

const ProductCard = ({title, productName, formData, setFormData}) => {      
      const [isChecked, setChecked] = useState(false);

      const changeHandler = (e) => {
            setFormData({
                  ...formData,
                  chosenProduct: e.target.value,
                  enableNextButton: true
            })
      }

      useEffect(() => {
            (formData.chosenProduct === productName) ? setChecked(true) : setChecked(false)
      }, [formData])

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
                        <FormControlLabel checked={isChecked} value={productName} control={<Radio />} />
                  </RadioGroup>
            </Paper>
  )
}

export default ProductCard;