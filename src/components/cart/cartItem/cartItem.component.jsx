import { Box } from "@mui/material";
import React from "react";

const CartItem = ({title, image, quantity, price}) => {
      return(
            <Box>
                  <h2>{title}</h2>
                  <img alt="cart-item-img" src={image} />
                  <h2>{quantity}x</h2>
                  <h2>{price} S/</h2>
            </Box>
      );
}

export default CartItem;