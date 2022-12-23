import React, {useEffect} from "react";
import { Box, Grid, InputLabel, Select, MenuItem, TextField, Button, Typography, Paper, Card, CardMedia } from "@mui/material";
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
import FamilyPhoto from '../../images/letras_family.jpg';
import ThisIsUsPhoto from '../../images/letras_thisisus.png';
import AddIcon from '@mui/icons-material/Add';
import {Divider} from "@mui/material";
import { useState } from "react";
/*
      React Component that handles the order or one or multiple Phrases
*/
const AddPhraseContainer = () => {
      const defaultPhraseColor = 'lightWood';
      const dispatch = useDispatch();
      const letters = useSelector(state => state.letters);
      const [showThisIsUs, setShowThisIsUs] = useState(false);

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
                  phraseType: "family",
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
            <Grid container sx={{height: '100%'}}>
                  <Grid item xs={5} sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        pr: 5,
                        pt: 12
                  }}> 
                        <Fragment>
                              { (formik.values.phraseType === "Personalizado") ? 
                              <Fragment>
                                    <Grid container>
                                          <Grid item xs={12} sx={{
                                                display: 'flex',
                                                justifyContent: 'end',
                                                pt: 4,
                                                
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
                                    </Grid>
                              </Fragment>
                              : <Card sx={{
                                    width: '350px',
                                    height: '400px',
                                    position: 'relative'
                              }}>
                                    <CardMedia
                                          component="img"
                                          image={FamilyPhoto}
                                          alt="Family Photo" 
                                    />
                                    { formik.values.phraseType==="thisisus" ? (<Box sx={{
                                                width: '178px',
                                                height: '84px',
                                                position: 'absolute',
                                                top: 128,
                                                left: 85,
                                                overflow: 'hidden'
                                          }}>
                                                <img src={ThisIsUsPhoto} alt="This is us" width={"100%"} height={"100%"}/>
                                          </Box>) : null
                                    }
                              </Card>
                              }
                        </Fragment>
                  </Grid>
                  <Grid item xs={4} sx={{
                        pt: 10,
                        textAlign: 'left'
                  }}>
                        <OrderStepTitle title="Complementa tu pedido" marginBottom={2} />
                        <Typography variant="h3" sx={{m: 0, p: 0, pt: 0, fontWeight: 'bold'}}>
                              Letreros
                        </Typography>
                        <Typography variant="h5" sx={{color: "#9B8E9A", mt: "-8px"}}>
                              20x40cm
                        </Typography>
                        <Box>
                              <Grid container>
                                    <form onSubmit={formik.handleSubmit} style={{width: '100%'}}>
                                          <Grid item xs={12} sx={{
                                                marginBottom: 2,
                                                pt: 2,
                                                pb: 0,
                                                textAlign: 'left'
                                          }}>
                                                <FormControl>
                                                      <InputLabel id="choosePhraseType" sx={{textAlign: 'left'}}>Escoje un letrero</InputLabel>
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
                                                                        borderColor: "rgba(0, 0, 0, 0.23)"
                                                                  },
                                                                  "&:hover fieldset": {
                                                                        borderColor: theme.palette.primary.darker + '!important'
                                                                  },
                                                                  "&.Mui-focused fieldset": {
                                                                        borderColor: theme.palette.primary.main
                                                                  },
                                                                  width: 250
                                                                  
                                                            }}
                                                      >
                                                            <MenuItem value="family">Family</MenuItem>      
                                                            <MenuItem value="thisisus">This is us</MenuItem>
                                                            <MenuItem value="Personalizado">Personalizado</MenuItem> 
                                                      </Select>
                                                </FormControl>
                                          </Grid>
                                          { (formik.values.phraseType === "Personalizado") ? 
                                          
                                          <Grid item xs={12} sx={{marginBottom: 2}}>

                                                <Divider sx={{width: "80%", pt: 0, mb: 2}}/>
                                                <Typography variant="p" sx={{
                                                      fontWeight: '',
                                                      fontSize: '0.95em',
                                                      pl: 0.2
                                                }}>
                                                      Personalizar
                                                </Typography>
                                                <Grid container sx={{pt: 3}}>
                                                      <Grid item xs={12}>
                                                            <FormControl size="small">
                                                                  <InputLabel id="choosePhraseColor" sx={{ml: "-5px"}}>Tipo de fondo</InputLabel>
                                                                  <Select
                                                                        name="phraseColor"
                                                                        label="Tipo de fondo"
                                                                        labelId="choosePhraseColor"
                                                                        value={formik.values.phraseColor}
                                                                        onChange={formik.handleChange}
                                                                        error={formik.touched.phraseColor && Boolean(formik.errors.phraseColor)}
                                                                        helpertext={formik.touched.phraseColor && formik.errors.phraseColor}
                                                                        sx={{
                                                                              width: 250,
                                                                              fontSize: '0.9em',
                                                                              p: 1.2,
                                                                              backgroundColor: '#FFFFFF',
                                                                              "& fieldset": {
                                                                                    borderColor: "rgba(0, 0, 0, 0.23)"
                                                                              },
                                                                              "&:hover fieldset": {
                                                                                    borderColor: theme.palette.primary.darker + '!important'
                                                                              },
                                                                              "&.Mui-focused fieldset": {
                                                                                    borderColor: theme.palette.primary.main
                                                                              },
                                                                        }}
                                                                  >
                                                                        <MenuItem value="lightWood">Madera clara</MenuItem>      
                                                                        <MenuItem value="darkWood">Madera oscura</MenuItem>
                                                                  </Select>
                                                            </FormControl>
                                                      </Grid>
                                                      <Grid item xs={12} sx={{pt: 2}}>
                                                            <TextField
                                                                  type="string"
                                                                  variant="outlined"
                                                                  name="phraseText"
                                                                  size="medium"
                                                                  label="Escribe texto"
                                                                  FormHelperTextProps={{style: {backgroundColor: theme.palette.background.main, margin: 0}}}
                                                                  defaultValue={formik.values.phraseText}
                                                                  onChange={formik.handleChange}
                                                                  error={formik.touched.phraseText && Boolean(formik.errors.phraseText)}
                                                                  helpertext={formik.touched.phraseText && formik.errors.phraseText}
                                                                  sx={{
                                                                        backgroundColor: '#FFFFFF',
                                                                        width: 250,
                                                                        mt: "-6px",
                                                                        fontSize: '0.9em',
                                                                        "& fieldset": {
                                                                              borderColor: "rgba(0, 0, 0, 0.23)"
                                                                        },  
                                                                        "&:hover fieldset": {
                                                                              borderColor: theme.palette.primary.darker + '!important'
                                                                        },
                                                                        "&.Mui-focused fieldset": {
                                                                              borderColor: theme.palette.primary.main
                                                                        },                                                               
                                                                  }}
                                                            />
                                                      </Grid>      
                                                </Grid>                                                            
                                          </Grid> : null 
                                          }
                                          <Button type="submit" variant="contained" sx={{
                                                color: "black",
                                                backgroundColor: 'white!important',
                                                width: "120px",
                                                p: 1,
                                                pl: 0,
                                                mt: "-5px"
                                          }} startIcon={<AddIcon sx={{color: "#FF66C4"}} />}>
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