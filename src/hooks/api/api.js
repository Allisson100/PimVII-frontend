import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { PATH_AUTH } from "../../routes/paths";
import { AuthContext } from "../../contexts/JWTContext";

const useAxiosInstance = () => {
  const navigate = useNavigate();
  const { initialize } = useContext(AuthContext);

  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.jwt = token;
    }
    return config;
  });

  instance.interceptors.response.use(async (response) => {
    if (response.data.code === "ER460") {
      localStorage.removeItem("accessToken");
      navigate(PATH_AUTH.verify, { state: { email: response.data.email } });
    }
    if (response.data.code === "SS460") {
      localStorage.setItem("accessToken", response.data.jwt);
      await initialize();
      navigate("/auth/login");
    }
    if (response.status === 401) {
      navigate(PATH_AUTH.login);
    }
    return response;
  });

  return instance;
};

const get = async (instance, endpoint, data) => {
  try {
    const response = await instance.get(
      `${process.env.REACT_APP_API_ENDPOINT}${endpoint}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

const post = async (instance, endpoint, data) => {
  try {
    const response = await instance.post(
      `${process.env.REACT_APP_API_ENDPOINT}${endpoint}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

const put = async (instance, endpoint, data) => {
  try {
    const response = await instance.put(
      `${process.env.REACT_APP_API_ENDPOINT}${endpoint}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

const patch = async (instance, endpoint, data) => {
  try {
    const response = await instance.patch(
      `${process.env.REACT_APP_API_ENDPOINT}${endpoint}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

const data = async (instance, endpoint, data) => {
  try {
    const response = await instance.post(
      `${process.env.REACT_APP_API_ENDPOINT}${endpoint}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

const api = {
  useAxiosInstance,
  get,
  post,
  data,
  put,
  patch,
};

export default api;
