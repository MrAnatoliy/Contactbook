// Environment variables
require('dotenv').config();

//Requirements
const express  = require('express');
const mongoose = require('mongoose');

//
const app = express();
mongoose.connect(process.env.DATABASE_URI);
const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => console.log(`Connected to database: ${process.env.DATABASE_URI}/${db.name}`));

app.use(express.json());

const contactsRouter = require('./routes/contacts');
app.use('/contacts', contactsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started successfully on ${process.env.SERVER_URL}:${process.env.PORT} `)
});
