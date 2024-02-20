const Post = require("../models/postModel");
const aysncHandler = require("../utils/asyncHandler");
const { uploadFileToCloudinary } = require("../utils/cloudinary");

//-------------Create Post-----------------------
const createPost = aysncHandler(async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const postImageLocalPath = req.file?.path;
    console.log(postImageLocalPath);

    //UPLOADING IMAGE FILE IN CLOUDINARY
    const postImage = await uploadFileToCloudinary(postImageLocalPath);
    if (!postImage) {
      res.json({ message: "Image file is not uploaded " });
      return;
    }

    const newPost = new Post({
      title,
      content,
      author,
      image: postImage.url,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
const getSinglePost = aysncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getPost = await Post.findById(id);
    res.json(getPost);
  } catch (error) {
    res.status(200).json({ message: "Cant fetch a post" });
  }
});
const getAllPosts = aysncHandler(async (req, res) => {
  try {
    const getAllPosts = await Post.find().sort({ createdAt: -1 }).limit(4);
    res.json(getAllPosts);
  } catch (error) {
    res.status(400).json({ mesage: "Error Fetching posts" });
  }
});
const updatePost = aysncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const { title, content, author } = req.body;
    const postImageLocalPath = req.file?.path;
    // Use optional chaining to avoid errors if no image is provided

    //UPLOADING IMAGE FILE IN CLOUDINARY
    const postImage = await uploadFileToCloudinary(postImageLocalPath);
    if (!postImage) {
      res.json({ message: "Image file is not uploaded " });
      return;
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, author, image: postImage.url },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: "Post updated succesfully" });
  }
});
const deletePost = aysncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted succesfully" });
  } catch (error) {
    res.status(400).json({ message: "Unable to delete post" });
  }
});

module.exports = {
  createPost,
  getSinglePost,
  getAllPosts,
  updatePost,
  deletePost,
};
