import loginServices from "./loginServices.js";
const loginUser = async (req, res, next) => {
  try {
    const newlogin = await loginServices.loginUser(req, res);
    res.status(200).json(newlogin);
  } catch (error) {
    next(error);
  }
};
const logoutUser = async (req, res, next) => {
  try {
    const newlogin = await loginServices.logoutUser(req, res);
    res.status(200).json(newlogin);
  } catch (error) {
    next(error);
  }
};
export default {
  loginUser,
  logoutUser,
};
