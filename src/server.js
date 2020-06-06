const express = require('express');
const server = express();
// public config
server.use(express.static('public'))
//  req.body express config
server.use(express.urlencoded({ extended: true }));

// database
const db = require('./database/db')

// template engine 
const nunjucks = require('nunjucks')
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
  return res.render('createPoint.html');
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
  ) VALUES (?,?,?,?,?,?,?);`

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if (err) {
      return console.log(err);
      //return res.send('Error no Cadastro');
    }
    console.log(this);
    return res.render('createPoint.html', { saved: true })
  }

  db.run(query, values, afterInsertData);
});


server.get('/resultpoints', (req, res) => {
  const search = req.query.search
  if (search == '') {
    return res.render('searchResults.html', { total: 0 });
  }
  // take  database data
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      console.log(err);
    }
    const total = rows.length;

    console.log(total);
    
    return res.render('searchResults.html', { places: rows, total: total });
  });

});

server.listen(port)
