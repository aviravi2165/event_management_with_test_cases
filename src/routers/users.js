const express = require('express');
const User = require('../models/users');
const { signUpUser, userLogin, userLogout, userLogoutAll, getUserDetail, updateUser, deletedUser, addAvatar } = require('../controller/users');
const router = new express.Router;
const { auth } = require('../middleware/auth');
const { body } = require('express-validator');

router.post('/user/signup', [
    body('first_name', 'First Name cannot be blank').notEmpty(),
    body('last_name', 'Last Name cannot be blank').notEmpty(),
    body('date_of_birth', 'Date of Birth cannot be blank').notEmpty(),
    body('gender', 'Gender cannot be blank').notEmpty(),
    body('email', 'Email must be valid email').notEmpty().isEmail()
    .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
            if (user) {
                return Promise.reject('Email already exits');
            }
        });
    }),
    body('password', 'Password cannot be blank').notEmpty()
], signUpUser);

router.post('/user/login', userLogin);

router.get('/user/logout', auth, userLogout);

router.get('/user/logoutall', auth, userLogoutAll);

router.get('/user/detail', auth, getUserDetail);

router.patch('/user/update', auth, [
    body('first_name', 'First Name cannot be blank').notEmpty(),
    body('last_name', 'Last Name cannot be blank').notEmpty(),
    body('date_of_birth', 'Date of Birth cannot be blank').notEmpty(),
    body('gender', 'Gender cannot be blank').notEmpty(),
    body('email', 'Email must be valid email').notEmpty().isEmail()
    .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
            if (user && req.user._id.toString() !== user._id.toString()) {
                return Promise.reject('Email already exits');
            }
        });
    })
], updateUser);

router.delete('/user/delete', auth, deletedUser);

router.post('/user/avatar', auth, addAvatar);

module.exports = router;