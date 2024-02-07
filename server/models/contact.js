const mongoose = require('mongoose');

const contactScheme = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    default: '+7(000)000-00-00'
  },
  email: {
    type: String,
    required: true,
    default: 'x.x@gmail.com'
  }
});

module.exports = mongoose.model('Contact', contactScheme);
