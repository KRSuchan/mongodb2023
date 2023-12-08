const axios = require("axios");
console.log("client is running...");

const getPosts = async () => {
  const {
    data: { blogs },
  } = await axios.get("http://localhost:3000/blog");
  console.log(blogs[0]);

  const blogWithMemberjAndComment = await Promise.all(
    blogs.map(async blog => {
      const resMember = await axios.get(
        `http://localhost:3000/member/${blog.member}`
      );
      const resComment = await axios.get(
        `http://localhost:3000/blog/${blog._id}/comment`
      );
      blog.member = resMember.data.member;
      blog.comment = resComment.data.comments;
      return blog;
    })
  );
  console.log(blogWithMemberjAndComment[0]);
};

getPosts();
