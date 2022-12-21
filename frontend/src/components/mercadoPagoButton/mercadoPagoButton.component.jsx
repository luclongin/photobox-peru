import React, { Fragment } from "react";
import { useMercadopago } from 'react-sdk-mercadopago';
import loadMercadoPagoScript from "../../utils/loadMercadoPagoScript";
import { createPreference } from "../../features/checkoutSlice/checkoutSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import theme from "../../utils/theme";

const MercadoPagoButton = () => {
    // PUBLIC KEY
    const mercadopago = useMercadopago.v2('APP_USR-56a889a9-b928-4f89-8f60-fe89f3b1ad78', {
        locale: 'es-PE'
    });
    const dispatch = useDispatch();
    const order = useSelector(state => state.orders);
    const id = order.orderId;
    const totalPrice = useSelector(state => state.totalPrice);
    const [preferenceId, setPreferenceId] = useState(null);

    useEffect(() => {
        const orderData = new FormData();
        orderData.append('quantity', 1);
        orderData.append('description', 'PhotoBox Peru');
        orderData.append('price', totalPrice);
        
        dispatch(createPreference(orderData))
        .then(res => {
            //console.log("this is res", res);
            setPreferenceId(res.payload.id);
            //return res.json();
        }).catch(err => {
            console.log("shit", err);
        })
    }, [id]);

    useEffect(() => {
        if(preferenceId) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://sdk.mercadopago.com/js/v2';
            const container = document.getElementById("cho-container");
            container.appendChild(script);
        }
    }, [preferenceId]);

    useEffect(() => {
        if(mercadopago && preferenceId) {
            mercadopago.checkout({
                preference: {
                    id: preferenceId
                },
                render: {
                    container: '#cho-container',
                    label: 'Pay',
                }
            })
        }
    }, [preferenceId]);

    return(
        <Fragment>
            <Box id="cho-container"></Box>        
        </Fragment>
    );
}

export default MercadoPagoButton;
