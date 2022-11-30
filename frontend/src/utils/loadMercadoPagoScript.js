const loadMercadoPagoScript = (callback) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.id = 'mercadoPagoScript';
    document.body.appendChild(script);
    script.onload = () => { 
      if (callback) callback();
    };
};

export default loadMercadoPagoScript;