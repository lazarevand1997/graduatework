// pass hash
const bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;

//db connection
const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'jyfxkcologkfbq',
  host: 'ec2-46-137-113-157.eu-west-1.compute.amazonaws.com',
  database: 'd70smk5hacq2ci',
  password: 'f6b2158e64a19ad9d0b99125eaa7c212631e69dc01a3099dcc1f751c24b3ae7c',
  port: 5432,
  ssl: true
});

// webtoken
const jwt = require('jsonwebtoken');
var {SECRET} = require("../config");
var createToken = (details, secret) => {
  return jwt.sign({ userId: details.userId }, secret, {
    expiresIn: details.expire
  });
};

module.exports = {
    create: (req, res) => {
        var login = req.body.login;
        var email = req.body.email;
        var is_admin = false;
        var password = req.body.password;
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
         .then(function(hashedPassword) {
             pool.query('INSERT INTO users(user_name, password, is_admin, email) values($1, $2, $3, $4)',
             [login, hashedPassword, is_admin, email], (err, response) => {
                 if (err) throw err;
                 return res.json(response);
             });
  
         })
         .catch(function(error){
             console.log("Error saving user: ");
             console.log(error);
             return res.send('error pass');
         });
    },

    changePassword: (req, res) => {
        var userid = req.session.userid;
        var new_password  = req.body.new_password;
        bcrypt.hash(new_password, BCRYPT_SALT_ROUNDS)
         .then(function(hashedPassword) {
             pool.query('UPDATE users SET password = $1 WHERE user_id = $2',
             [hashedPassword, userid], (err, response) => {
                 if (err) throw err;
                 return res.json(response);
             });
  
         })
         .catch(function(error){
             console.log("Error saving user: ");
             console.log(error);
             return res.send('error pass');
         });
    },

    check: (req, res) => {
        return res.send({ username: req.session.name, isadmin: req.session.isadmin, email: req.session.email });
    },
  

    login: (req, res) => {
        var login = req.body.login;
        var password = req.body.password;
        pool.query('SELECT * FROM public.users WHERE user_name = $1;', ([login]), (error, results) => {
             if (error) {
               throw error;
             };
             var user_data = results.rows;
             console.log(user_data);
             var picked_user = user_data.find(o => o.user_name === login);
             if((picked_user) && bcrypt.compareSync(password, picked_user.password)){
                     var access_token = createToken({
                         userId:picked_user.use_id,
                         type: "access",
                         expire: "365d"
                     },
                      SECRET);
                     req.session.access_token = access_token;
                     req.session.name = picked_user.user_name;
                     req.session.isadmin = picked_user.is_admin;
                     req.session.userid = picked_user.user_id;
                     req.session.email = picked_user.email;
                     return res
                          .status(201)
                          .json({ status: "success", user_name: picked_user.user_name, access_token: access_token});
             } else {
                 res.send('error log');
                 console.log('not ok pass');
             };
         });
    }
  };
  