const Joi = require('joi');
const { add } = require('lodash');
const mongoose = require('mongoose');

const MemberProfile = mongoose.model('MemberProfile', new mongoose.Schema({
  memberName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  dob: {
    type: Date,
    required: true,
    max: Date.now,
    validate: {
      validator: function(value) {
        return value instanceof Date && !isNaN(value.getTime());
      },
      message: 'Date of birth must be a valid date and cannot be in the future.'
    }
  },
  contactNumber: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  alternateContactNumber: {
    type: String,
    minlength: 5,
    maxlength: 50
  },
  memberEmail: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  address: {
    type: String,
    minlength: 5,
    maxlength: 200
  },
  memberGender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  }
}));

function validateCustomer(customer) {
  const schema = Joi.object({
    memberName: Joi.string().min(5).max(50).required(),
    dob: Joi.date().less('now').required(),
    contactNumber: Joi.string().min(5).max(50).required(),
    alternateContactNumber: Joi.string().min(5).max(50),
    memberEmail: Joi.string().min(5).max(100).required(),
    address: Joi.string().min(5).max(200),
    memberGender: Joi.string().valid('Male', 'Female', 'Other')
  });

  return schema.validate(customer);
}

exports.MemberProfile = MemberProfile; 
exports.validate = validateCustomer;