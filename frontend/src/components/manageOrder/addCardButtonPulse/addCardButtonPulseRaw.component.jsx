import React from "react";
import { IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import theme from "../../../utils/theme";
import {styled} from "@mui/material";

/*
      Button in order to add directly a photo. Works exactly like your model website's button.
      Simplifies workflow as we do not have to call photoAdded action.
*/
const AddCardButtonPulseRaw = ({width, plusSize}) => {
      const PulseButton = styled(IconButton) ({
        '&.MuiButtonBase-root': {
            '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 2.5s infinite ease-in-out',
            content: '""',
            }
        },
        '@keyframes ripple': {
            "0%": {
                transform: "scale(1)",
                opacity: "0.9",
                boxShadow: "0 0 0 0 #FF36C4"
            },
            "70%": {
                transform: "scale(1)",
                opacity: "0.2",
                boxShadow: "0 0 0 10px #FF36C4"
            },
            "100%": {
                transform: "scale(1)",
                opacity: "0.05",
                boxShadow: "0 0 0 0 #FF36C4"
            }
        }
      });

      return(   
        <PulseButton
            sx={{
                    width: width,
                    height: width,
                    backgroundColor: 'rgb(255, 102, 196)',
                    color: '#ffffff',
                    "&:hover" : {
                        backgroundColor: theme.palette.primary.darker,
                        color: "#ffffff"
                    }
            }}
            component="label"
            color="primary"
            aria-label="upload picture"
        >
            <AddIcon sx={{
                    fontSize: plusSize
            }} />
        </PulseButton>
      );
}

export default AddCardButtonPulseRaw;