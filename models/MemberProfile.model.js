const Joi = require('joi');
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
        return value instanceof Date;
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
  memberEmail: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  memberAddr: {
    type: String,
    minlength: 5,
    maxlength: 200
  },
  memberGender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  memberBloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  }
}, { timestamps: true, versionKey: false })); 

function validateCustomer(customer) {
  const schema = Joi.object({
    memberName: Joi.string().min(5).max(50).required(),
    dob: Joi.date().less('now').required(),
    contactNumber: Joi.string().min(5).max(50).required(),
    memberEmail: Joi.string().min(5).max(100).required(),
    memberAddr: Joi.string().min(5).max(200),
    memberGender: Joi.string().valid('Male', 'Female', 'Other'),
    memberBloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
  });

  return schema.validate(customer);
} 

exports.MemberProfile = MemberProfile; 
exports.validate = validateCustomer;