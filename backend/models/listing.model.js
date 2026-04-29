import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    size: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },
    //user part identifying
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", itemSchema);

export default Post;
