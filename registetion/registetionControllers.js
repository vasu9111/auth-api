import registetionServices from "./registetionServices.js";

const postregistetion = async (req, res) => {
  try {
    const newregistetion = await registetionServices.postuser(req, res);
    res.status(200).json(newregistetion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  postregistetion,
};
