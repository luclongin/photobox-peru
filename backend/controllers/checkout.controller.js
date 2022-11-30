const mercadopago = require("mercadopago");

exports.createPreference = (req, res) => {
    console.log("what's my body:", req.body);

    const orderData = Object.assign({}, req.body);
    if (!req.body) {
          res.status(400).send({
                message: "Content can not be empty!"
          });
          return;
    }

    let preference = {
        items: [
            {
                title: orderData.description,
                unit_price: Number(orderData.price),
                quantity: Number(orderData.quantity),
            }
        ],
        back_urls: {
            "success": "http://localhost:3000/feedback",
            "failure": "http://localhost:3000/feedback",
            "pending": "http://localhost:3000/feedback",
        },
        auto_return: "approved",
    };

    mercadopago.preferences.create(preference).then(response => {
        res.json({
            id: response.body.id
        });
    }).catch(err => {
        console.log("ERR", err);
    });
}

exports.getFeedback = (req, res) => {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    });
}