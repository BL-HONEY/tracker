const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
        trim: true,
        // validate: /^[a-zA-Z0-9]([\w -]*[a-zA-Z0-9])?$/
    },
    email: {
        type: String,
        default: null,
        trim: true,
        // validate: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    contactNumber: {
        type: Number,
        require: [true, 'contact number is a required field'],
        trim: true,
        validate: /^[6-9]\d{9}$/,
        unique: true
    },
    otp: {
        type: Number,
        require: [true, 'otp is a required field'],
        trim: true,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    tokens: {
        type: String,
        default: null
    }

})

const user = mongoose.model('user', userSchema, 'user');

class UserModel {

    create(body) {
        return new Promise((resolve, reject) => {
            let userData = new user({
                contactNumber: body.contactNumber
            });
            userData.save()
                .then((savedData) => {
                    resolve(savedData)
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    find(queryParamObj) {
        return new Promise((resolve, reject) => {
            user.findOne(queryParamObj)
                .then((foundData) => {
                    resolve(foundData)
                })
                .catch((error) => {
                    reject(error)
                });
        });
    }

    update(queryParamObj) {
        return new Promise((resolve, reject) => {
            user.findOneAndUpdate(queryParamObj.filter, queryParamObj.update, {
                new: true,
                upsert: true // Make this update into an upsert
            })
                .then((updatedInfo) => {
                    resolve(updatedInfo);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }
}
module.exports = new UserModel();