const Notification = require('../models/notificationModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

const createNotification = catchAsync(async (req, res, next) => {
    const notification = await Notification.create(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Notification successfully created',
        data: {
            notification
        }
    })
});

const getAllNotifications = catchAsync(async (req, res, next) => {
    const notifications = await Notification.find();

    res.status(200).json({
        status: 'success',
        data: {
            notifications
        }
    })
})

const updateNotification = catchAsync(async (req, res, next) => {
    const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: 'success',
        data: {
            notification
        }
    })
})

module.exports = {
    createNotification,
    getAllNotifications,
    updateNotification
}