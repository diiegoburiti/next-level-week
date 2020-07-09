const express = require('express');

const server = express();
// public config
server.use(express.static('public'));
//  req.body express config
server.use(express.urlencoded({ extended: true }));

// template engine
const nunjucks = require('nunjucks');

// database
const db = require('./database/db');

// template config
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});
const port = 3000;

server.get('/', (req, res) => {
  return res.render('index.html');
});

server.get('/createpoint', (req, res) => {
  return res.render('createPoint.html', { saved: false });
});

server.post('/savepoint', (req, res) => {
  const query = `
  INSERT INTO places (
    image,
    name,
    address,
    address2,
    state,
    city,
    items
  ) VALUES (?,?,?,?,?,?,?);`;

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.render('createPoint.html', { error: true });
    }
    console.log(this);
    return res.render('createPoint.html', { saved: true });
  }

  db.run(query, values, afterInsertData);
});

server.get('/resultpoints', (req, res) => {
  const search = req.query.search;
  if (search === '') {
    return res.render('searchResults.html', { total: 0 });
  }
  // take  database data
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, (err, rows) => {
    if (err) {
      console.log(err);
    }
    const total = rows.length;
    return res.render('searchResults.html', { places: rows, total });
  });
});

server.listen(port, () => console.log(`Server running on port ${port}`));
