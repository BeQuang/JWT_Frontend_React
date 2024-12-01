// import axios from "axios";
import axios from "../setup/axios";

const registerNewUser = (data) => {
  return axios.post("/api/v1/register", data);
};

const loginUser = (valueLogin, passwordLogin) => {
  return axios.post("/api/v1/login", {
    valueLogin,
    passwordLogin,
  });
};

const fetchAllUsers = (page, limit) => {
  return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (user) => {
  return axios.delete(`/api/v1/user/delete`, {
    data: { id: user.id },
  });
};

const fetchAllGroups = () => {
  return axios.get(`/api/v1/group/read`);
};

const createNewUser = (userData) => {
  return axios.post("/api/v1/user/create", {
    ...userData,
  });
};

const updateCurrentUser = (userData) => {
  return axios.put("/api/v1/user/update", { ...userData });
};

const getUserAccount = () => {
  return axios.get(`/api/v1/account`);
};

export {
  registerNewUser,
  loginUser,
  fetchAllUsers,
  deleteUser,
  fetchAllGroups,
  createNewUser,
  updateCurrentUser,
  getUserAccount,
};
