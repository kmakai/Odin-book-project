import axios from "axios";
const baseUrl = "/api/v1";

export const submitPost = async (postObj) => {
  try {
    const res = await axios.post(baseUrl + "/posts", postObj);
    if (res.data.status === "success") location.reload();
  } catch (err) {
    console.log(err.response.data);
  }
};

export const postLikes = async (postObj) => {
  try {
    const res = await axios.patch(baseUrl + "/posts/likes", postObj);
    if (res.data.status === "success") location.reload();
  } catch (err) {
    console.log(err.response.data);
  }
};

export const submitComment = async (commentObj) => {
  try {
    console.log(commentObj);
    const res = await axios.post(baseUrl + "/comments", commentObj);
    if (res.data.status === "success") location.reload();
  } catch (err) {
    console.log(err.response.data);
  }
};

export const friendHandler = async (id, request) => {
  try {
    const res = await axios.patch(baseUrl + `/users/${id}/${request}-friend`);
    if (res.data.status === "success") location.reload();
  } catch (err) {
    console.log(err.response.data);
  }
};
