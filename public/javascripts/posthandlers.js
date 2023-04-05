import axios from "axios";
const baseUrl = "api/v1";

export const submitPost = async (postObj) => {
  const res = await axios.post(baseUrl + "/posts", postObj);
  console.log(res.data);
  if (res.data.status === "success")
    window.setTimeout(() => {
      location.assign(location.href);
    }, 1000);
};

export const submitComment = async (commentObj) => {
  const res = await axios.post(baseUrl + "/comments", commentObj);
  console.log(res.data);
  if (res.data.status === "success")
    window.setTimeout(() => {
      location.assign(location.href);
    }, 1000);
};

export const friendHandler = async (id, request) => {
  const res = await axios.patch(baseUrl + `/users/${id}/${request}-friend`);
  console.log(res.data);
  if (res.data.status === "success")
    window.setTimeout(() => {
      location.assign(location.href);
    }, 1000);
};
