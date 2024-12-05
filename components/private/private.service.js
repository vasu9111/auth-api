import userMdl from "../../schema/userMdl.js";
const pageData = async (req, res) => {
  const foundUser = await userMdl.findOne({ _id: req.user._id });
  const userProfile = {
    name: foundUser.name,
    email: foundUser.email,
    registeredAt: foundUser.registeredAt,
  };
  res.status(200).json(userProfile);
};
export default {
  pageData,
};
