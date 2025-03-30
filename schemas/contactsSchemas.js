import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a text",
    "string.min": "Name should be at least {#limit} characters long",
    "string.max": "Name should not be more than {#limit} characters long",
    "any.required": "Name is a required field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a text",
    "string.email": "Enter a valid email",
    "any.required": "Email is a required field",
  }),
  phone: Joi.string().required().messages({
    "string.base": "Phone number should be a text",
    "any.required": "Phone number is a required field",
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string(),
})
  .min(1)
  .messages({
    "object.min": "Body must have at least one field",
  });
