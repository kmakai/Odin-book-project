import axios from "axios";
const baseUrl = "/api/v1";

export const submitPost = async (postObj) => {
  const res = await axios.post(baseUrl + "/posts", postObj);
  if (res.data.status === "success") location.reload();
};

export const postLikes = async (postObj) => {
  const res = await axios.patch(baseUrl + "/posts/likes", postObj);
  if (res.data.status === "success") location.reload();
};

export const submitComment = async (commentObj) => {
  console.log(commentObj);
  const res = await axios.post(baseUrl + "/comments", commentObj);
  if (res.data.status === "success") location.reload();
};

export const friendHandler = async (id, request) => {
  try {
    const res = await axios.patch(baseUrl + `/users/${id}/${request}-friend`);
    console.log(res.data);
    if (res.data.status === "success") location.reload();
  } catch (err) {
    console.log(err.response.data);
  }
};
