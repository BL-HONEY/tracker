const
  userServices = require('../services/user'),
  constantsParam = require('../constants/static.js'),
  utitlityService = require('../services/utility');

class UserController {
  addUser(req, res, next) {
    try {
      req.checkBody("contactNumber")
        .notEmpty().withMessage('must be at least 10 chars long')
        .matches(/^[6-9]\d{9}$/).withMessage('must start from 6-9 , must be of length 10');

      var errors = req.validationErrors();
      let responseObject = {}

      if (errors) {
        responseObject.success = false;
        responseObject.code = 400;
        responseObject.error = errors;
        // send responseResult object when error occur during request body validation
        return res.status(400).send(responseObject)
      } else {
        let filteredReqBody = utitlityService.filterKeys(req.body, ['contactNumber']);
        userServices.saveUser(filteredReqBody)
          .then((addedUserData) => {

            responseObject.result = "Please use OTP for user verification";
            responseObject.OTP = addedUserData.OTP;
            responseObject.tokens = addedUserData.tokens;
            responseObject.message = constantsParam.staticHTTPSuccessMessages.CREATED;
            return res.status(constantsParam.staticHTTPSuccessMessages.CREATED.successResponseCode)
              .send(responseObject);
          })
          .catch((error) => {
            responseObject.status = false;
            responseObject.code = 400;
            responseObject.errorMessage = error.message
            return res.status(constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode)
              .send(responseObject);
          })
      }
    } catch (error) {
      next(error);
    }
  }

  verifyUser(req, res, next) {
    try {
      let responseObject = {}
      userServices.verifyUser(req.body)
        .then((response) => {
          console.log("i am here");

          responseObject.result = "User verified successfully";
          responseObject.message = constantsParam.staticHTTPSuccessMessages.OK;
          return res.status(constantsParam.staticHTTPSuccessMessages.OK.successResponseCode)
            .send(responseObject);
        })
        .catch((error) => {
          responseObject.status = false;
          responseObject.message = error.message
          return res.status(constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode)
            .send(responseObject);
        })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();