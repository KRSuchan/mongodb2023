const { Schema, model, Types } = require("mongoose");
const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    contents: { type: String, required: true },
    member: { type: Types.ObjectId, required: true, ref: "Member" },
  },
  { timestamps: true }
);

BlogSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "blog",
});
BlogSchema.set("toObject", { virtuals: true });
BlogSchema.set("toJSON", { virtuals: true });

const Blog = model("Blog", BlogSchema);
module.exports = { Blog };
