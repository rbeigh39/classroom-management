const express = require('express');
const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController')

const router = express.Router();

router.route('/')
    .get(notificationController.getAllNotifications)
    .post(authController.protect, authController.restrictTo('admin'), notificationController.createNotification)
    .patch(authController.protect, authController.restrictTo('admin'), notificationController.updateNotification)

module.exports = router;