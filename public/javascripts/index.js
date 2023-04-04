import { login, logout } from "./loginhandlers";
import { submitPost } from "./posthandlers";

const loginForm = document.querySelector(".loginform");
const logoutBtn = document.querySelector(".log-out");
const postForm = document.querySelector(".post-form");

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
