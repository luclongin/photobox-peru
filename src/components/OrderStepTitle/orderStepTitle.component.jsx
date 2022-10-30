import React from "react";
import theme from "../../utils/theme";
import { Typography } from "@mui/material";

export const OrderStepTitle = ({title}) => {
      return(<Typography variant="h1" sx={{
            marginBottom: 4,
            marginTop: 4
      }}>
            {title}
            <Typography variant="span" sx={{color: theme.palette.primary.main}}>.</Typography>
      </Typography>
      );
}

export const OrderStepSubtitle = ({title, highlight}) => {
      return(<Typography variant="h2" sx={{
            position: 'relative',
            top: -30,
      }}>
            {title}
            <Typography variant="span" sx={{color: theme.palette.primary.main}}>{highlight}</Typography>
      </Typography>
      );
}