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
    const error = new Error("EMAIL_REQUIRED");
    return next(error);
  } else if (!email.includes("@")) {
    const error = new Error("EMAIL_INVALID");
    return next(error);
  } else {
    const userFound = await userExistingCheck(email);
    if (!userFound) {
      const error = new Error("USER_NOT_FOUND");
      return next(error);
    }
  }
  const userData = await userMdl.findOne({ email });
  if (!password) {
    const error = new Error("PASSWORD_REQUIRE");
    return next(error);
  } else if (!decryptPassword(password, userData.password)) {
    const error = new Error("INVALID_PASSWORD");
    return next(error);
  }
  next();
};

// registation validation
const registationCustomValidation = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) {
    const error = new Error("NAME_REQUIRED");
    return next(error);
  } else if (name.length < 1) {
    const error = new Error("NAME_INVALID");
    return next(error);
  }
  if (!email) {
    const error = new Error("EMAIL_REQUIRED");
    return next(error);
  } else if (!email.includes("@")) {
    const error = new Error("EMAIL_INVALID");
    return next(error);
  } else {
    const emailCheck = await userExistingCheck(email);
    if (emailCheck) {
      const error = new Error("USER_EXIST");
      return next(error);
    }
  }

  if (!password) {
    const error = new Error("PASSWORD_REQUIRED");
    return next(error);
  } else if (password.length < 6 || password.length > 16) {
    const error = new Error("PASSWORD_INVALID");
    return next(error);
  }
  next();
};
export default {
  loginCustomValidation,
  registationCustomValidation,
};
