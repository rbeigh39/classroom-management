const multer = require('multer');
const authController = require('./authController');
const AppError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');
const Resource = require('../models/resourceModel');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/resources');
    },
    filename: (req, file, cb) => {
        let ext;

        if (file.mimetype.includes('.document')) {
            console.log('one');
            ext = 'docx';
        } else if (file.mimetype.includes('.presentation')) {
            console.log('two');
            ext = 'pptx';
        } else {
            ext = file.mimetype.split('/')[1];
        }

        cb(null, `resource-${req.user.id}-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb (null, true);
    } else {
        cb (new appError('Not an image. Plesase upload only images', 400));
    }
}

const upload = multer({
    storage: multerStorage
}); 

const uploadResource = upload.single('file');

const getAllResources = catchAsync(async (req, res, next) => {
    const resources = await Resource.find();

    res.status(200).json({
        status: 'success',
        data: {
            resources
        }
    })
});

const getResource = catchAsync(async (req, res, next) => {
    const resource = await Resource.findOne({title: req.params.title});

    if (!resource) return next(new AppError('No resources found with that title', 404));

    res.status(200).json({
        status: 'success',
        data: {
            Resource
        }
    })
})

const createResource = catchAsync(async (req, res, next) => {
    if (!req.file) return next(new AppError('Please attach a file!', 400));
    req.body.fileName = req.file.filename;

    const resource = await Resource.create({
        title: req.body.title,
        description: req.body.description,
        fileName: req.body.fileName
    });

    res.status(200).json({
        status: 'success',
        data: {
            resource
        }
    })
})

const downloadResource = catchAsync(async (req, res, next) => {
    const path = `./public/resources/${req.params.fileName}`;
    res.download(path);
})

module.exports = {
    getAllResources,
    getResource,
    createResource,
    uploadResource,
    downloadResource
}