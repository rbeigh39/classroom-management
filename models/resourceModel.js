const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please specify the title for the resource'],
        trim: true,
    },
    fileName: {
        type: String,
    },
    description: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;