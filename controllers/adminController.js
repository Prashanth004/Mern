const Post = require("../model/post");
const User = require("../model/user");
const allowPost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findOneAndUpdate({ _id: id }, { $set: { allowed: true } });
    res.status(200).send({
      result: 1,
      message: "Allowed the post",
      payload: {},
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).send({
      result: 0,
      message: "Something went wrong",
      payload: { error },
    });
  }
};
const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findOneAndUpdate({ _id: id }, { $set: { blocked: true } });
    res.status(200).send({
      result: 1,
      message: "Blocked the user",
      payload: {},
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).send({
      result: 0,
      message: "Something went wrong",
      payload: { error },
    });
  }
};

const unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id : ", id);
    await User.findOneAndUpdate({ _id: id }, { $set: { blocked: false } });
    res.status(200).send({
      result: 1,
      message: "Unbocked the user",
      payload: {},
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).send({
      result: 0,
      message: "Something went wrong",
      payload: { error },
    });
  }
};

module.exports = {
  allowPost,
  blockUser,
  unblockUser,
};
