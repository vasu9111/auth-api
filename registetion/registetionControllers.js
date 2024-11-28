import registetionServices from "./registetionServices.js";

const postregistetion = async (req, res, next) => {
  try {
    const newregistetion = await registetionServices.postuser(req, res, next);
    res.status(200).json(newregistetion);
  } catch (error) {
    next(error);
  }
};

export default {
  postregistetion,
};
