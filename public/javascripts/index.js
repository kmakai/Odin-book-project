import { login, logout } from "./loginhandlers";

const loginForm = document.querySelector(".loginform");
const logoutBtn = document.querySelector(".log-out");

loginForm &&
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password);
  });

logoutBtn && logoutBtn.addEventListener("click", logout);
