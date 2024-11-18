/* eslint-disable no-unused-vars */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchAllGroups, createNewUser } from "../../services/userService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { validateCreateNewUser } from "../Validate/Validate";

function ModalUser({ show, handleClose }) {
  const userDataDefault = {
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    gender: "",
    address: "",
    role: "",
  };

  const checkValidDefault = {
    validUsername: true,
    validEmail: true,
    validPassword: true,
    validPhoneNumber: true,
  };

  const [userData, setUserData] = useState(userDataDefault);
  const [objCheckValid, setObjectCheckValid] = useState(checkValidDefault);

  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const response = await fetchAllGroups();
    if (response && response.data && response.data.EC === 0) {
      setUserGroups(response.data.DT);
      if (response.data.DT && response.data.DT.length > 0) {
        let groups = response.data.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(response.data.EM);
    }
  };

  const handleOnchangeInput = (value, name) => {
    let _userDate = _.cloneDeep(userData);
    _userDate[name] = value;
    setUserData(_userDate);
  };

  const handleCreateNewUser = async () => {
    let checkValidInput = validateCreateNewUser(userData, setObjectCheckValid);

    if (checkValidInput) {
      let dataCreateNewUser = {
        ...userData,
        phone: userData["phoneNumber"],
        sex: userData["gender"],
        groupId: userData["role"],
      };

      let response = await createNewUser(dataCreateNewUser);

      if (response && response.data && +response.data.EC === 0) {
        toast.success(response.data.EM);
        handleClose();
        setUserData({ ...userDataDefault, group: userGroups[0].id });
      } else {
        toast.error(response.data.EM);
      }
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" className="modal-user">
        <Modal.Header closeButton>
          <Modal.Title>
            <span>Create new user</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-md-6 form-group">
              <label>
                Email address &#40;<span className="text-danger">*</span>&#41; :
              </label>
              <input
                className={
                  objCheckValid.validEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="email"
                value={userData.email}
                onChange={(e) => handleOnchangeInput(e.target.value, "email")}
              />
            </div>
            <div className="col-12 col-md-6 form-group">
              <label>
                PhoneNumber &#40;<span className="text-danger">*</span>&#41; :
              </label>
              <input
                className={
                  objCheckValid.validPhoneNumber
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={userData.phoneNumber}
                onChange={(e) =>
                  handleOnchangeInput(e.target.value, "phoneNumber")
                }
              />
            </div>
            <div className="col-12 col-md-6 form-group">
              <label>
                Username &#40;<span className="text-danger">*</span>&#41; :
              </label>
              <input
                className={
                  objCheckValid.validUsername
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={userData.username}
                onChange={(e) =>
                  handleOnchangeInput(e.target.value, "username")
                }
              />
            </div>
            <div className="col-12 col-md-6 form-group">
              <label>
                Password &#40;<span className="text-danger">*</span>&#41; :
              </label>
              <input
                className={
                  objCheckValid.validPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="password"
                value={userData.password}
                onChange={(e) =>
                  handleOnchangeInput(e.target.value, "password")
                }
              />
            </div>
            <div className="col-12 form-group">
              <label>Address:</label>
              <input
                className="form-control"
                type="text"
                value={userData.address}
                onChange={(e) => handleOnchangeInput(e.target.value, "address")}
              />
            </div>
            <div className="col-12 col-md-6 form-group">
              <label>Gender:</label>
              <select
                className="form-select"
                onChange={(e) => handleOnchangeInput(e.target.value, "gender")}
              >
                <option value="male">Male</option>
                <option value="feMale">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-12 col-md-6 form-group">
              <label>
                Role &#40;<span className="text-danger">*</span>&#41; :
              </label>
              <select
                className="form-select"
                onChange={(e) => handleOnchangeInput(e.target.value, "role")}
              >
                {userGroups.length > 0 &&
                  userGroups.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleCreateNewUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUser;
