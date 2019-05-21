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
        let today = new Date;
        var title = req.body.title;
        var description = req.body.description;
        var date = today.getUTCFullYear() + '-' + (today.getUTCMonth() + 1) + '-' + today.getUTCDate();
        console.log(date);
        pool.query('INSERT INTO public.news(news_name, description, news_date) values($1, $2, $3)',
        [title, description, date], (err, response) => {
            if (err) throw err;
            return res.json({response:response, status:"success"});
        });
    },

    readall: (req, res) => {
        var result = [];
        pool.query('SELECT * FROM public.news ORDER BY news_id DESC;', (err, response) => {
          if (err) throw err;
          for (let row of response.rows) {
            result.push(JSON.stringify(row));
          }
          console.log(result);
          return res.json(result);
        });
    },

    readlast: (req, res) => {
        var result = [];
        pool.query('SELECT * FROM public.news ORDER BY news_id DESC LIMIT 3;', (err, response) => {
          if (err) throw err;
          for (let row of response.rows) {
            result.push(JSON.stringify(row));
          }
          console.log(result);
          return res.json(result);
        });
    },

    delete: (req, res) => {
        let news_id = req.body.newsId;
        pool.query('DELETE FROM public.news WHERE news_id = $1', [news_id], (err, response) => {
          if (err) throw err;
          return res.json(response);
        });
    },
}