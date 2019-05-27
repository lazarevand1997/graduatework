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

// ticket hash
const bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;

module.exports = {
    create: (req, res) => {
        let date = new Date;
        let date_to_hash = date.toString()
        var places = req.body.places;
        var event_id = req.body.event_id;
        bcrypt.hash(date_to_hash, BCRYPT_SALT_ROUNDS)
         .then(function(hashedkey) {
            pool.query('INSERT INTO public.tickets(event, ticket_number, ticket_hash) values($1, $2, $3)',
            [event_id, places, hashedkey], (err, response) => {
                if (err) throw err;
                return res.json({response:response, status:"success", hashkey: hashedkey});
            });
        })
        .catch(function(error){
            console.log("Error saving tickets: ");
            console.log(error);
            return res.json({status: "error"});
        });
    },

    checkticket: (req, res) => {
        let ticket_hash = req.body.keyhash;
        var result = [];
        pool.query('SELECT t1.*, t2.ticket_number FROM events as t1, tickets as t2 WHERE t1.event_id = t2.event AND t2.ticket_hash = $1;', 
          [ticket_hash], (err, response) => {
          if (err) throw err;
          for (let row of response.rows) {
            result.push(JSON.stringify(row));
          }
          return res.json(result);
        });
    },
}
