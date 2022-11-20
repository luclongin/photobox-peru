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
const MyTextField = ({autofocus, placeholder, handler, letterOrder}) => {

    return(
        <TextField autoFocus={autofocus}
        onChange={(e) => handler(e, letterOrder)}
        variant="standard"
        placeholder={placeholder}
            InputProps={{
                inputProps: {
                    style: {
                        textAlign: 'center'
                    }
                },
                maxLength: 1,
                disableUnderline: true,
                style: {
                    fontSize: "10.6em",
                    fontWeight: 'bold',
                    fontFamily: 'Arial',
                },
            }} sx={{
                margin: "0",
                padding: "0",
                position: 'absolute',
                top: "-45px",
                left: "0px",
                textAlign: "center",
            }}
        />
    );
}

const Letras = () => {
    const dispatch = useDispatch();
    const addedPhotos = useSelector(state => state.photos);   
    const [letters, setLetters] = useState({letter1: "", letter2: "&", letter3: ""});
    
    /*const handleNextButton = () => {
        let enableNext = true;
        addedPhotos.forEach(photo => {
            enableNext = enableNext && (photo.imgSrc !== null);
        })
        const lettersAllFilled = (letters.letter1 !== null) && (letters.letter2 !== null) && (letters.letter3 !== null);
        enableNext = enableNext && lettersAllFilled;
        if(enableNext) {
            dispatch(nextButtonEnabled(true));
        } else {
            dispatch(nextButtonEnabled(false));
        }
        return enableNext;
    }*/

    const textOnChangeHandler = (e, letterOrder) => {
        const letter = e.target.value;
        if(letter === "Q") {
            console.log(e.target.style);
            e.target.style.margin = '-16px 0 0 0'
        } else {
            e.target.style.margin = "0"
        }
        setLetters({...letters, [letterOrder]: e.target.value});
    }

    useEffect(() => {
        // each time you have values for the three letters
        // dispatch
        console.log("letters", letters);
        const lettersAllFilled = (letters.letter1 !== "") && (letters.letter2 !== "") && (letters.letter3 !== "");
        if(lettersAllFilled) {
            dispatch(dispatchLetters(letters));
        }
        
        // CASE: ALL PHOTOS ARE ADDED AND LAST LETTER IS GOING TO BE ADDED
        // CHECK IF ALL PHOTOS ARE UPLOADED AND IF ALL LETTERS ARE ADDED
        console.log("photos", addedPhotos);
        let enableNext = true;
        addedPhotos.map(photo => {
            enableNext = enableNext && (photo.imgSrc !== null);
        });
        enableNext = enableNext && lettersAllFilled;
        if(enableNext) {
            dispatch(nextButtonEnabled(true));
        } else {
            dispatch(nextButtonEnabled(false));
        }

    }, [letters]);



    return(
        <Container>
            {addedPhotos.length > 0 ?
            (<Fragment>
                <OrderStepTitle title="Escoje tus fotos y letras" />
                <Box display="flex" justifyContent="center">
                    <Grid container sx={{
                        width:'320px',
                }}>
                        <Grid item xs={6} sx={{
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            <MyTextField letters={letters} setLetters={setLetters} handler={textOnChangeHandler} letterOrder="letter1" placeholder={"P"} autofocus={true}/>
                        </Grid>
                        <Grid item xs={6}>
                        <UploadPhotoCard photo={addedPhotos[0]} width={160} />
                        </Grid>
                        <Grid item xs={6} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            <UploadPhotoCard photo={addedPhotos[1]} width={160} />
                        </Grid>
                        <Grid item xs={6} sx={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            overflow: 'hidden'
                        }}>
                            <Typography variant="letrasinput">&</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            overflow: 'hidden'
                        }}>
                            <MyTextField letters={letters} setLetters={setLetters} handler={textOnChangeHandler} letterOrder="letter3" placeholder={"B"} autofocus={false}/>
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