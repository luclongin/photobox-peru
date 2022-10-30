import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CartItem from "./cartItem/cartItem.component";
import { getPrice } from "../../utils/pricing";
import { Box } from "@mui/material";


const Cart = () => {
      const photos = useSelector(state => state.photos);
      const addedPhrases = useSelector(state => state.additionalPhrases);
      const product = useSelector(state => state.product);
      const totalPrice = getPrice(product, photos.length) + getPrice("additionalPhrase", addedPhrases.length);

      return(
            <Box>
                  <h1>Mi pedido</h1>
                  <CartItem
                        title={`Set ${product}`}
                        image={null} 
                        quantity={photos.length} 
                        price={getPrice(product, photos.length)} 
                  />
                  {      
                        addedPhrases.map(() => {
                              return(<CartItem
                                    title={`Frase Adicional`}
                                    image={null}
                                    quantity={1}
                                    price={getPrice("additionalPhrase", 1)}
                              />);
                        })
                  }
                  <h2>Total: {totalPrice}</h2>
            </Box>
      );
}

export default Cart;