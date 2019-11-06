const 
     jwt = require('jsonwebtoken'),
     secretKey = 'eweweweweweewwe'; 


module.exports.verifyToken = (req, res, next) => {
    try {
        let tokens = req.headers['token'];
        if (tokens == undefined || tokens == null) throw "No tokens available"

        jwt.verify(tokens, secretKey, (err, data) => {
            if (err) {
                // console.log('auth token auth error', err);            
                return res.send({
                    success: false,
                    message: "invalid tokens"
                })
            } else {
                // console.log('auth token verify data ---',data);
                req.body.token = data;
                console.log("req.body: ", req.body);
                next();
            }
        })
    } catch (error) {
        next(error);
    }
}
module.exports.getTokens = (payload) => {
    var tokens = jwt.sign({ payload }, secretKey)
    return tokens
  }
