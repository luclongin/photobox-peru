import { Box, Button, Container, TextField, Grid, Typography } from "@mui/material";
import React, {useEffect, useState} from "react";
import {styled} from "@mui/material";
import UploadPhotoCardEmpty from "../../uploadPhotoCardEmpty/uploadPhotoCardEmpty.component";
import { OrderStepTitle } from "../../OrderStepTitle/orderStepTitle.component";
import { OrderStepSubtitle } from "../../OrderStepTitle/orderStepTitle.component";
import { useSelector, useDispatch } from "react-redux";
import UploadPhotoCard from "../../uploadPhotoCard/uploadPhotoCard.component";
import { photoAdded } from "../../../features/photoEdition/PhotoSlice";
import { Fragment } from "react";
import { dispatchLetters } from "../../../features/lettersEdition/LettersSlice";
import { nextButtonEnabled } from "../../../features/handleFormButtons/FormButtonsSlice";
import AmpersandPhoto from '../../../images/ampersand.png';

const MyTextField = ({autofocus, placeholder, handler, letterOrder, value}) => {
    return(
        <TextField
            autoFocus={autofocus}
            onChange={(e) => handler(e, letterOrder)}
            variant="standard"
            value={value}
            placeholder={placeholder}
            InputProps={{
                inputProps: {
                    style: {
                        textAlign: 'center',
                        position: 'relative',
                        top: '20px'
                    },

                    maxLength: 1,
                },
                disableUnderline: true,
                style: {
                    fontSize: "10em",
                    fontWeight: 'bold',
                    fontFamily: 'Arial Bold',
                    height: '162px'
                },
            }} sx={{
                height: '100%',
                width: '100%',
                textAlign: "center",
                height: '162px'
            }}
        />
    );
}

const Letras = () => {
    const dispatch = useDispatch();
    const addedPhotos = useSelector(state => state.photos);  
    const addedLetters = useSelector(state => state.letters);

    const [letters, setLetters] = useState({letter1: "", letter2: "&", letter3: ""});
    const textOnChangeHandler = (e, letterOrder) => {
        // only accept alpha numeric
        let letter = e.target.value.toUpperCase().replace(/[\W_]+/g,"");
        setLetters({...letters, [letterOrder]: letter});    
    }

    useEffect(() => {
        // when letters are changed, dispatch change
        dispatch(dispatchLetters(letters));

        // each time you have values for the three letters
        // dispatch
        const lettersAllFilled = (letters.letter1 !== "") && (letters.letter2 !== "") && (letters.letter3 !== "");

        // CASE: ALL PHOTOS ARE ADDED AND LAST LETTER IS GOING TO BE ADDED
        // CHECK IF ALL PHOTOS ARE UPLOADED AND IF ALL LETTERS ARE ADDED
        let enableNext = true;
        addedPhotos.map(photo => {
            enableNext = enableNext && (photo.imgSrc !== null);
        });

        enableNext = enableNext && lettersAllFilled;
        console.log("enableNext2", enableNext);

        if(enableNext) {
            dispatch(nextButtonEnabled(true));
        } else {
            dispatch(nextButtonEnabled(false));
        }
    }, [letters]);

    return(
        <Container sx={{
            overflow: 'hidden'
        }}>
            {addedPhotos.length > 0 ?
            (<Fragment>
                <OrderStepTitle title="Escoje tus fotos y letras" />
                <Box display="flex" justifyContent="center" sx={{
                }}>
                    <Grid container sx={{
                        width:'320px',
                }}>
                        <Grid item xs={6} sx={{
                            position: 'relative',
                        }}>
                            <MyTextField letters={letters} setLetters={setLetters} value={letters.letter1} handler={textOnChangeHandler} letterOrder="letter1" placeholder={"P"} autofocus={true}/>
                        </Grid>
                        <Grid item xs={6}>
                            <UploadPhotoCard photo={addedPhotos[0]} width={160}/>
                        </Grid>
                        <Grid item xs={6} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            <UploadPhotoCard photo={addedPhotos[1]} width={160} />
                        </Grid>
                        <Grid item xs={6} sx={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            pl: 3.5,
                            pt: 2
                        }}>
                            <img src={AmpersandPhoto} alt="Ampersand" width={"115px"} height={"130px"}/>
                        </Grid>
                        <Grid item xs={6} sx={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}>
                            <MyTextField letters={letters} value={letters.letter3} setLetters={setLetters} handler={textOnChangeHandler} letterOrder="letter3" placeholder={"B"} autofocus={false}/>
                        </Grid>
                        <Grid item xs={6}>
                            <UploadPhotoCard photo={addedPhotos[2]} width={160} />
                        </Grid>
                    </Grid>
                </Box>
            </Fragment>): null
            }
        </Container>
    );
}

export default Letras;