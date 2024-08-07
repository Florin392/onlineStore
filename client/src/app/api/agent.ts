import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../../AppRoutes";
import { PaginatedResponse } from "../models/pagination";
import { User } from "../models/users";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 300));

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

// helper
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const userJson = localStorage.getItem("user");
  const user = userJson && (JSON.parse(userJson) as User);
  if (user) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (import.meta.env.DEV) await sleep();
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) modelStateErrors.push(data.errors[key]);
          }
          // return errors individually in string
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 403:
        toast.error("You are not allowed to to that!");
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then(responseBody),
  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then(responseBody),
};

function createFormData(item: any) {
  const formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  return formData;
}

const Admin = {
  createProduct: (product: any) =>
    requests.post("products", createFormData(product)),
  updateProduct: (product: any) =>
    requests.put("products", createFormData(product)),
  deleteProduct: (id: number) => requests.delete(`products/${id}`),
};

const Catalog = {
  list: (params: URLSearchParams) => requests.get("products", params),
  details: (id: number) => requests.get(`products/${id}`),
  fetchFilters: () => requests.get("products/filters"),
  fetchCategories: () => requests.get("products/categories"),
};

const Errors = {
  get400Error: () => requests.get("errors/bad-request"),
  get401Error: () => requests.get("errors/unauthorised"),
  get404Error: () => requests.get("errors/not-found"),
  get500Error: () => requests.get("errors/server-error"),
  getValidationError: () => requests.get("errors/validation-error"),
};

const Basket = {
  get: () => requests.get("basket"),
  addItem: (productId: number, quantity = 1) =>
    requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const Account = {
  login: (values: any) => requests.post("account/login", values),
  register: (values: any) => requests.post("account/register", values),
  currentUser: () => requests.get("account/currentUser"),
  fetchAddress: () => requests.get("account/savedAddress"),
  saveAddress: (address: any) => requests.post("account/saveAddress", address),
};

const Orders = {
  list: () => requests.get("orders"),
  fetch: (id: number) => requests.get(`orders/${id}`),
  create: (values: any) => requests.post("orders", values),
};
const Payments = {
  createPaymentIntent: () => requests.post("payments", {}),
};

const agent = {
  Catalog,
  Errors,
  Basket,
  Account,
  Orders,
  Payments,
  Admin,
};

export default agent;
