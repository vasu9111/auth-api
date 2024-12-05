import privateService from "./private.service.js";
const privateuser = async (req, res, next) => {
  try {
    const userData = await privateService.pageData(req, res);
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};
export default {
  privateuser,
};
