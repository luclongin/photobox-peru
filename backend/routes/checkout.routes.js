module.exports = app => {
    const checkout = require("../controllers/checkout.controller.js");
    var exportRouter = require("express").Router();

    exportRouter.post('/create_preference', checkout.createPreference);
    exportRouter.get('/feedback', checkout.getFeedback);

    // GENERAL
    app.use('/api/checkout', exportRouter);
}