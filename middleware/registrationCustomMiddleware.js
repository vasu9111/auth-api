import user from "../schema/userMdl.js";

const registrationValidation = async (req, res, next) => {
  const emailExistingCheck = async (email) => {
    const countEmailExisting = await user.countDocuments({ email });

    if (countEmailExisting > 0) {
      return true;
    }
    return false;
  };

  const { name, email, password } = req.body;
  if (!name) {
    const error = new Error("name must be require");
    error.status = 400;
    return next(error);
  } else if (name.length < 1) {
    const error = new Error("name invalid");
    error.status = 400;
    return next(error);
  }
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
    if (emailCheck) {
      const error = new Error("user already exist");
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
  registrationValidation,
};
