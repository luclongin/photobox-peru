import React, { Fragment } from "react";
import { useMercadopago } from 'react-sdk-mercadopago';
import loadMercadoPagoScript from "../../utils/loadMercadoPagoScript";
import { createPreference } from "../../features/checkoutSlice/checkoutSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";

const MercadoPagoButton = () => {
    // PUBLIC KEY
    const mercadopago = useMercadopago.v2('APP_USR-6d805d48-0abb-4277-8f9f-a4a01fdc0a34', {
        locale: 'es-PE'
    });
    const dispatch = useDispatch();
    const order = useSelector(state => state.orders);
    const id = order.orderId;
    const [preferenceId, setPreferenceId] = useState(null);

    useEffect(() => {
        const orderData = new FormData();
        orderData.append('quantity', 1);
        orderData.append('description', 'PhotoBox Peru Gift Card');
        orderData.append('price', 100);
        
        console.log("let's go mercadopago");
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
            console.log("my preference:", preferenceId);
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://sdk.mercadopago.com/js/v2';
            const container = document.getElementById("cho-container");
            container.appendChild(script);
        }
    }, [preferenceId]);

    useEffect(() => {

        if(mercadopago && preferenceId) {
            console.log("prefid:", preferenceId);
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
