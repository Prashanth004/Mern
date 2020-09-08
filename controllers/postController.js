const Post = require("../model/post");
const User = require("../model/user");
const addPost = async (req, res) => {
  try {
    const { category, subCategory, text, location, title } = req.body;
    console.log("req.user : ", req.user);
    if (!category || !subCategory || !text || !location)
      return res.status(400).send({
        result: 0,
        message: "parameters missing",
        payload: {},
      });
    const user = await User.findOne({ _id: req.user._id });
    if (user.blocked)
      return res.status(405).send({
        result: 0,
        message: "User blocked",
        payload: {},
      });

    var newPost = new Post({
      userId: req.user._id,
      category,
      subCategory,
      image: req.file.filename,
      text,
      location,
      allowed: false,
      title,
    });
    await newPost.save();
    res.status(200).send({
      result: 1,
      message: "Saved new post",
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
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.remove({ _id: id });
    res.status(500).send({
      result: 0,
      message: "Delete the post",
      payload: {},
    });
  } catch (error) {
    res.status(500).send({
      result: 0,
      message: "Something went wrong",
      payload: { error },
    });
  }
};
const deleteAllPost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.remove({});
    res.status(500).send({
      result: 0,
      message: "Delete the post",
      payload: {},
    });
  } catch (error) {
    res.status(500).send({
      result: 0,
      message: "Something went wrong",
      payload: { error },
    });
  }
};
const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.status(200).send({
      result: 1,
      message: "Got all the posts",
      payload: {
        posts: allPosts,
      },
    });
  } catch (error) {
    res.status(500).send({
      result: 0,
      message: "Something went wrong",
      payload: { error },
    });
  }
};
const getPostBYId = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id });
    res.status(200).send({
      result: 1,
      message: "Got the post",
      payload: {
        posts: post,
      },
    });
  } catch (error) {
    res.status(500).send({
      result: 0,
      message: "Something went wrong",
      payload: { error },
    });
  }
};
const getMyPosts = async (req, res) => {
  try {
    const allMyPosts = await Post.findOne({ userid: req.user._id });
    res.status(200).send({
      result: 1,
      message: "Got all my post",
      payload: {
        posts: poallMyPostsst,
      },
    });
  } catch (error) {
    res.status(500).send({
      result: 0,
      message: "Something went wrong",
      payload: { error },
    });
  }
};

module.exports = {
  addPost,
  deletePost,
  getAllPosts,
  getPostBYId,
  getMyPosts,
  deleteAllPost,
};
