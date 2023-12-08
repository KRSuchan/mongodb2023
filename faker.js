const faker = require("faker");
const mongoose = require("mongoose");
const { Member, Blog, Comment } = require("./models");

generateDummyData = async (nMember, nBlogPerMember, nCommentPerMember) => {
  const members = [];
  const blogs = [];
  const comments = [];
  const db = mongoose.connection.db;

  console.log("drop all collections");
  // drop all objects; <<start>>
  const collections = await db.listCollections().toArray();
  collections
    .map(collection => collection.name) // collection의 ["members", "blogs", "comments"]
    .forEach(async collectionName => {
      db.dropCollection(collectionName);
    });
  // drop all objects; <<end>>
  console.log("Generating Dummy data");
  for (let i = 0; i < nMember; i++) {
    members.push(
      new Member({
        name: faker.internet.userName() + parseInt(Math.random() * 100),
        age: 20 + parseInt(Math.random() * 50),
        address: {
          city: faker.address.city(),
          street: faker.address.streetName(),
          zipCode: faker.address.zipCode(),
        },
      })
    );
  }

  members.map(async member => {
    for (let i = 0; i < nBlogPerMember; i++) {
      blogs.push(
        new Blog({
          title: faker.lorem.words(),
          contents: faker.lorem.paragraph(),
          member,
          // comments: [],
        })
      );
    }
  });
  members.map(member => {
    // 회원이 특정 중복가능한 블로그에 댓글을 5개쓴다.
    for (let i = 0; i < nCommentPerMember; i++) {
      let index = Math.floor(Math.random() * blogs.length); // blogs에 저장된 임의의 블로그를 지정하는.
      comments.push(
        new Comment({
          content: faker.lorem.sentence(),
          member: member,
          blog: blogs[index]._id,
        })
      );
    }
  });
  // comments.forEach(comments => {
  //   blogs.forEach(blog => {
  //     if (comments.blog._id === blog._id) {
  //       blog.comments.push(comments);
  //     }
  //   });
  // });
  console.log("dummpy data inserting....");
  await Member.insertMany(members);
  await Blog.insertMany(blogs);
  await Comment.insertMany(comments);
};

module.exports = { generateDummyData };
