module.exports = app => {
      const orders = require("../controllers/order.controller.js");
      const photos = require("../controllers/photo.controller.js");
      const users = require("../controllers/user.controller.js");
      const additionalPhrases = require("../controllers/additionalPhrase.controller");

      var router = require("express").Router();

      // PHOTO HANDLER
      router.post("/uploadPhoto", photos.uploadPhoto);
      router.post("/createPhoto", photos.createPhoto);
      router.get("/photos", photos.getPhotos);
      router.delete("/photos/:id", photos.delete);
      
      // ORDER HANDLER
      router.post("/createOrder", orders.createOrder);
      router.get("/", orders.findAll);
      router.delete("/:id", orders.delete);
      
      // USER HANDLER
      router.post("/createUser", users.createUser);
      router.get("/users", users.getUsers);
      router.delete("/users/:id", users.delete);

      // ADDITIONAL PHRASE HANDLER
      router.post("/createAdditionalPhrase", additionalPhrases.createAdditionalPhrase);
      router.get("/additionalPhrases", additionalPhrases.getAdditionalPhrases);
      router.delete("/additionalPhrases/:id", additionalPhrases.delete);

      // GENERAL
      app.use('/api/orders', router);
};