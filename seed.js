require("dotenv").config();

const { faker } = require("@faker-js/faker");
const User = require("./models/userModel");
const Post = require("./models/postModel");
const Comment = require("./models/commentModel");
const bcrypt = require("bcryptjs");
const connectDB = require("./DB/db");

const seedUsers = async (n) => {
  const usersArr = [];
  for (let i = 0; i < n; i++) {
    const user = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      photo: faker.image.avatar(),
      password: "pass1234",
    };

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    const createdUser = await User.create(user);
    usersArr.push(createdUser);
  }

  console.log("Users created");
  return usersArr;
};

const createPosts = async (users) => {
  const postsArr = [];
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < 3; j++) {
      const post = {
        postContent: faker.lorem.paragraph(),
        user: users[i].id,
        imgUrl: i % 3 ? faker.image.city() : "",
      };

      const createdPost = await Post.create(post);
      postsArr.push(createdPost);
    }
  }

  console.log("completed posts");
  return postsArr;
};

const seedComments = async (usersarr, postsarr) => {
  const posts = postsarr.map((post) => post.id);
  const users = usersarr.map((user) => user.id);

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < posts.length; j++) {
      const comment = {
        post: posts[j],
        user: users[i],
        text: faker.lorem.sentence(),
      };

      await Comment.create(comment);
    }
  }
  console.log("comments seeded");
};

const runSeed = async (numusers) => {
  await connectDB();

  const users = await seedUsers(numusers);
  const posts = await createPosts(users);
  await seedComments(users, posts);

  console.log("Seed completed");
};

module.exports = runSeed;
