import { showErr, showSuccess } from "./popup";
import axios from "axios";
const baseUrl = "/api/v1";

const goHome = () =>
  window.setTimeout(() => {
    location.assign("/");
  }, 1000);

export const login = async (email, password) => {
  try {
    const res = await axios.post(baseUrl + "/users/login", { email, password });

    if (res.data.status === "success") location.assign("/");
  } catch (err) {
    showErr(err);
  }
};

export const guestLogin = async () => {
  try {
    const res = await axios.post(baseUrl + "/users/guest");

    if (res.data.status === "success") {
      showSuccess(res);
      goHome();
    }
  } catch (err) {
    showErr(err);
  }
};

export const logout = async () => {
  try {
    const res = await axios.post(baseUrl + "/users/logout");

    if (res.data.status === "success") {
      showSuccess(res);
      goHome();
    }
  } catch (err) {
    showErr(err);
  }
};

export const registerUser = async (userObj) => {
  try {
    const res = await axios.post(baseUrl + "/users/register", userObj);

    if (res.data.status === "success") {
      showSuccess(res);
      goHome();
    }
  } catch (err) {
    showErr(err);
  }
};
