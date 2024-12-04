import Joi from "joi";
const loginUser = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

const registerUser = Joi.object({
  name: Joi.string().min(2).max(15).required().messages({
    "string.empty": "Name is not empty",
    "any.required": "Name is required",
    "string.min": "Name must be a 2 characters",
    "string.max": "Name must be a 15 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email valid format",
    "string.empty": "Email is required",
  }),
  password: Joi.string().min(6).max(10).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be a 6 min characters",
    "string.max": "Password must be a max 10 characters",
  }),
});
export default {
  loginUser,
  registerUser,
};
