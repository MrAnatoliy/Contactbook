// Environment variables
require('dotenv').config();

//Requirements
const express  = require('express');
const mongoose = require('mongoose');
const path     = require('path');
//const cors     = require('cors');

//
const app = express();

var distDir = path.join(__dirname, "/dist/browser");
app.use(express.static(distDir));
//app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', (err) => console.log('Cannot connect to the database', err));
db.once('open', () => console.log(`Connected to database: ${process.env.MONGODB_URL}/${db.name}`));

app.use(express.json());

const contactsRouter = require('./routes/contacts');
app.use('/contacts', contactsRouter);

// Serve Angular app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/browser/index.html'));
});

// Serve JavaScript files with correct MIME type
app.get('*.js', function (req, res, next) {
  res.type('text/javascript');
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`Server started successfully on port:${process.env.PORT} `)
});
