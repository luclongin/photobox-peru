import React, {useEffect, useState} from "react";
import { Container, Box, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { nextButtonEnabled } from "../../features/handleFormButtons/FormButtonsSlice";
import lightWoodBackground from '../../images/lightWood.png';
import darkWoodBackground from '../../images/darkWood.png';
import { customPhraseAdded, defaultPhraseAdded } from "../../features/additionalPhrase/AdditionalPhraseSlice";
import * as yup from 'yup';
import { useFormik } from 'formik';
import {FormControl} from "@mui/material";

const AddPhrase = () => {
      const [isHidden, setHidden] = useState(true);
      const defaultPhraseColor = 'lightWood';
      const [selectedPhrase, setSelectedPhrase] = useState('');
      const [isDisabled, setDisabled] = useState(true);
      const dispatch = useDispatch();
      
      const backgrounds = {
            "lightWood": lightWoodBackground,
            "darkWood": darkWoodBackground
      }

      useEffect(() => {
            // set Next button always true for this page
            dispatch(nextButtonEnabled(true));
      }, []);

      const validationSchema = yup.object({
            phraseType: yup.string().required('Required'),
            phraseText: yup
                        .string()
                        .when("phraseType", {
                              is: phraseType => phraseType === 'custom',
                              then: yup.string('Enter Text')
                                    .matches(/^(?!\s+$)[0-9a-zñáéíóúü]*/i)
                                    .required('Required')
                        }),
            phraseColor: yup
                        .string()
                        .when("phraseType", {
                              is: phraseType => phraseType === 'custom',
                              then: yup.string('Choose Color').oneOf(
                                    ['lightWood', 'darkWood'],
                                    'Color required')
                                    .required('Required')
                        }),
      });

      const formik = useFormik({
            initialValues: {
                  phraseType: "",
                  phraseText: "",
                  phraseColor: defaultPhraseColor
            },
            validationSchema: validationSchema,
            onSubmit: (values, { resetForm }) => {
                  if(values.phraseType === 'custom') {
                        dispatch(customPhraseAdded(
                              {
                              text: values.phraseText,
                              color: values.phraseColor
                              }
                        ));
                  } else {
                        dispatch(defaultPhraseAdded({
                              defaultPhrase: values.phraseType
                        }));
                  }
                  resetForm();
            },
      });
            
      return(
            <div>
                  <h1>Add Phrase</h1>
                  <form onSubmit={formik.handleSubmit}>
                              <FormControl fullWidth>
                                    <InputLabel id="choosePhraseType">Choose a Phrase</InputLabel>
                                    <Select
                                          name="phraseType"
                                          value={formik.values.phraseType}
                                          labelId="choosePhraseType"
                                          onChange={formik.handleChange}
                                          error={formik.touched.phraseType && Boolean(formik.errors.phraseType)}
                                          helperText={formik.touched.phraseType && formik.errors.phraseType}
                                    >
                                          <MenuItem value="family">Family</MenuItem>      
                                          <MenuItem value="friends">Friends</MenuItem>
                                          <MenuItem value="custom">Personalizado</MenuItem> 
                                    </Select>
                              </FormControl>
                              { (formik.values.phraseType === "custom") ? 
                                    <Fragment>
                                          <TextField
                                                type="string"
                                                variant="outlined"
                                                name="phraseText"
                                                label="Choose Text"
                                                defaultValue={formik.values.phraseText}
                                                onChange={formik.handleChange}
                                                error={formik.touched.phraseText && Boolean(formik.errors.phraseText)}
                                                helperText={formik.touched.phraseText && formik.errors.phraseText}
                                          />
                                          
                                          <Select
                                                name="phraseColor"
                                                label="Choose Color"
                                                value={formik.values.phraseColor}
                                                onChange={formik.handleChange}
                                                error={formik.touched.phraseColor && Boolean(formik.errors.phraseColor)}
                                                helperText={formik.touched.phraseColor && formik.errors.phraseColor}
                                          >
                                                <MenuItem value="lightWood">Light Wood</MenuItem>      
                                                <MenuItem value="darkWood">Dark Wood</MenuItem>
                                          </Select>
                                          <Box sx={{
                                                background: `url(${backgrounds[formik.values.phraseColor]})`,
                                                width: 200,
                                                height: 200
                                          }}>
                                                {formik.values.phraseText}
                                          </Box>
                                    </Fragment> : null
                                          
                              }
                              <Button type="submit" variant="contained">Add Phrase</Button>
                        </form>
            </div>
      );
}

export default AddPhrase;