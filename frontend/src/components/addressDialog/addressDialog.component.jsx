import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Box,IconButton} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch } from 'react-redux';
import { setAddress } from '../../features/userAddress/userAddressSlice';

const AddressDialog = ({open, handleClose}) => {
      const dispatch = useDispatch();

      const validationSchema = yup.object({
            userFullName: yup.string()
                              .matches(/^[A-Za-z]*(\s[A-Za-z]*)+$/, 'Nombre completo incorrecto')
                              .required('Escribe tu nombre completo'),
            userEmail: yup.string()
                              .email('Correo electrónico incorrecto')
                              .required('Escribe tu correo electrónico'),
            userAddress: yup.string()
                              .matches(/^[a-zA-Z0-9ñáéíóúü\s,'-]*$/, 'Dirección incorrecta')
                              .required('Escribe tu dirección'),
            userPhoneNumber: yup.number()
                              .required('Escribe tu teléfono')
                              .typeError('Número de teléfono incorrecto'),
            userDistrict: yup.string()
                              .matches(/^[a-zA-Zñáéíóúü\s]*$/, 'Distrito incorrecto')
                              .required('Escribe tu distrito'),
            userCity: yup.string()
                              .matches(/^[a-zA-Zñáéíóúü\s]*$/, 'Ciudad incorrecta')
                              .required('Escribe tu ciudad'),
      });

      // Using Formik for simple form handling
      const formik = useFormik({
            initialValues: {
                  userFullName: "",
                  userEmail: "",
                  userAddress: "",
                  userPhoneNumber: "",
                  userDistrict: "",
                  userCity: ""
            },
            validationSchema: validationSchema,
            onSubmit: (values, { resetForm }) => {
                  dispatch(setAddress(values));
                  resetForm();
                  handleClose();
            },
      });
  
  return (
      <div>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs" sx={{
                  borderRadius: '10!important'
            }}>
                  <DialogTitle sx={{
                        textAlign: 'center',
                        p: 2,
                        mt: 1,
                        fontSize: '1.5em'}}>
                        Añadir Dirección
                  </DialogTitle>
                  <IconButton sx={{  
                        position: 'absolute',
                        right: 10,
                        top: 8,
                        color: "rgb(0,0,0,0.3)"        
                  }} onClick={handleClose}>
                        <HighlightOffIcon fontSize="large" />
                  </IconButton>
                  <DialogContent sx={{
                        paddingBottom: 0
                  }}>
                        <form onSubmit={formik.handleSubmit}>
                              <Grid fullWidth container sx={{
                                          justifyContent: 'center',
                                          display: 'flex',
                                          alignItems: 'center',
                                          marginBottom: 2,
                                          mt: -2
                              }}>
                                    <Grid item xs={12} sx={{mb: 2}}>
                                          <TextField
                                                type="string"
                                                id="userFullName"
                                                name="userFullName"
                                                label="Nombre completo"
                                                defaultValue=""
                                                variant="filled"
                                                fullWidth
                                                value={formik.values.userFullName}
                                                onChange={formik.handleChange}
                                                error={formik.touched.userFullName && Boolean(formik.errors.userFullName)}
                                                helperText={formik.touched.userFullName && formik.errors.userFullName}
                                          />
                                    </Grid>
                                    <Grid item xs={12} sx={{mb: 2}}>
                                          <TextField   
                                                type="email"  
                                                id="userEmail"
                                                name="userEmail"
                                                label="Correo electrónico"
                                                defaultValue=""
                                                variant="filled"
                                                fullWidth
                                                value={formik.values.userEmail}
                                                onChange={formik.handleChange}
                                                error={formik.touched.userEmail && Boolean(formik.errors.userEmail)}
                                                helperText={formik.touched.userEmail && formik.errors.userEmail}
                                          />
                                    </Grid>
                                    <Grid item xs={12} sx={{mb: 2}}>
                                          <TextField   
                                                type="string"
                                                id="userAddress"
                                                name="userAddress"
                                                label="Dirección"
                                                defaultValue=""
                                                variant="filled"
                                                fullWidth
                                                value={formik.values.userAddress}
                                                onChange={formik.handleChange}
                                                error={formik.touched.userAddress && Boolean(formik.errors.userAddress)}
                                                helperText={formik.touched.userAddress && formik.errors.userAddress}
                                          />
                                    </Grid>
                                    <Grid item xs={12} sx={{mb: 2}}>
                                          <TextField 
                                                type="tel"  
                                                id="userPhoneNumber"
                                                name="userPhoneNumber"
                                                label="Teléfono"
                                                defaultValue=""
                                                variant="filled"
                                                fullWidth
                                                value={formik.values.userPhoneNumber}
                                                onChange={formik.handleChange}
                                                error={formik.touched.userPhoneNumber && Boolean(formik.errors.userPhoneNumber)}
                                                helperText={formik.touched.userPhoneNumber && formik.errors.userPhoneNumber}
                                          />
                                    </Grid>
                                    <Grid container spacing={2} justifyContent="space-between">
                                          <Grid item xs={6}>
                                                <TextField   
                                                      type="string"
                                                      id="userDistrict"
                                                      name="userDistrict"
                                                      label="Distrito"
                                                      defaultValue=""
                                                      variant="filled"
                                                      fullWidth
                                                      value={formik.values.userDistrict}
                                                      onChange={formik.handleChange}
                                                      error={formik.touched.userDistrict && Boolean(formik.errors.userDistrict)}
                                                      helperText={formik.touched.userDistrict && formik.errors.userDistrict}
                                                />
                                          </Grid>
                                          <Grid item xs={6}>
                                                <TextField  
                                                      type="string" 
                                                      id="userCity"
                                                      name="userCity"
                                                      label="Ciudad"
                                                      defaultValue=""
                                                      variant="filled"
                                                      fullWidth
                                                      value={formik.values.userCity}
                                                      onChange={formik.handleChange}
                                                      error={formik.touched.userCity && Boolean(formik.errors.userCity)}
                                                      helperText={formik.touched.userCity && formik.errors.userCity}
                                                />
                                          </Grid>
                                    </Grid>
                              </Grid>
                              <Box display="flex" justifyContent="center" sx={
                                    {paddingBottom: 2}
                              }>
                                    <Button variant="contained" type="submit" sx={{
                                          color: "#FFFFFF",
                                          width: 150,
                                          padding: 1,
                                          mt: 1,
                                          fontSize: '1em',
                                          mb: 1
                                    }}>
                                          Añadir
                                    </Button>
                              </Box>
                        </form>
                  </DialogContent>
                 
            </Dialog>
      </div>
  );
}

export default AddressDialog;