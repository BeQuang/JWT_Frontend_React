/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import ReactPaginate from "react-paginate";
import { deleteRole, fetchAllRoles } from "../../services/roleService";
import { toast } from "react-toastify";

const TableRole = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getAllRoles();
  }, [currentPage]);

  useImperativeHandle(ref, () => ({
    fetchListRolesAgain() {
      getAllRoles();
    },
  }));

  const getAllRoles = async () => {
    let data = await fetchAllRoles(currentPage, currentLimit);

    if (data && data.EC === 0) {
      setTotalPages(data.DT.totalPages);
      setListRoles(data.DT.roles);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  // const handleEditUser = (role) => {};

  const handleDeleteRole = async (role) => {
    let data = await deleteRole(role);
    console.log(role);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      await getAllRoles();
    }
  };
  return (
    <>
      <div className="mb-2">
        <table className="table table-hover table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Url</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listRoles && listRoles.length > 0 ? (
              <>
                {listRoles.map((role, index) => {
                  return (
                    <tr key={`row-${index + 1}`}>
                      <td>{role.id}</td>
                      <td>{role?.url}</td>
                      <td>{role?.description}</td>
                      <td>
                        {/* <span
                          title="Edit"
                          className="edit"
                          onClick={() => handleEditUser(role)}
                        >
                          <i className="fa fa-pencil" />
                        </span> */}
                        <span
                          title="Delete"
                          className="delete"
                          onClick={() => handleDeleteRole(role)}
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
                <td colSpan={4}>Not found user</td>
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
    </>
  );
});

export default TableRole;
