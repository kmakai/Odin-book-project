import axios from "axios";
const baseUrl = "api/v1";

export const login = async (email, password) => {
  try {
    const res = await axios.post(baseUrl + "/users/login", { email, password });
    console.log(res.data);

    if (res.data.status === "success") location.assign("/");
  } catch (err) {
    console.log(err.response.data);
  }
};
