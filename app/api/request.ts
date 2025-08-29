import axios, { AxiosError, AxiosResponse } from "axios";
axios.defaults.baseURL = "https://localhost:7074/api/";
axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log("error interceptor");
    if (error.response?.status === 401) {
      window.location.href = "/unauthorized";
    }
    return Promise.reject(error);
  }
);
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const anonToken = localStorage.getItem("anonToken");

    if (config.headers) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else if (anonToken) {
        config.headers.Authorization = `Bearer ${anonToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
const getHeaders = (mediaType?: string) => {
  let headers = { "Content-Type": "application/json" };

  if (mediaType === "multipart") {
    headers = { "Content-Type": "multipart/form-data" };
  } else if (mediaType === "text") {
    headers = { "Content-Type": "text/plain" };
  } else if (mediaType === "xml") {
    headers = { "Content-Type": "application/xml" };
  }

  return headers;
};
const queries = {
  get: (url: string, mediaType?: string) =>
    axios
      .get(url, { headers: getHeaders(mediaType) })
      .then((response: AxiosResponse) => response.data),
  post: (url: string, body: { values: any }, mediaType?: string) =>
    axios
      .post(url, body, { headers: getHeaders(mediaType) })
      .then((response: AxiosResponse) => response.data),
  put: (url: string, body: { values?: any }, mediaType?: string) =>
    axios
      .put(url, body, { headers: getHeaders(mediaType) })
      .then((response: AxiosResponse) => response.data),
  delete: (url: string, mediaType?: string) =>
    axios
      .delete(url, { headers: getHeaders(mediaType) })
      .then((response: AxiosResponse) => response.data),
};

const Account = {
  register: (values: any) => queries.post("account/register", values),
  login: (values: any) => queries.post("account/login", values),
  forgotPassword: (values: any) =>
    queries.post("account/forgot-password", values),
  resetPassword: (values: any) =>
    queries.post("account/reset-password", values),
};

const Todo = {
  getTodos: () => queries.get("todo"),
  addTodo: (values: any) => queries.post("todo", values),
  updateTodo: (id: number, values: any) => queries.put(`todo/${id}`, values),
  deleteTodo: (id: number) => queries.delete(`todo/delete/${id}`),
  completeTodo: (id: number) => queries.put(`todo/complete/${id}`, {}),
};

const request = {
  Account,
  Todo,
};
export default request;
