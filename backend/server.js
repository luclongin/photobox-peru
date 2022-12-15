const express = require("express");
const cors = require("cors");
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path');

// MERCADO PAGO SET UP
const mercadopago = require("mercadopago");

mercadopago.configure({
	access_token: "APP_USR-584352574812505-120220-96d3fa38fe1befe43a71d5e87a652d13-1253671658",
});


var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(fileUpload());
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync({ logging: console.log })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

require("./routes/order.routes")(app);
require("./routes/checkout.routes")(app);

app.use(express.static(path.join(__dirname, '/public')));
app.use('/uploads', express.static('uploads'));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});