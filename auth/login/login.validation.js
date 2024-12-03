import Joi from "joi";
const loginUser = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "invalid email format",
    "string.empty": "email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "password is required",
  }),
});

export default {
  loginUser,
};
