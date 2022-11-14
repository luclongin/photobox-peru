module.exports = app => {
      const orders = require("../controllers/order.controller.js");
      const photos = require("../controllers/photo.controller.js");
      const users = require("../controllers/user.controller.js");
      var router = require("express").Router();

      // PHOTO HANDLER
      router.post("/uploadPhoto", photos.uploadPhoto);
      router.post("/createPhoto", photos.createPhoto);
      router.get("/photos", photos.getPhotos);
      
      // ORDER HANDLER
      router.post("/createOrder", orders.createOrder);
      router.get("/", orders.findAll);
      
      // USER HANDLER
      router.post("/createUser", users.createUser);
      router.get("/users", users.getUsers);

      // GENERAL
      app.use('/api/orders', router);
};