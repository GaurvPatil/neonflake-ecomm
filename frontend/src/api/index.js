import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const uploadProduct = (formData) => API.post("/neonflake/product" , formData)
export const getAllProduct = () => API.get("/neonflake/product")
export const getSingleProduct = (ID) => API.get(`/neonflake/product/${ID}`)
export const deleteSingleProduct = (ID) => API.delete(`/neonflake/product/${ID}`)
export const updateSingleProduct = (ID , formData) => API.patch(`/neonflake/product/${ID}`, formData)