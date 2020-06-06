const sqlite3 = require('sqlite3').verbose();

// object db
const db = new sqlite3.Database('./src/database/databse.db');

module.exports = db

// Using db object 
/* db.serialize(() => {
  // create table
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY  AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `) */

  // insert data
/*   const query = `
  INSERT INTO places (
    image,
    name,
    address,
    address2,
    state,
    city,
    items
  ) VALUES (?,?,?,?,?,?,?);` */

/*   const value1 = [
    'https://images.unsplash.com/photo-1558583055-d7ac00b1adca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
    'Colectoria',
    'Guamá, R.Barão de Igarapé Miri',
    'Número: 000',
    'Pará',
    'Beĺem',
    'Residos Eletronico, Lampadas'
  ] */

 /*  const value2 = [
    'https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80',
    'Papersider',
    'Terra Firmer, R.São Domingos',
    'Número: 111',
    'Pará',
    'Beĺem',
    'Papel e Papelão, Pilhas'
  ] */

  /* function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }
    console.log('Cadastrado com sucesso');
    console.log(this);
  }

  db.run(query, value1, afterInsertData) */

  // consult data
 /*  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    console.log('Aqui estão os seus registro:', rows);
  })  */

  // delete data
  /* db.run(`DELETE FROM places WHERE id = ?`, [2], function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Registro deletado com sucesso!');
  }) */

//}) 