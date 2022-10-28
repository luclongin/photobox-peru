import React, {useEffect, useState} from "react";
import { Container, Box, InputLabel, Select, MenuItem, Input, Button } from "@mui/material";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { nextButtonEnabled } from "../../features/handleFormButtons/FormButtonsSlice";
import lightWoodBackground from '../../images/lightWood.png';
import darkWoodBackground from '../../images/darkWood.png';
import { customPhraseAdded, defaultPhraseAdded } from "../../features/additionalPhrase/AdditionalPhraseSlice";

const AddPhrase = () => {
      const [phraseType, setPhraseType] = useState("");
      const defaultPhraseColor = "lightWood";
      const [phraseColor, setPhraseColor] = useState(defaultPhraseColor);
      const [phraseText, setPhraseText] = useState("");
      const [isHidden, setHidden] = useState(true);
      const dispatch = useDispatch();

      const woodBackgrounds = {
            "lightWood": lightWoodBackground,
            "brownWood": darkWoodBackground
      };

      const handleChangeType = (event) => {
            setPhraseType(event.target.value);
            handleNextButton();
      };

      const handleChangeText = (event) => {
            setPhraseText(event.target.value);
      };

      const handleChangeColor = (e) => {
            setPhraseColor(e.target.value);
      }

      useEffect(() => {
            if(phraseType === "personalized") {
                  setHidden(false);
            }
      }, [phraseType]);

      const handleNextButton = () => {
            if(phraseType === "personalized") {
                  // wait until text has value and select has value
                  // add better formValidation
                  dispatch(nextButtonEnabled(true));
            } else {
                  dispatch(nextButtonEnabled(true));
            }
      }

      return(
      <Container>
            <h1>Add Phrase</h1>
                  <InputLabel id="addPhraseLabel">Choose Phrase</InputLabel>
                  <Select
                  labelId="addPhraseLabel"
                  value={phraseType}
                  label="Phrase Type"
                  onChange={handleChangeType}
                  >
                        <MenuItem value={"family"}>Family</MenuItem>
                        <MenuItem value={"friends"}>Friends</MenuItem>
                        <MenuItem value={"personalized"}>Personalizado</MenuItem>
                  </Select>
                  { !isHidden ? 
                        (<Fragment>
                              <Input placeholder="Your text" value={phraseText} onChange={handleChangeText}/>
                              <InputLabel id="addPhraseColor">Choose Color</InputLabel>
                              <Select labelId="addPhraseColor" value={phraseColor} label="Color Type" onChange={handleChangeColor}>
                                    <MenuItem value={"lightWood"}>Light Wood</MenuItem>
                                    <MenuItem value={"darkWood"}>Dark Wood</MenuItem>
                              </Select>
                              <Box sx={{
                                    backgroundImage: `url(${lightWoodBackground})`,
                                    width: 200,
                                    height: 200
                              }}>
                                    {phraseText}
                              </Box>
                              <Button onClick={() => {
                                    if(phraseType === "personalized") {
                                          dispatch(customPhraseAdded({text: phraseText, color: phraseColor}));
                                    } else {
                                          dispatch(defaultPhraseAdded({defaultPhrase: phraseType}));
                                    }
                                    // set back to default states
                                    setPhraseType("");
                                    setPhraseText("");
                                    setPhraseColor(defaultPhraseColor);
                                    setHidden(true);   
                              }}>Add Phrase</Button>
                        </Fragment>) : null
                  }
      </Container>
      );
}

export default AddPhrase;