import React from "react";
import Carousel from 'react-material-ui-carousel';
import {Paper, Button} from '@mui/material';

const MyCarousel = (props) => {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
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
            <Item key={items[0]} item={items[0]} />
            <Item key={items[1]} item={items[1]} />
            <Item key={items[2]} item={items[2]} />
        </Carousel>
    )
}

const Item = (props) => {
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

export default MyCarousel;