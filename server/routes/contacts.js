const express = require('express');
const router  = express.Router();
const Contact = require('../models/contact');

//get all
router.get('/', async (req,res) => {
  try {
    const contact = await Contact.find();
    res.json(contact);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

//get one by id
router.get('/:id', getContactById, (req,res) => {
  res.json(res.contact);
});

//create one
router.post('/', async (req,res) => {
  const contact = new Contact({
    first_name: req.body.first_name,
    last_name : req.body.last_name,
    phone     : req.body.phone,
    email     : req.body.email,
  });

  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({message: err.message});
  }

});

//path one by id
router.patch('/:id', getContactById, async (req,res) => {

  const body = req.body;

  if( body.first_name != null )res.contact.first_name = body.first_name;
  if( body.last_name  != null )res.contact.last_name  = body.last_name;
  if( body.phone      != null )res.contact.phone      = body.phone;
  if( body.email      != null )res.contact.email      = body.email;

  try {
    const updatedContact = await res.contact.save();
    res.status(201).json(updatedContact);
  } catch (err) {
    res.status(400).json({message: err.message});
  }

});

//delete one by id
router.delete('/:id', getContactById, async (req,res) => {
  try {
    await res.contact.deleteOne();
    res.status(204).json({message: `Deleted contact: ${req.params.id}`});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

//middleware

async function getContactById(req,res,next){
  let contact;
  try {
    contact = await Contact.findById(req.params.id);
    if(contact == null)return res.status(404).json({message: `Cant find contact: ${req.params.id}`});
  } catch (err) {
    return res.status(500).json({message: err.message});
  }

  res.contact = contact;
  next();
}

module.exports = router;
