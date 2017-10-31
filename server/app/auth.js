var http = require('request-promise');

var auth = {
    sayhello: function(req, res) {
        console.log('Test method');
        res.send('Hello');
    },
    login: function(req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';
        
        // Kick out the user when either of the fields are blank
        if (username == '' || password == '') {
            //logger.warn('Invalid credentials');
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }
        request_promise('http://localhost:8080/patent_servlet/authenticate?username='+username+'&password='+password)
        .then(function (auth_data) {
            var auth_res = JSON.parse(auth_data);
            req.session.token  = auth_res["auth_token"];
            res.json(auth_res);
        })
        .catch(function (err) {
            res.status(401);
            res.json({
            "status": 401,
            "message": "Invalid credentials"
            });
            return;
        });
    },
    
    logout: function(req, res) {
        var token = req.body.token;
        request_promise('http://localhost:8080/patent_servlet/logout?auth_token='+token)
        .then(function (auth_data) {
        //logger.info('Successful logout');
        delete req.session.token;
        res.json('Successful logout');
        })
        .catch(function (err) {
        //logger.info('Error while logout');
        res.status(401);
        res.json({
        	"status": 401,
        	"message": "Not able to do Successful logout"
        });
        return;
        });
    }
};

module.exports = auth;