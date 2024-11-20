import axios from "axios";

const registerNewUser = (data) => {
  return axios.post("http://localhost:8080/api/v1/register", data);
};

const loginUser = (valueLogin, passwordLogin) => {
  return axios.post("http://localhost:8080/api/v1/login", {
    valueLogin,
    passwordLogin,
  });
};

const fetchAllUsers = (page, limit) => {
  return axios.get(
    `http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`
  );
};

const deleteUser = (user) => {
  return axios.delete(`http://localhost:8080/api/v1/user/delete`, {
    data: { id: user.id },
  });
};

const fetchAllGroups = () => {
  return axios.get(`http://localhost:8080/api/v1/group/read`);
};

const createNewUser = (userData) => {
  return axios.post("http://localhost:8080/api/v1/user/create", {
    ...userData,
  });
};

const updateCurrentUser = (userData) => {
  return axios.put("http://localhost:8080/api/v1/user/update", { ...userData });
};

export {
  registerNewUser,
  loginUser,
  fetchAllUsers,
  deleteUser,
  fetchAllGroups,
  createNewUser,
  updateCurrentUser,
};
