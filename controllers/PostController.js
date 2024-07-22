import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user").exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while getting all posts" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    ).populate("user");

    if (!doc) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while getting post" });
  }
};

export const createPost = async (req, res) => {
  try {
    const doc = new Post({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      comments: req.body.comments,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while creating post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletion = await Post.findOneAndDelete({ _id: postId });

    if (!deletion) {
      return res
        .status(404)
        .json({ message: "No such post or error deleting post" });
    }

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred while deleting your post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedPost = await Post.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while updating post" });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const post = await Post.find().limit(5).exec();

    const tags = post
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while getting tags" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const post = await Post.find().populate("user").exec();

    const comments = post.map((obj) => obj.comments).flat();

    res.json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while getting comments" });
  }
};
