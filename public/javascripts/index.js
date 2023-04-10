import { login, logout, registerUser, guestLogin } from "./loginhandlers";
import {
  submitPost,
  submitComment,
  friendHandler,
  postLikes,
} from "./posthandlers";

const loginForm = document.querySelector(".loginform");
const logoutBtn = document.querySelector(".log-out");
const guestBtn = document.querySelector(".guest-btn");
const postForm = document.querySelector(".post-form");
const commentForms = document.querySelectorAll(".comment-form");
const registerForm = document.querySelector(".register-form");
const likeForms = document.querySelectorAll(".likes-form");

registerForm &&
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordconfirm").value;

    if (password !== passwordConfirm) return alert("password need confirm");

    registerUser({ name, email, password, passwordConfirm });
  });

loginForm &&
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password);
  });

guestBtn && guestBtn.addEventListener("click", guestLogin);

logoutBtn && logoutBtn.addEventListener("click", logout);

postForm &&
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const postContent = document.getElementById("postContent").value;
    const user = document.getElementById("user").value;
    submitPost({ postContent, user });
  });

likeForms &&
  likeForms.forEach((form) => {
    form.addEventListener("click", (e) => {
      let target = e.target.closest(".likes-form");
      // e.preventDefault();
      const postId = target.querySelector("#postid").value;
      const userId = target.querySelector("#userid").value;
      postLikes({ postId, userId });
    });
  });

commentForms &&
  commentForms.forEach((form) =>
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const post = e.target.querySelector("#postid").value;
      const user = e.target.querySelector("#userid").value;
      const commentText = e.target.querySelector("#comment-text-area").value;
      submitComment({ post, user, text: commentText });
      // console.log(e.target.querySelector("#userid").value);
    })
  );

// friends request handlers
const acceptForms = document.querySelectorAll(".accept-form");

acceptForms &&
  acceptForms.forEach((acceptForm) =>
    acceptForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = e.target.querySelector("#profile-id").value;
      friendHandler(id, "accept");
    })
  );

const rejectForms = document.querySelectorAll(".reject-form");

rejectForms &&
  rejectForms.forEach((rejectForm) =>
    rejectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = e.target.querySelector("#profile-id").value;
      friendHandler(id, "reject");
    })
  );

const removeForms = document.querySelectorAll(".remove-form");

removeForms &&
  removeForms.forEach((removeForm) =>
    removeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = e.target.querySelector("#profile-id").value;
      friendHandler(id, "remove");
    })
  );

const reqForms = document.querySelectorAll(".req-form");

reqForms &&
  reqForms.forEach((reqForm) =>
    reqForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = e.target.querySelector("#profile-id").value;
      friendHandler(id, "request");
    })
  );
