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
                unit_price: 0,
                currency_id: 'PEN',
                quantity: Number(orderData.quantity),
                //additional_info: orderData.additionalInfo,
            }
        ],
        payer: {
            name: orderData.firstName,
            surname: orderData.lastName,
            email: orderData.email,
            phone: orderData.phoneNumber,
            address: orderData.address,
            date_created: orderData.dateCreated
        },
        back_urls: {
            "success": "http://localhost:3000/gracias",
            "failure": "http://localhost:3000/feedback",
            "pending": "http://localhost:3000/feedback",
        },
        auto_return: "approved",
        "binary_mode": true,
        notification_url: "http://localhost:3000/notifications",
        payment_methods: {
          excluded_payment_methods: [
            {
            }
          ],
          excluded_payment_types: [
            {
                "id": "ticket"
            },
            {
                "id": "bank_transfer"
            }
          ],
          "installments": 1
        },
    };

    mercadopago.preferences.create(preference).then(response => {
        res.json({
            id: response.body.id
        });
    }).catch(err => {
        console.log("ERR", err);
    });
}

exports.success = (req, res) => {
    res.send("VAMOS BB");
}

exports.getFeedback = (req, res) => {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    });
}