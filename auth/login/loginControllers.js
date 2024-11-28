import loginServices from "./loginServices.js";
const loginuser = async (req, res, next) => {
  try {
    const newlogin = await loginServices.loginuser(req, res);
    res.status(200).json(newlogin);
  } catch (error) {
    next(error);
  }
};
const logoutuser = async (req, res, next) => {
  try {
    const newlogin = await loginServices.logoutuser(req, res);
    res.status(200).json(newlogin);
  } catch (error) {
    next(error);
  }
};
export default {
  loginuser,
  logoutuser,
};
