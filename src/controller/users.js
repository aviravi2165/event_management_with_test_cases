const User = require('../models/users');
const ApiError = require('../errors/apiError');
const ApiSuccess = require('../success/apiSuccess');
const jwt = require('jsonwebtoken');
const uploadFileMulter = require('../uploader/fileupload');
const fs = require('fs');
const { validationResult } = require('express-validator');

const upload = uploadFileMulter('./uploads/users', 'profileImage_', 'profileImage');


const signUpUser = async (req, res, next) => {
    try {
        let errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            let newErrorObj = {};
            errors.errors.forEach(e => {
                newErrorObj[e.param] = e.msg;
            });
            throw new Error(JSON.stringify(newErrorObj));
        }
        const user = new User(req.body);
        const token = await user.generateToken();
        next(ApiSuccess.created({ user, token }));
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}

const userLogin = async (req, res, next) => {
    try {
        const credential = req.body;
        const user = await User.confirmCredential(credential.email, credential.password);
        const token = await user.generateToken();
        next(ApiSuccess.ok({ user, token }));
    } catch (e) {
        next(ApiError.notFound(e.message));
    }
}

const userLogout = async (req, res, next) => {
    try {
        const tokens = req.user.tokens;
        req.user.tokens = tokens.filter(token => token.token !== req.token);
        await req.user.save();
        next(ApiSuccess.ok());
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}

const userLogoutAll = async (req, res, next) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        next(ApiSuccess.ok());
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}

const getUserDetail = async (req, res, next) => {
    next(ApiSuccess.ok(req.user));
}

const updateUser = async (req, res, next) => {
    try {
        let errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            let newErrorObj = {};
            errors.errors.forEach(e => {
                newErrorObj[e.param] = e.msg;
            });
            throw new Error(JSON.stringify(newErrorObj));
        }
        
        const allowedFields = ['first_name', 'last_name', 'date_of_birth', 'gender', 'email', 'password'];
        const user = await User.findById(req.user._id);
        allowedFields.forEach(field => {
            if (user.toObject().hasOwnProperty(field) && req.body[field]) {
                user[field] = req.body[field];
            }
        });
        await user.save();
        next(ApiSuccess.ok(user));
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}

const deletedUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user._id);
        if (!deletedUser) throw new Error("User cannot be deleted");
        next(ApiSuccess.ok(deletedUser));
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}
const addAvatar = async (req, res, next) => {
    const id = req.user._id;
    upload(req, res, async function (err) {
        try {
            if (err) {
                throw new Error(err);
            }
            const user = await User.findById(id);
            if (!user) {
                throw new Error('User Not found');
            }
            const userUpdated = await User.findByIdAndUpdate(id, { profileImage: req.file.filename });
            if (!userUpdated) {
                throw new Error("Something went wrong");
            }
            next(ApiSuccess.ok("Avatar Uploaded"));
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    });
}
module.exports = {
    signUpUser,
    userLogin,
    userLogout,
    userLogoutAll,
    getUserDetail,
    updateUser,
    deletedUser,
    addAvatar
}