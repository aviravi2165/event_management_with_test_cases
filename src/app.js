require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/users');
const eventsRouter = require('./routers/events');
const apiErrorHandler = require('./errors/apiErrorHandler');
const apiSuccessHandler = require('./success/apiSuccessHandler');
const ApiError = require('./errors/apiError');
const path = require('path');
const app = express();

app.use(express.json());

app.use('/previewimage', express.static(path.resolve() + '/uploads'));

app.use(userRouter);
app.use(eventsRouter);

app.use(function (req, res, next) {
    const e = new Error("No Api Found");

    next(ApiError.notFound(e.message));
});
app.use(apiSuccessHandler);
app.use(apiErrorHandler);

module.exports = app;