/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateRegister } from "../Validate/Validate";
import { registerNewUser } from "../../services/userService";
import { toast } from "react-toastify";

function Register() {
  let navigate = useNavigate();

  const [dataRegister, setDataRegister] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    address: "",
    phoneNumber: "",
  });

  const [objCheckValid, setObjectCheckValid] = useState({
    validUsername: true,
    validEmail: true,
    validPassword: true,
    validConfirmPassword: true,
    validGender: true,
    validAddress: true,
    validPhoneNumber: true,
  });

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = async () => {
    let checkValidInput = validateRegister(dataRegister, setObjectCheckValid);

    if (checkValidInput) {
      let response = await registerNewUser(dataRegister);
      if (response && response.data && +response.data.EC === 0) {
        toast.success(response.data.EM);
        navigate("/login");
      } else {
        toast.error(response.data.EM);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="container pb-5">
        <div className="row d-flex justify-content-center">
          <div className="content-left col-12 d-flex justify-content-center py-3">
            <img
              className="brand w-25"
              src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
              alt="Facebook"
            />
          </div>
          <div className="form bg-white pt-2 col-12 col-md-8 col-xl-4">
            <div className="d-flex flex-column align-items-center pt-3">
              <h2>Create a new account</h2>
              <span>It's quick and easy.</span>
            </div>
            <hr />
            <form className="d-flex flex-column align-items-center">
              <div className="form-group">
                <label for="username">Username:</label>
                <input
                  type="text"
                  className={
                    objCheckValid.validUsername
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  id="username"
                  placeholder="Enter username"
                  value={dataRegister.username}
                  onChange={(e) =>
                    setDataRegister((prevState) => ({
                      ...prevState,
                      username: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label for="email">Email:</label>
                <input
                  type="email"
                  className={
                    objCheckValid.validEmail
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  id="email"
                  placeholder="Enter email"
                  value={dataRegister.email}
                  onChange={(e) =>
                    setDataRegister((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label for="password">Password:</label>
                <input
                  type="password"
                  className={
                    objCheckValid.validPassword
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  id="password"
                  placeholder="Enter password"
                  value={dataRegister.password}
                  onChange={(e) =>
                    setDataRegister((prevState) => ({
                      ...prevState,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label for="confirm">Confirm Password:</label>
                <input
                  type="password"
                  className={
                    objCheckValid.validConfirmPassword
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  id="confirm"
                  placeholder="Confirm-Password"
                  value={dataRegister.confirmPassword}
                  onChange={(e) =>
                    setDataRegister((prevState) => ({
                      ...prevState,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group d-flex justify-content-between py-2">
                <label>Gender:</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="Male"
                    value={dataRegister.gender}
                    onChange={(e) =>
                      setDataRegister((prevState) => ({
                        ...prevState,
                        gender: "male",
                      }))
                    }
                  />
                  <label className="form-check-label" for="Male">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="FeMale"
                    value={dataRegister.gender}
                    onChange={(e) =>
                      setDataRegister((prevState) => ({
                        ...prevState,
                        gender: "feMale",
                      }))
                    }
                  />
                  <label className="form-check-label" for="FeMale">
                    FeMale
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="Other"
                    value={dataRegister.gender}
                    onChange={(e) =>
                      setDataRegister((prevState) => ({
                        ...prevState,
                        gender: "other",
                      }))
                    }
                  />
                  <label className="form-check-label" for="Other">
                    Other
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label for="address">Address:</label>
                <input
                  type="text"
                  className={
                    objCheckValid.validAddress
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  id="address"
                  placeholder="Enter address"
                  value={dataRegister.address}
                  onChange={(e) =>
                    setDataRegister((prevState) => ({
                      ...prevState,
                      address: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label for="Phone">Phone number:</label>
                <input
                  type="text"
                  className={
                    objCheckValid.validPhoneNumber
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  id="Phone"
                  placeholder="Enter Phone number"
                  value={dataRegister.phoneNumber}
                  onChange={(e) =>
                    setDataRegister((prevState) => ({
                      ...prevState,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                People who use our service may have uploaded your contact
                information to Facebook.&nbsp;
                <a className="link-more fw-bold fs-6" href="#">
                  Learn more.
                </a>
              </div>
              <div className="form-group">
                By clicking Sign Up, you agree to our&nbsp;
                <a className="link-more fw-bold fs-6" href="#">
                  Terms
                </a>
                ,&nbsp;
                <a className="link-more fw-bold fs-6" href="#">
                  Privacy Policy
                </a>
                &nbsp;and&nbsp;
                <a className="link-more fw-bold fs-6" href="#">
                  Cookies Policy
                </a>
                . You may receive SMS notifications from us and can opt out at
                any time.
              </div>
            </form>
            <div className="d-flex flex-column align-items-center">
              <button
                className="btn btn-register text-white fw-bold fs-5 my-3"
                onClick={() => handleRegister()}
              >
                Sign up
              </button>
              <div className="my-4">
                <button
                  className="already-account btn fs-5"
                  onClick={() => handleLogin()}
                >
                  Already have an account?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
