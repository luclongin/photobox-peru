import React from "react";
import Slider from 'react-slick';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import {Grid, Box, Paper, Button, IconButton} from '@mui/material';
import Img1 from '../../images/homepage_carousel1.jpg';
import Img2 from '../../images/homepage_carousel2.jpg';
import Img3 from '../../images/homepage_carousel3.jpg';
import Img4 from '../../images/homepage_carousel4.jpg';
import Img5 from '../../images/homepage_carousel5.jpg';
import Img6 from '../../images/homepage_carousel6.jpg';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
import theme from "../../utils/theme";


const CustomPrevBtn = ({ shadowColor, ...props}) => {
    const {onClick} = props;
    return(
        <Box sx={{
            height: '383px',
            width: '120px',
            background: `linear-gradient(90deg,${shadowColor} 18%,hsla(0,28%,80%,0))`,
            position: 'absolute',
            top: 0,
            left: -20,
            zIndex: '2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <IconButton sx={{
                width: 80,
                height: 80,
                backgroundColor: '#ffffff',
                border: '1px solid #ffffff',
                boxShadow: 1,
                cursor: 'pointer',
                zIndex: '2',
                ml: '-50px',
                "&:hover": {
                    backgroundColor: 'rgb(250,250,250)',
                    borderColor: 'rgb(250,250,250)'
                },
                color: theme.palette.primary.main
            }} onClick={onClick}>
                    <ArrowBackIosNewRoundedIcon sx={{
                        position: 'absolute',
                        left: '28%',
                        fontSize: '1.3em'
                    }}/> 
            </IconButton>
        </Box>
    );
}

const CustomNextBtn = ({ shadowColor, ...props}) => {
    const {onClick} = props;
    return(
        <Box sx={{
            height: '383px',
            width: '120px',
            background: `linear-gradient(90deg,hsla(0,18%,80%,0),${shadowColor} 85%)`,
            position: 'absolute',
            top: 0,
            right: -15,
            zIndex: '2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <IconButton sx={{
                width: 80,
                height: 80,
                backgroundColor: '#ffffff',
                border: '1px solid #fff',
                boxShadow: 1,
                cursor: 'pointer',
                zIndex: '2',
                mr: '-50px',
                "&:hover": {
                    backgroundColor: 'rgb(250,250,250)',
                    borderColor: 'rgb(250,250,250)'
                },
                color: theme.palette.primary.main
            }} onClick={onClick}>
                    <ArrowForwardIosRoundedIcon sx={{
                        position: 'absolute',
                        left: '33%',
                        fontSize: '1.3em'
                    }}/> 
            </IconButton>
        </Box>
    );
}


const MyCarousel = ({ shadowColor, ...props}) => {
    var items = [
        {
            id: 0,
            name: "Random Name #1",
            description: "Mi descripcion 1",
            image: Img1
        },
        {
            id: 1,
            name: "Random Name #2",
            description: "Mi descripcion 2",
            image: Img2
        },
        {
            id: 2,
            name: "Random Name #3",
            description: "Mi descripcion 3",
            image: Img3
        },
        {
            id: 3,
            name: "Random Name #4",
            description: "Mi descripcion 4",
            image: Img4
        },
        {
            id: 4,
            name: "Random Name #5",
            description: "Mi descripcion 5",
            image: Img5
        },
        {
            id: 5,
            name: "Random Name #6",
            description: "Mi descripcion 6",
            image: Img6
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        prevArrow: <CustomPrevBtn shadowColor={shadowColor} />,
        nextArrow: <CustomNextBtn shadowColor={shadowColor} />,
        responsive: [
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    centerMode: true     
                  }
            },
            {
              breakpoint: 1060,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: true,
                infinite: true,
                dots: true,
              }
            },
            {
                breakpoint: 880,
                settings: {
                  slidesToShow: 1.5,
                  slidesToScroll: 1,
                  centerMode: true,
                  infinite: true,
                  dots: true,
                }
              },
            {
                breakpoint: 690,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 0.5,
                  centerMode: true,
                  infinite: true,
                  dots: true,
                  initialSlide: 0.5
                }
              },
              {
                breakpoint: 505,
                settings: {
                  slidesToShow: 0.8,
                  slidesToScroll: 0.5,
                  centerMode: true,
                  infinite: true,
                  dots: true,
                  initialSlide: 0.5
                }
              }
        ]
    };

    return(
        <Box sx={{
            width: '80%', 
            p: 0, 
            m: '0 auto',            
        }}>
            <Slider {...settings}>
                {
                    items.map(item => {
                        return(<CarouselItem key={item.id} item={item} />);
                    })
                }
            </Slider>
        </Box>
    );
}

const CarouselItem = ({item}) => {
    return (
        <Paper sx={{
            height: '380px',
            width: '300px',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '8px!important',
            mb: 3
        }}>
            <img src={item.image} alt="carousel_item_image" width={"100%"} height={"320px"} style={{borderTopLeftRadius: '8px', borderTopRightRadius: '8px'}}/>
            
        </Paper>
    )
}

export default MyCarousel;