import { login } from "./loginhandlers";

const loginForm = document.querySelector(".loginform");

loginForm &&
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password);
  });
