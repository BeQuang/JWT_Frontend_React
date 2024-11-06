/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { fetchAllUsers } from "../../services/userService";

function Users() {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let response = await fetchAllUsers();

    if (response && response.data && response.data.EC === 0) {
      setListUsers(response.data.DT);
      console.log(response.data.DT);
    }
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

          <div className="user-footer">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#">
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
