import React, {useEffect} from "react";
import { Box, Grid, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextButtonEnabled } from "../../features/handleFormButtons/FormButtonsSlice";
import lightWoodBackground from '../../images/lightWood.png';
import darkWoodBackground from '../../images/darkWood.png';
import { customPhraseAdded, defaultPhraseAdded } from "../../features/additionalPhrase/AdditionalPhraseSlice";
import * as yup from 'yup';
import { useFormik } from 'formik';
import {FormControl} from "@mui/material";
import theme from "../../utils/theme";
import Cart from "../cart/cart.component";
import { OrderStepTitle } from "../OrderStepTitle/orderStepTitle.component";
import { setTotalPrice } from "../../features/totalPrice/totalPrice";
import { getPrice } from "../../utils/pricing";

/*
      React Component that handles the order or one or multiple Phrases
*/
const AddPhraseContainer = () => {
      const defaultPhraseColor = 'lightWood';
      const dispatch = useDispatch();
      const letters = useSelector(state => state.letters);

      console.log("letras", letters);
      // 2 backgrounds available for demo preview
      const backgrounds = {
            "lightWood": lightWoodBackground,
            "darkWood": darkWoodBackground
      }

      useEffect(() => {
            // set Next button always true for this page
            dispatch(nextButtonEnabled(true));// eslint-disable-line no-use-before-define
      }, []);

      // Validation Schema that ensures inputted text conforms to a Regex
      const validationSchema = yup.object({
            phraseType: yup.string().required('Required'),
            phraseText: yup
                        .string()
                        .when("phraseType", {
                              is: phraseType => phraseType === 'Personalizado',
                              then: yup.string()
                                    .matches(/^(?!\s+$)[0-9a-zñáéíóúü]*/i, 'Frase incorrecta')
                                    .required('Escribe tu frase')
                        }),
            phraseColor: yup
                        .string()
                        .when("phraseType", {
                              is: phraseType => phraseType === 'Personalizado',
                              then: yup.string('Choose Color').oneOf(
                                    ['lightWood', 'darkWood'],
                                    'Color required')
                                    .required('Required')
                        }),
      });

      // Using Formik for simple form handling
      const formik = useFormik({
            initialValues: {
                  phraseType: "",
                  phraseText: "",
                  phraseColor: defaultPhraseColor
            },
            validationSchema: validationSchema,
            onSubmit: (values, { resetForm }) => {
                  if(values.phraseType === 'Personalizado') {
                        dispatch(customPhraseAdded(
                              {
                              phraseText: values.phraseText,
                              phraseType: values.phraseType,
                              phraseColor: values.phraseColor
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
            <Grid container>
            <Grid item xs={9} sx={{
                  mt: 5
            }}>
                  <OrderStepTitle title="Complementa tu pedido" />
                  <h2>Letreros</h2>
                  <h2>20x40cm</h2>
                  <Box sx={{
                        display: 'flex',
                        justifyContent: 'center'
                  }}>
                  <Grid container>
                        <form onSubmit={formik.handleSubmit} style={{width: '100%'}}>
                        <Grid item xs={12} sx={{
                              justifyContent: 'center',
                              display: 'flex',
                              alignItems: 'center',
                              marginBottom: 2
                        }}>
                                    <FormControl>
                                          <InputLabel id="choosePhraseType">Escoje un letrero</InputLabel>
                                          <Select
                                                name="phraseType"
                                                value={formik.values.phraseType}
                                                labelId="choosePhraseType"
                                                onChange={formik.handleChange}
                                                // label prop needed to fix bug where overlap between label and border
                                                label="Escoje un letrero"
                                                error={formik.touched.phraseType && Boolean(formik.errors.phraseType)}
                                                helpertext={formik.touched.phraseType && formik.errors.phraseType}
                                                sx={{
                                                      backgroundColor: '#ffffff',
                                                      "& fieldset": {
                                                            borderColor: theme.palette.primary.main
                                                      },
                                                      "&:hover fieldset": {
                                                            borderColor: theme.palette.primary.darker + '!important'
                                                      },
                                                      "&.Mui-focused fieldset": {
                                                            borderColor: theme.palette.primary.main
                                                      },
                                                      width: 200
                                                      
                                                }}
                                          >
                                                <MenuItem value="family">Family</MenuItem>      
                                                <MenuItem value="friends">Friends</MenuItem>
                                                <MenuItem value="Personalizado">Personalizado</MenuItem> 
                                          </Select>
                                    </FormControl>
                                    </Grid>
                              <Fragment>
                                    { (formik.values.phraseType === "Personalizado") ? 
                                                <Fragment>
                                                      <Grid item xs={12} sx={{
                                                            marginBottom: 4
                                                      }}>
                                                            <TextField
                                                                  type="string"
                                                                  variant="outlined"
                                                                  name="phraseText"
                                                                  label="Escribe texto"
                                                                  FormHelperTextProps={{style: {backgroundColor: theme.palette.background.main, margin: 0}}}
                                                                  defaultValue={formik.values.phraseText}
                                                                  onChange={formik.handleChange}
                                                                  error={formik.touched.phraseText && Boolean(formik.errors.phraseText)}
                                                                  helpertext={formik.touched.phraseText && formik.errors.phraseText}
                                                                  sx={{
                                                                        backgroundColor: '#FFFFFF',
                                                                        width: 250,
                                                                        marginRight: 5,
                                                                        "& fieldset": {
                                                                              borderColor: theme.palette.primary.main
                                                                        },  
                                                                        "&:hover fieldset": {
                                                                              borderColor: theme.palette.primary.darker + '!important'
                                                                        },
                                                                        "&.Mui-focused fieldset": {
                                                                              borderColor: theme.palette.primary.main
                                                                        },                                                               
                                                                  }}
                                                            />
                                                            
                                                            <FormControl>

                                                            <InputLabel id="choosePhraseColor">Selecciona color</InputLabel>
                                                            <Select
                                                                  size="medium"
                                                                  name="phraseColor"
                                                                  label="Selecciona color"
                                                                  labelId="choosePhraseColor"
                                                                  value={formik.values.phraseColor}
                                                                  onChange={formik.handleChange}
                                                                  error={formik.touched.phraseColor && Boolean(formik.errors.phraseColor)}
                                                                  helpertext={formik.touched.phraseColor && formik.errors.phraseColor}
                                                                  sx={{
                                                                        width: 180,
                                                                        backgroundColor: '#FFFFFF',
                                                                        "& fieldset": {
                                                                              borderColor: theme.palette.primary.main
                                                                        },
                                                                        "&:hover fieldset": {
                                                                              borderColor: theme.palette.primary.darker + '!important'
                                                                        },
                                                                        "&.Mui-focused fieldset": {
                                                                              borderColor: theme.palette.primary.main
                                                                        },
                                                                  }}
                                                            >
                                                                  <MenuItem value="lightWood">Light Wood</MenuItem>      
                                                                  <MenuItem value="darkWood">Dark Wood</MenuItem>
                                                            </Select>
                                                      </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sx={{
                                                      display: 'flex',
                                                      justifyContent: 'center',
                                                }}>
                                                <Box sx={{
                                                      background: `url(${backgrounds[formik.values.phraseColor]})`,
                                                      width: 400,
                                                      height: 200,
                                                      color: '#FFFFFF',
                                                      fontSize: '2em',
                                                      alignItems: 'center',
                                                      display: 'flex',
                                                      justifyContent: 'center'
                                                }}>
                                                      {formik.values.phraseText}
                                                </Box>
                                                </Grid>
                                                </Fragment>
                                          : null
                                    }
                              </Fragment>
                              <Button type="submit" variant="contained" sx={{
                                    color: "#FFFFFF",
                                    marginTop: 2
                              }}>
                                    Añadir
                              </Button>
                        </form>
                        </Grid>
                  </Box>
            </Grid>
            <Grid item xs={3}>
                  <Cart />
            </Grid>
            </Grid>
      );
}
/*
You have the option to delete items from the Add Phrase Page
via the Cart. This ensures that the user goes back to the initial
page if the user deletes everything.
*/

const AddPhrasePage = () => {
      return <AddPhraseContainer />
}

export default AddPhrasePage;