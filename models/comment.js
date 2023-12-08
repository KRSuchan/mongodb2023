const { Schema, model, Types } = require("mongoose");

const CommentSchema = new Schema({
  content: { type: String, required: true },
  member: { type: Types.ObjectId, required: true, ref: "Member" },
  blog: { type: Types.ObjectId, required: true, ref: "Blog" },
});
const Comment = model("Comment", CommentSchema);
module.exports = { Comment };
