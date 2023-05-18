import { toast } from "react-toastify";

export const toastUtils = (status, message) => {
  if (status === "success") {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "light",
    });
  } else if (status === "error") {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    console.error(
      'La fonction toastUtils n\'acccepte que "success" ou "error" comme argument'
    );
  }
}
