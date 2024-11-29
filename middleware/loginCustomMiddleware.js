import user from "../schema/userMdl.js";
const emailExistingCheck = async (email) => {
  const countEmailExisting = await user.countDocuments({ email });

  if (countEmailExisting > 0) {
    return true;
  }
  return false;
};

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    const error = new Error("email must be require");
    error.status = 400;
    return next(error);
  } else if (!email.includes("@")) {
    const error = new Error("email invalid");
    error.status = 400;
    return next(error);
  } else {
    const emailCheck = await emailExistingCheck(email);
    if (!emailCheck) {
      const error = new Error("user not exist");
      error.status = 400;
      return next(error);
    }
  }

  if (!password) {
    const error = new Error("password must be require");
    error.status = 400;
    return next(error);
  } else if (password.length < 6) {
    const error = new Error("password length must be 6 digit long");
    error.status = 400;
    return next(error);
  }
  next();
};

export default {
  loginValidation,
};
