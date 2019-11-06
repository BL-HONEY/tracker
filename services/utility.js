module.exports.getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.filterKeys = (object, keys) => {
    Object.keys(object).forEach(function (key) {
        if (keys.indexOf(key) == -1) {
            delete object[key];
        }
    });
    return object;
}

