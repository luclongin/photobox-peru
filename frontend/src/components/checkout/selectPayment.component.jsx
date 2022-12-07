import * as React from 'react';
import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import { styled } from '@mui/system';
import { PopperUnstyled } from '@mui/base';
import { Grid, Typography } from '@mui/material';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import YapeIcon from '../../images/yape.png';
import PlinIcon from '../../images/plin.png';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

//border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//box-sizing: border-box;

//hover border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: Questrial, sans-serif;
  font-size: 0.95rem;
  
  height: 65px;
  min-width: 200px;
  width: 350px;
  padding: 12px;
  border-radius: 6px;
  border: none;
  text-align: left;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  position: relative;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    
  }

  &.${selectUnstyledClasses.focusVisible} {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &.${selectUnstyledClasses.expanded} {
    
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    position: absolute;
    right: 20px;
    top: 22px;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  width: 350px;
  max-height: 400px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 5px;
  height: 55px;
  width: 325px;
  min-width: 200px;
  border-radius: 8px;
  cursor: default;
  display: flex;
  align-items: center;
  text-align: left;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  & img {
    margin-right: 10px;
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <SelectUnstyled {...props} ref={ref} slots={slots} />;
});

CustomSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
    popper: PropTypes.func,
    root: PropTypes.elementType,
  }),
};


const getPaymentIcon = (paymentType, size) => {
    switch(paymentType) {
        case "card":
            return <CreditCardIcon sx={{
                fontSize: "2.2em",
                color: '#9B8E9A',
                ml: "2px"
            }}/>
        case "yape":
            return <img src={YapeIcon} width={"35px"}/>
        case "plin":
            return <img src={PlinIcon} width={"35px"}/>
        default:
            return <img src="" />
    }
}

function renderValue(option) {
    console.log("option::", option);
    if(option === null) {
        return <span>Escojer metodo de pago</span>
    }

    return (
        <Grid container>
                <Grid item xs={2} sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {getPaymentIcon(option.value)}
                </Grid>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="deliveryTitle">
                                {option.label.split("+")[0]}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="deliverySubtitle">
                                {option.label.split("+")[1]}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>  
        </Grid>
    )
}

export default function UnstyledSelectRichOptions() {
  return (
    <CustomSelect sx={{boxShadow: 1}} renderValue={renderValue}>
      {paymentOptions.map((payment) => (
        <StyledOption key={payment.option} value={payment.option} label={payment.title + "+" + payment.subtitle}>
            <Grid container>
                <Grid item xs={2} sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    {getPaymentIcon(payment.option)}
                </Grid>
                <Grid item xs={10}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="deliveryTitle">
                                {payment.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="deliverySubtitle">
                                {payment.subtitle}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>  
            </Grid>
        </StyledOption>
      ))}
    </CustomSelect>
  );
}

const paymentOptions = [
{ option: 'card', title: 'Tarjeta de debito o credito', subtitle: 'Comision adicional'},
{ option: 'yape', title: 'Yape', subtitle: 'Sin comision'},
{ option: 'plin', title: 'Plin', subtitle: 'Sin comision'}
];