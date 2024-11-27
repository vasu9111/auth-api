import loginServices from "./loginServices.js";
const loginuser = async (req, res) => {
  try {
    const newlogin = await loginServices.loginuser(req, res);
    res.status(200).json(newlogin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  loginuser,
};
