const ApiError = require('./apiError');
const { isJSON } = require('../helper/helpers');
const apiErrorHandler = function (err, req, res, next) {
    let response;
    if (err instanceof ApiError) {
        if (isJSON(err.msg)) {
            response = {
                status: err.status,
                errors: JSON.parse(err.msg)
            }
        } else {
            response = {
                status: err.status,
                errorsMessage: err.msg
            }
        }
        res.status(err.status).send(response);
        return;
    }
    res.status(500).send("Something Went Wrong");
}

module.exports = apiErrorHandler;