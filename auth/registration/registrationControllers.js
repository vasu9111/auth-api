import registrationServices from "./registrationServices.js";

const registerUser = async (req, res, next) => {
  try {
    const tokenData = await registrationServices.userRegister(req.body);
    req.session.accessToken = tokenData.accessToken;
    req.session.refreshToken = tokenData.refreshToken;
    res.status(200).json(tokenData);
  } catch (error) {
    next(error);
  }
};

export default {
  registerUser,
};
