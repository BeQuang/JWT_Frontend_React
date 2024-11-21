/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { fetchAllUsers, deleteUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import "./Users.scss";

function Users() {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // DataModal Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState({});

  // DataModal User
  const [actionModalUser, setActionModalUser] = useState("");
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [dataModalUser, setDataModalUser] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    let response = await fetchAllUsers(currentPage, currentLimit);

    if (response && response.EC === 0) {
      setTotalPages(response.DT.totalPages);
      setListUsers(response.DT.users);
    }
  };

  // Invoke when user click to request another page.
  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleRefresh = async () => {
    setCurrentPage(1);
    await fetchUsers();
  };

  const handleDeleteUser = (user) => {
    setDataModalDelete(user);
    setIsShowModalDelete(true);
  };

  const handleEditUser = (user) => {
    setDataModalUser(user);
    setActionModalUser("UPDATE");
    setIsShowModalUser(true);
  };

  const handleAddNewUser = () => {
    setActionModalUser("CREATE");
    setIsShowModalUser(true);
  };

  const handleClose = (user) => {
    setDataModalDelete({});
    setIsShowModalDelete(false);
  };

  const onHideModalUser = async () => {
    setIsShowModalUser(false);
    setDataModalUser({});
    await fetchUsers();
  };

  const confirmDeleteUser = async () => {
    let response = await deleteUser(dataModalDelete);
    console.log("check response >>>> ", response);
    if (response && response.EC === 0) {
      toast.success(response.EM);
      await fetchUsers();
      setIsShowModalDelete(false);
    }
  };

  return (
    <>
      <div className="manage-user-container">
        <div className="container">
          <div className="row">
            <div className="user-header">
              <div className="title my-4">
                <h3>Manage Users</h3>
              </div>
              <div className="action mb-4">
                <button
                  className="btn btn-success refresh"
                  onClick={() => handleRefresh()}
                >
                  <i className="fa fa-refresh" />
                  Refresh
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddNewUser()}
                >
                  <i className="fa fa-plus"></i>
                  Add new user
                </button>
              </div>
            </div>

            <div className="user-body mb-2">
              <table className="table table-hover table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">NO</th>
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listUsers && listUsers.length > 0 ? (
                    <>
                      {listUsers.map((user, index) => {
                        return (
                          <tr key={`row-${index + 1}`}>
                            <td>
                              {(currentPage - 1) * currentLimit + index + 1}
                            </td>
                            <td>{user.id}</td>
                            <td>{user?.username}</td>
                            <td>{user?.email}</td>
                            <td>{user?.phone}</td>
                            <td>{user?.Group?.name}</td>
                            <td>
                              <span
                                title="Edit"
                                className="edit"
                                onClick={() => handleEditUser(user)}
                              >
                                <i className="fa fa-pencil" />
                              </span>
                              <span
                                title="Delete"
                                className="delete"
                                onClick={() => handleDeleteUser(user)}
                              >
                                <i className="fa fa-trash" />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <td>Not found user</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {totalPages > 0 && (
              <div className="user-footer d-flex justify-content-center">
                <ReactPaginate
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={totalPages}
                  previousLabel="< previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                  forcePage={currentPage - 1}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        user={dataModalDelete}
      />

      <ModalUser
        show={isShowModalUser}
        handleClose={onHideModalUser}
        action={actionModalUser}
        dataModalUser={dataModalUser}
      />
    </>
  );
}

export default Users;
