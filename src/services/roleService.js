import axios from "../setup/axios";

const createRoles = (roles) => {
  return axios.post("/api/v1/role/create", [...roles]);
};

const fetchAllRoles = (page, limit) => {
  return axios.get(`/api/v1/role/read?page=${page}&limit=${limit}`);
};

const fetchAllRoleNotWithPaginate = () => {
  return axios.get("/api/v1/role/read");
};

const updateCurrentRole = (roleData) => {
  return axios.put("/api/v1/role/update", { ...roleData });
};

const deleteRole = (role) => {
  return axios.delete(`/api/v1/role/delete`, {
    data: { id: role.id },
  });
};

const fetchRoleByGroup = (groupId) => {
  return axios.get(`/api/v1/role/by-group/${groupId}`);
};

export {
  createRoles,
  fetchAllRoles,
  updateCurrentRole,
  deleteRole,
  fetchAllRoleNotWithPaginate,
  fetchRoleByGroup,
};
