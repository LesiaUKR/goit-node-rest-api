import Joi from "joi";
import { emailRegexp } from "../constants/auth.js";

export const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.email": "Enter a valid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password should be at least {#limit} characters long",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

export const loginSchema = Joi.object({
 email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Enter a valid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

export const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required().messages({
    "string.empty": "Subscription is required",
    "any.required": "Subscription is required",
    "any.only": "Subscription must be one of ['starter', 'pro', 'business']",
  }),
});

export const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Enter a valid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
});
