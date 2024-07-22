import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { id } = req.params;

    const comment = new Comment({
      text,
      postId: id,
      user: req.userId,
    });

    const savedComment = await comment.save();

    await Post.findByIdAndUpdate(
      { _id: id },
      {
        $inc: { commentsCount: 1 },
        $push: { comments: savedComment },
      },
      {
        returnDocument: "after",
      }
    );

    res.json(savedComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while adding comment" });
  }
};
