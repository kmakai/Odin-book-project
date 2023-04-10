import { showErr, showSuccess } from "./popup";

import axios from "axios";
const baseUrl = "/api/v1";

const reload = () =>
  window.setTimeout(() => {
    location.reload();
  }, 1000);

export const submitPost = async (postObj) => {
  try {
    const res = await axios.post(baseUrl + "/posts", postObj);
    if (res.data.status === "success") {
      showSuccess(res);
      reload();
    }
  } catch (err) {
    showErr(err);
  }
};

export const postLikes = async (postObj) => {
  try {
    const res = await axios.patch(baseUrl + "/posts/likes", postObj);
    if (res.data.status === "success") {
      showSuccess(res);
      reload();
    }
  } catch (err) {
    showErr(err);
  }
};

export const submitComment = async (commentObj) => {
  try {
    const res = await axios.post(baseUrl + "/comments", commentObj);
    if (res.data.status === "success") {
      showSuccess(res);
      reload();
    }
  } catch (err) {
    showErr(err);
  }
};

export const friendHandler = async (id, request) => {
  try {
    const res = await axios.patch(baseUrl + `/users/${id}/${request}-friend`);
    if (res.data.status === "success") {
      showSuccess(res);
      reload();
    }
  } catch (err) {
    showErr(err);
  }
};
