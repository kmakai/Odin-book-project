export const showErr = (err) => {
  return Toastify({
    text: err.response.data.message,
    duration: 3000,
    style: {
      background: "linear-gradient(to right, #ef4444, #f87171)",
    },
  }).showToast();
};

export const showSuccess = (res) => {
  return Toastify({
    text: res.data.message,
    duration: 1000,
  }).showToast();
};
