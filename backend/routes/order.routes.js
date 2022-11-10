module.exports = app => {
      const orders = require("../controllers/order.controller.js");
      var router = require("express").Router();
      
      router.post("/", orders.create);
      router.post("/upload", orders.upload);
      router.get("/", users.findAll);
      
      app.use('/api/orders', router);
};