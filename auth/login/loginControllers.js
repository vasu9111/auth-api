import loginServices from "./loginServices.js";
const loginUser = async (req, res, next) => {
  try {
    const tokenData = await loginServices.loginUser(req.body);
    req.session.accessToken = tokenData.accessToken;
    req.session.refreshToken = tokenData.refreshToken;
    res.status(200).json(tokenData);
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
