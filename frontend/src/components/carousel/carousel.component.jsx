import React from "react";
import Carousel from 'react-material-ui-carousel';
import {Grid, Box, Paper, Button} from '@mui/material';
import Img1 from '../../images/homepage_carousel1.jpg';
import Img2 from '../../images/homepage_carousel2.jpg';
import Img3 from '../../images/homepage_carousel3.jpg';
import Img4 from '../../images/homepage_carousel4.jpg';
import Img5 from '../../images/homepage_carousel5.jpg';
import Img6 from '../../images/homepage_carousel6.jpg';

const MyCarousel = (props) => {
    var items = [
        {
            name: "Random Name #1",
            description: "have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        },
        {
            name: "Random Name #3",
            description: "Hello World!"
        }
    ]

    return (
        <Carousel>
            <Grid container sx={{display: 'flex', justifyContent: 'center'}} spacing={3}>
                <Grid item xs={3}>
                    <CarouselItem key={items[0]} item={items[0]} />
                </Grid>
                <Grid item xs={3}>
                    <CarouselItem key={items[1]} item={items[1]} />
                </Grid>
                <Grid item xs={3}>
                    <CarouselItem key={items[2]} item={items[2]} />
                </Grid>
            </Grid>
        </Carousel>
    )
}

const CarouselItem = (props) => {
    return (
        <Paper sx={{
            width: '100%',
            height: '300px'
        }}>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

export default MyCarousel;