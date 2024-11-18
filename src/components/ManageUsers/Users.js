/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { fetchAllUsers } from "../../services/userService";
import ReactPaginate from "react-paginate";

function Users() {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    let response = await fetchAllUsers(currentPage, currentLimit);

    if (response && response.data && response.data.EC === 0) {
      console.log(response.data.DT);

      setTotalPages(response.data.DT.totalPages);
      setListUsers(response.data.DT.users);
    }
  };

  // Invoke when user click to request another page.
  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  return (
    <div className="manage-user-container">
      <div className="container">
        <div className="row">
          <div className="user-header">
            <div className="title">
              <h3>Table Users</h3>
            </div>
            <div className="action">
              <button className="btn btn-success">Refresh</button>
              <button className="btn btn-primary">Add new user</button>
            </div>
          </div>

          <div className="user-body">
            <table className="table table-hover table-bordered table-striped">
              <thead>
                <tr>
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
                          <th scope="row">{user.id}</th>
                          <td>{user?.username}</td>
                          <td>{user?.email}</td>
                          <td>{user?.phone}</td>
                          <td>{user?.Group?.name}</td>
                          <td>
                            <button className="btn btn-warning">Edit</button>
                            <button className="btn btn-danger">Delete</button>
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
            <div className="user-footer">
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
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
