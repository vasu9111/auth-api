import registrationServices from "./registrationServices.js";

const userRegistration = async (req, res, next) => {
  try {
    const newRegistration = await registrationServices.userRegister(
      req,
      res,
      next
    );
    res.status(200).json(newRegistration);
  } catch (error) {
    next(error);
  }
};

export default {
  userRegistration,
};
