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

module.exports = {
    create: (req, res) => {
        var title = req.body.title;
        var description = req.body.description;
        var tickets = req.body.tickets;
        var date = req.body.date;
        pool.query('INSERT INTO public.events(event_name, description, event_date, tickets) values($1, $2, $3, $4)',
        [title, description, date, tickets], (err, response) => {
            if (err) throw err;
            return res.json({response:response, status:"success"});
        });
    },

    readall: (req, res) => {
        var result = [];
        pool.query('SELECT t1.*, SUM(t2.ticket_number) as total_count FROM events as t1 LEFT JOIN tickets as t2 ON t1.event_id = t2.event GROUP BY t1.event_id;'
            , (err, response) => {
          if (err) throw err;
          for (let row of response.rows) {
            result.push(JSON.stringify(row));
          }
          return res.json(result);
        });
    },

    delete: (req, res) => {
        let eventId = req.body.eventId;
        pool.query('DELETE FROM public.events WHERE event_id = $1', [eventId], (err, response) => {
          if (err) throw err;
          return res.json(response);
        });
    },
}