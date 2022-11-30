const express = require("express");
const cors = require("cors");
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path');

// MERCADO PAGO SET UP
const mercadopago = require("mercadopago");

mercadopago.configure({
	access_token: "TEST-7540547530633933-112708-96815504e4d0f8f18992b297206c5542-1249132598",
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