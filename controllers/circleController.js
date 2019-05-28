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
        pool.query('INSERT INTO public.circle(title, description) values($1, $2)',
        [title, description], (err, response) => {
            if (err) throw err;
            return res.json({response:response, status:"success"});
        });
    },

    readall: (req, res) => {
        var result = [];
        pool.query('SELECT * FROM public.circle ORDER BY circle_id DESC;', (err, response) => {
          if (err) throw err;
          for (let row of response.rows) {
            result.push(JSON.stringify(row));
          }
          return res.json(result);
        });
    },

    change_circle: (req, res) => {
      var circle_id = req.body.circleId;
      var title = req.body.title;
      var description  = req.body.description;
      pool.query('UPDATE circle SET title = $1, description = $2 WHERE circle_id = $3',
        [title, description, circle_id], (err, response) => {
            if (err) throw err;
            return res.json(response);
        });
    },

    delete: (req, res) => {
        let circle_id = req.body.circleId;
        pool.query('DELETE FROM public.circle WHERE circle_id = $1', [circle_id], (err, response) => {
          if (err) throw err;
          return res.json(response);
        });
    },
}
