const express = require('express');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

// mergeParams allows for passing through the tourId from the tour Router
const router = express.Router();
router.use(authController.protect);

router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);

module.exports = router;
