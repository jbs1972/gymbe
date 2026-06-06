const Joi = require("joi");

/**
 * Joi schema for creating a member profile
 */
const createMemberProfileSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .max(100)
    .trim()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters long",
      "string.max": "Name cannot exceed 100 characters",
      "any.required": "Name is required",
    }),
  email: Joi.string()
    .required()
    .email()
    .trim()
    .lowercase()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
  phone: Joi.string()
    .required()
    .trim()
    .messages({
      "string.empty": "Phone number is required",
      "any.required": "Phone number is required",
    }),
  membershipType: Joi.string()
    .valid("basic", "premium", "elite")
    .optional()
    .messages({
      "any.only": "Membership type must be one of: basic, premium, elite",
    }),
  joinDate: Joi.date()
    .optional()
    .messages({
      "date.base": "Join date must be a valid date",
    }),
  expiryDate: Joi.date()
    .optional()
    .messages({
      "date.base": "Expiry date must be a valid date",
    }),
});

/**
 * Joi schema for updating a member profile
 */
const updateMemberProfileSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .trim()
    .optional()
    .messages({
      "string.min": "Name must be at least 3 characters long",
      "string.max": "Name cannot exceed 100 characters",
    }),
  email: Joi.string()
    .email()
    .trim()
    .lowercase()
    .optional()
    .messages({
      "string.email": "Email must be a valid email address",
    }),
  phone: Joi.string()
    .trim()
    .optional()
    .messages({
      "string.empty": "Phone number cannot be empty",
    }),
  membershipType: Joi.string()
    .valid("basic", "premium", "elite")
    .optional()
    .messages({
      "any.only": "Membership type must be one of: basic, premium, elite",
    }),
  joinDate: Joi.date()
    .optional()
    .messages({
      "date.base": "Join date must be a valid date",
    }),
  expiryDate: Joi.date()
    .optional()
    .messages({
      "date.base": "Expiry date must be a valid date",
    }),
}).min(1).messages({
  "object.min": "At least one field must be provided for update",
});

/**
 * Validate create member profile request
 */
const validateCreateMemberProfile = (data) => {
  return createMemberProfileSchema.validate(data, { abortEarly: false });
};

/**
 * Validate update member profile request
 */
const validateUpdateMemberProfile = (data) => {
  return updateMemberProfileSchema.validate(data, { abortEarly: false });
};

/**
 * Middleware to validate create member profile
 */
const validateCreateMemberProfileMiddleware = (req, res, next) => {
  const { error, value } = validateCreateMemberProfile(req.body);
  if (error) {
    const messages = error.details.map(err => err.message);
    return res.status(400).json({
      message: "Validation failed",
      data: { errors: messages },
      status: 400,
    });
  }
  req.body = value;
  next();
};

/**
 * Middleware to validate update member profile
 */
const validateUpdateMemberProfileMiddleware = (req, res, next) => {
  const { error, value } = validateUpdateMemberProfile(req.body);
  if (error) {
    const messages = error.details.map(err => err.message);
    return res.status(400).json({
      message: "Validation failed",
      data: { errors: messages },
      status: 400,
    });
  }
  req.body = value;
  next();
};

module.exports = {
  validateCreateMemberProfile,
  validateUpdateMemberProfile,
  validateCreateMemberProfileMiddleware,
  validateUpdateMemberProfileMiddleware,
};
