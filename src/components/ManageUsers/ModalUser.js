import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchAllGroups } from "../../services/userService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function ModalUser({ title, handleClose }) {
  const [user, setUser] = useState({
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    gender: "",
    address: "",
    roles: [],
  });
  const [checkValidEmail, setCheckValidEmail] = useState(true);
  const [checkValidPhoneNumber, setCheckValidPhoneNumber] = useState(true);
  const [checkValidUsername, setCheckValidUsername] = useState(true);
  const [checkValidPassword, setCheckValidPassword] = useState(true);
  const [checkValidAddress, setCheckValidAddress] = useState(true);
  const [checkValidRoles, setCheckValidRoles] = useState(true);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const response = await fetchAllGroups();
    if (response && response.data && response.data.EC === 0) {
      setUserGroups(response.data.DT);
    } else {
      toast.error(response.data.EM);
    }
  };
  return (
    <>
      <Modal show={true} onHide={handleClose} size="lg" className="modal-user">
        <Modal.Header closeButton>
          <Modal.Title>
            <span>{title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-md-6 form-group">
              <label>
                Email address &#40;<span className="text-danger">*</span>&#41; :
              </label>
              <input className="form-control" type="email" />
            </div>
            <div className="col-12 col-md-6 form-group">
              <label>
                PhoneNumber &#40;<span className="text-danger">*</span>&#41; :
              </label>
              <input className="form-control" type="text" />
            </div>
            <div className="col-12 col-md-6 form-group">
              <label>
                Username &#40;<span className="text-danger">*</span>&#41; :
              </label>
              <input className="form-control" type="text" />
            </div>
            <div className="col-12 col-md-6 form-group">
              <label>
                Password &#40;<span className="text-danger">*</span>&#41; :
              </label>
              <input className="form-control" type="password" />
            </div>
            <div className="col-12 form-group">
              <label>Address:</label>
              <input className="form-control" type="text" />
            </div>
            <div className="col-12 col-md-6 form-group">
              <label>Gender:</label>
              <select className="form-select">
                <option value="male">Male</option>
                <option value="feMale">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-12 col-md-6 form-group">
              <label>
                Role &#40;<span className="text-danger">*</span>&#41; :
              </label>
              <select className="form-select">
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
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUser;
