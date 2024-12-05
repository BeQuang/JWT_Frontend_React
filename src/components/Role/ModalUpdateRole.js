/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { updateCurrentRole } from "../../services/roleService";

function ModalUpdateRole({ show, handleClose, dataModalRole, getAllRoles }) {
  const roleDataDefault = {
    url: "",
    description: "",
  };

  const [roleData, setRoleData] = useState(roleDataDefault);
  const [checkValidUrl, setCheckValidUrl] = useState(false);

  useEffect(() => {
    if (dataModalRole && dataModalRole.url !== "") {
      setCheckValidUrl(true);
    }
    setRoleData({
      ...dataModalRole,
    });
  }, [dataModalRole]);

  const handleOnchangeInput = (value, name) => {
    let _roleData = _.cloneDeep(roleData);
    _roleData[name] = value;
    setRoleData(_roleData);
  };

  const handleUpdateRole = async () => {
    let checkValid = false;
    if (roleData && roleData.url === "") {
      checkValid = false;
    } else {
      checkValid = true;
    }

    if (checkValid) {
      let response = await updateCurrentRole(roleData);

      if (response && +response.EC === 0) {
        setRoleData(roleDataDefault);
        toast.success(response.EM);
        handleCloseModal();
        await getAllRoles();
        setCheckValidUrl(true);
      } else {
        toast.error(response.EM);
      }
    } else {
      setCheckValidUrl(false);
      toast.error("Please fill all required fields.");
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setRoleData(roleDataDefault);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseModal}
        size="lg"
        className="modal-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span>Update Role:</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-md-6 form-group">
              <label>
                Url &#40;<span className="text-danger">*</span>&#41; :
              </label>
              <input
                className={
                  checkValidUrl ? "form-control" : "form-control is-invalid"
                }
                type="text"
                value={roleData.url}
                onChange={(e) => handleOnchangeInput(e.target.value, "url")}
              />
            </div>
            <div className="col-12 col-md-6 form-group">
              <label>
                Description &#40;<span className="text-danger">*</span>&#41; :
              </label>
              <input
                className="form-control"
                type="text"
                value={roleData.description}
                onChange={(e) =>
                  handleOnchangeInput(e.target.value, "description")
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdateRole()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateRole;
