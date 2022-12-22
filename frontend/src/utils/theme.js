import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF66C4', // rgb(255, 102, 196)
      darker: 'rgb(178, 71, 137)',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      main: "#FAF9F9"
    }
  },
  typography: {
      fontFamily: [
            'Questrial',
            'Arial',
            'sans-serif'
      ].join(','),
      button: {
            textTransform: 'none'
      },
      homepage_bottom_h1: {
        fontSize: '1.15em',
        fontWeight: 'bold'
      },
      homepage_bottom_links: {
        fontSize: '1.1em',
        color: '#9B8E9A',
        textDecoration: 'none',
        "&:hover": {
          color: 'rgb(0,0,0,0.5)'
        }
      },
      thirdparth1: {
        fontSize: '3.4em',
        fontWeight: 'bold',
        "span": {
          color: '#FF66C4'
        }
      },
      thridpartsubtitle: {
        fontSize: '1.4em'
      },
      secondparttitle: {
        fontSize: '2.8em',
        lineHeight: '50px',
        fontWeight: 'bold',
        "span": {
          color: '#FF66C4'
        }
      },
      carouselh1: {
        fontSize: '2.2em',
        fontWeight: '',
        "span": {
          color: '#FF66C4'
        }
      },
      whatsapp: {
        fontSize: '1.4em',
        position: 'relative',
        top: '-13px',
        fontWeight: ''
      },
      secondpartsubtitle: {
        fontSize: '1.1em',
        fontWeight: 'bold'
      },
      homepageh1: {
        fontSize: '4.1em',
        fontWeight: 'bold',
        lineHeight: '70px',
        "span": {
          color: '#FF66C4'
        }
      },
      homepageh2: {
        fontSize: '1.5em',
        lineHeight: '28px',
        "span": {
          color: '#FF66C4'
        }
      },
      h1 : {
        fontSize: '2em',
        color: '#000000'
      },
      h2 : {
        fontSize: '1.3em',
        color: '#9B8E9A'
      },
      p: {
        fontFamily: 'Questrial'
      },
      carth1: {
        fontSize: '1em',
        color: '#000'
      },
      carth2: {
        fontSize: '0.9em'
      },
      carth3: {
        fontSize: '0.85em'
      },
      carth1gray: {
        fontSize: '1.1em',
        color: '#9B8E9A'
      },
      orderh1: {
        fontSize: '1.9em',
        textDecoration: 'underline',
        textDecorationColor: '#FF66C4',
        textDecorationThickness: 3,
      },
      orderh1withoutUnderline: {
        fontSize: '1.6em',
      },
      orderFeedbackh1: {
        fontSize: '2em',
        fontWeight: 'bold'
      },
      giftCardHowItWorks: {
        fontSize: '1.2em',
        lineHeight: '1.3em'
      },
      letrasinput: {
        fontSize: '11em',
        fontStyle: 'Bold',
        fontWeight: 'bold',
        fontFamily: 'Arial Bold',
        margin: '0',
        padding: '0',
        position: 'absolute',
        top: '-20px',
        left: '15px'
      },
      deliveryTitle: {
        fontSize: '1.1em',
        color: '#000000',
        fontFamily: 'Questrial'
      },
      deliverySubtitle: {
        fontSize: '0.9em',
        color: '#9B8E9A',
        fontFamily: 'Questrial'
      }
    },
});

export default theme;
