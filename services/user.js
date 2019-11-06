const
    userModel = require('../app/models/user'),
    utitlty = require('./utility'),
    jwtService = require('./jwt');


class UserService {
    saveUser(body) {
        return new Promise((resolve, reject) => {
            let queryParamObj = {};
            let responseBody = {};
            queryParamObj = { contactNumber: body.contactNumber };
            userModel.find(queryParamObj)
                .then((foundData) => {
                    if (foundData != undefined || foundData != null) {
                        responseBody.message = "Contact number already registered"
                        reject(responseBody);
                    } else {
                        userModel.create(body)
                            .then((response) => {
                                let otp = utitlty.getRandomInt(1000, 9999);
                                let tokens = jwtService.getTokens(response._id);
                                queryParamObj.filter = { _id: response._id };
                                queryParamObj.update = { otp: otp, tokens: tokens };
                                userModel.update(queryParamObj)
                                    .then((updatedInfo) => {
                                        updatedInfo.OTP = otp;
                                        updatedInfo.tokens = tokens
                                        resolve(updatedInfo);
                                    })
                                    .catch((error) => {
                                        reject(error);
                                    })
                            })
                            .catch((error) => {
                                reject(error);
                            })
                    }
                })
                .catch((error) => {
                    reject(error);
                })

        })
    }

    verifyUser(body) {
        return new Promise((resolve, reject) => {
            let queryParamObj = { _id: body.token.payload };
            let responseBody = {}
            userModel.find(queryParamObj)
                .then((foundData) => {
                    console.log("found 55:----------------", foundData);

                    if (foundData != undefined || foundData != null) {
                        if (foundData.otp === body.otp) {
                            queryParamObj.filter = { _id: foundData._id };
                            queryParamObj.update = { isVerified: true };
                            userModel.update(queryParamObj)
                                .then((updatedInfo) => {
                                    console.log("updated info: ", updatedInfo);

                                    resolve(updatedInfo);
                                })
                                .catch((error) => {
                                    reject(error);
                                })
                        } else {
                            responseBody.message = "Wrong OTP"
                            reject(responseBody);
                        }
                    } else {
                        reject(foundData)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

module.exports = new UserService();