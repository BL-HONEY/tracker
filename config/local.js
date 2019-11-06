module.exports = {
    "PORT": process.env.PORT,
    "mongo": {
        "url": process.env.MONGO_URL,
        "options": {
            "useNewUrlParser": true
        },
        "createIndex": {
            "useCreateIndex": true
        }
    },
}

