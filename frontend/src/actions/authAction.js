import * as api from "../api/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (data, type) => {
  switch (type) {
    case 404:
      toast.error(data, {
        autoClose: 2000,
      });
      break;

    case 400:
      toast.warn(data, {
        autoClose: 2000,
      });
      break;

    case 406:
      toast.warn(data, {
        autoClose: 2000,
      });
      break;

    case 500:
      toast.error(data, {
        autoClose: 2000,
      });
      break;

    default:
      console.log("");
  }
};

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: "AUTH", data });
   
    if (data.message === "admin") {
      try {
        history("/adminhome", { replace: true });
      } catch (error) {
        console.log(error);
      }
    } else {
      const notify = () =>
        toast.success("Welcome Back !", {
          autoClose: 2000,
        });
      notify();

      history("/", { replace: true });
      window.location.reload(false);
    }
  } catch (err) {
    switch (err.response.status) {
      case 404:
        notify(err.response.data.message, 404);
        break;
      case 400:
        notify(err.response.data.message, 400);
        break;

      case 500:
        notify(err.response.data.message, 500);
        break;

      default:
        console.log("");
        break;
    }
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: "AUTH", data });

    const notify = () =>
      toast.success("Welcome to our community", {
        autoClose: 2000,
      });

    notify();

    history("/", { replace: true });
    window.location.reload(false);
  } catch (err) {
    switch (err.response.status) {
      case 404:
        notify(err.response.data.message, 404);
        break;
      case 400:
        notify(err.response.data.message, 400);
        break;

      case 406:
        notify(err.response.data.message, 406);
        break;

      case 500:
        notify(err.response.data.message, 500);
        break;

      default:
        console.log("");
        break;
    }
  }
};
<ToastContainer />;
