const express = require('express');
const server = express();
// public config
server.use(express.static('public'))
// template engine 
const nunjucks = require('nunjucks')
// template config
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});
const port = 3000;

server.get('/', (req, res) => {
  return res.render('index.html')
});

server.get('/createpoint', (req, res) => {
  return res.render('createPoint.html')
})

server.get('/resultpoints', (req, res) => {
  return res.render('searchResults.html')
})

server.listen(port);  