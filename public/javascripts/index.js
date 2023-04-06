import { login, logout, registerUser } from "./loginhandlers";
import { submitPost, submitComment, friendHandler } from "./posthandlers";

const loginForm = document.querySelector(".loginform");
const logoutBtn = document.querySelector(".log-out");
const postForm = document.querySelector(".post-form");
const commentForms = document.querySelectorAll(".comment-form");
const registerForm = document.querySelector(".register-form");

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

logoutBtn && logoutBtn.addEventListener("click", logout);

postForm &&
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const postContent = document.getElementById("postContent").value;
    const user = document.getElementById("user").value;
    submitPost({ postContent, user });
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

const reqForms = document.querySelectorAll(".req-form");

reqForms &&
  reqForms.forEach((reqForm) =>
    reqForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = e.target.querySelector("#profile-id").value;
      friendHandler(id, "request");
    })
  );
