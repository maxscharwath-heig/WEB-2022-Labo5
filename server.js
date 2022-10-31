import express from 'express';
import sqlite3 from "sqlite3";

const app = express();

// Configure express


// Connect to the database


// GET /
// Displays a random dicton in HTML.
// Example: <q>random dicton</q>


// GET /list
// Displays all the dictons ordered by id in HTML
// Example: <ul><li><a href="/1">dicton 1</a></li></ul> 


// GET /create
// Displays a HTML form for creating new dictons with POST requests.
// Example: <form method=POST><input type='text' name='dicton'></input><button>Nouveau dicton</button></form>


// POST /create
// Inserts a new dicton in the database and redirect the user to its url
// Example: 301 /list


// GET /:id
// Returns a dicton by its id.

export default app;