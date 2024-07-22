import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    text: { type: Array, required: true },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comments", CommentSchema);
