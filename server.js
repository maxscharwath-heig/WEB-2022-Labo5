import express from 'express';
import sqlite3 from "sqlite3";

const app = express();

// Configure express
app.use(express.urlencoded({ extended: true }));

// Connect to the database
const db = new sqlite3.Database('dictons.sqlite', (err) => {
  if(err) {
    throw err;
  }
  console.log('Connected to the database');
});


// GET /
// Displays a random dicton in HTML.
// Example: <q>random dicton</q>
app.get('/', (req, res) => {
  db.get('SELECT * FROM dictons ORDER BY RANDOM() LIMIT 1', (err, row) => {
    if(err) {
      throw err;
    }
    res.send(`<q>${row.dicton}</q>`);
  });
});


// GET /list
// Displays all the dictons ordered by id in HTML
// Example: <ul><li><a href="/1">dicton 1</a></li></ul>
app.get('/list', (req, res) => {
  db.all('SELECT * FROM dictons ORDER BY id', (err, rows) => {
    if(err) {
      throw err;
    }
    let html = '<ul>';
    rows.forEach((row) => {
      html += `<li><a href="/${row.id}">${row.dicton}</a></li>`;
    });
    html += '</ul>';
    res.send(html);
  });
});

// GET /create
// Displays a HTML form for creating new dictons with POST requests.
// Example: <form method=POST><input type='text' name='dicton'></input><button>Nouveau dicton</button></form>
app.get('/create', (req, res) => {
  res.send(`
  <form method=POST>
    <input type='text' name='dicton'></input>
    <button>Nouveau dicton</button>
  </form>
  `);
})

// POST /create
// Inserts a new dicton in the database and redirect the user to its url
// Example: 301 /list
app.post('/create', (req, res) => {
  db.run('INSERT INTO dictons (dicton) VALUES (?)', [req.body.dicton], (err) => {
    if(err) {
      throw err;
    }
    res.redirect('/list');
  });
});

// GET /:id
// Returns a dicton by its id.
app.get('/:id', (req, res) => {
  db.get('SELECT * FROM dictons WHERE id = ?', [req.params.id], (err, row) => {
    if(err) {
      throw err;
    }
    console.log(row)
    res.send(`<q>${row?.dicton}</q>`);
  });
})

export default app;
