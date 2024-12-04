import userMdl from "../../schema/userMdl.js";

const userExistingCheck = async (email) => {
  const countEmailExisting = await userMdl.countDocuments({ email });

  if (countEmailExisting > 0) {
    return true;
  }
  return false;
};
// login validation
const loginCustomValidation = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    const error = new Error("Email ID must be required");
    error.code = "EMAIL_REQUIRED";
    error.status = 400;
    return next(error);
  } else if (!email.includes("@")) {
    const error = new Error("Email ID is in invalid format");
    error.code = "EMAIL_INVALID";
    error.status = 400;
    return next(error);
  } else {
    const userFound = await userExistingCheck(email);
    if (!userFound) {
      const error = new Error("User not found");
      error.code = "USER_NOT_FOUND";
      error.status = 400;
      return next(error);
    }
  }
  const userData = await userMdl.findOne({ email });
  if (!password) {
    const error = new Error("password must be required");
    error.code = "PASSWORD_REQUIRE";
    error.status = 400;
    return next(error);
  } else if (password !== userData.password) {
    const error = new Error("invalid password");
    error.code = "INVALID_PASSWORD";
    error.status = 401;
    return next(error);
  }
  next();
};

// registation validation
const registationCustomValidation = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) {
    const error = new Error("Name must be required");
    error.code = "NAME_REQUIRED";
    error.status = 400;
    return next(error);
  } else if (name.length < 1) {
    const error = new Error("Name is invalid");
    error.code = "NAME_INVALID";
    error.status = 400;
    return next(error);
  }
  if (!email) {
    const error = new Error("Email ID must be required");
    error.code = "EMAIL_REQUIRED";
    error.status = 400;
    return next(error);
  } else if (!email.includes("@")) {
    const error = new Error("Email ID is in invalid format");
    error.code = "EMAIL_INVALID";
    error.status = 400;
    return next(error);
  } else {
    const emailCheck = await userExistingCheck(email);
    if (emailCheck) {
      const error = new Error("User already exist");
      error.code = "USER_EXIST";
      error.status = 409;
      return next(error);
    }
  }

  if (!password) {
    const error = new Error("password must be required");
    error.code = "PASSWORD_REQUIRED";
    error.status = 400;
    return next(error);
  } else if (password.length < 6 || password.length > 16) {
    const error = new Error("password length must be 6 digit long");
    error.code = "PASSWORD_INVALID";
    error.status = 400;
    return next(error);
  }
  next();
};
export default {
  loginCustomValidation,
  registationCustomValidation,
};
