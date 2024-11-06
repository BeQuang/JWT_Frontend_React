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

const fetchAllUsers = () => {
  return axios.get("http://localhost:8080/api/v1/user/read");
};

export { registerNewUser, loginUser, fetchAllUsers };
