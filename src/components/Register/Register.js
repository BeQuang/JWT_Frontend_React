import "./Register.scss";
import { useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();

  const handleLogin = () => {
    navigate("/register");
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
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="form-group">
                <label for="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div class="form-group">
                <label for="confirm">Confirm Password:</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirm"
                  placeholder="Confirm-Password"
                  required
                />
              </div>
              <div className="form-group d-flex justify-content-between py-2">
                <label>Gender:</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="Male"
                    value="male"
                  />
                  <label class="form-check-label" for="Male">
                    Male
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="FeMale"
                    value="female"
                  />
                  <label class="form-check-label" for="FeMale">
                    FeMale
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="Other"
                    value="female"
                  />
                  <label class="form-check-label" for="Other">
                    Other
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label for="address">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Enter address"
                  required
                />
              </div>
              <div className="form-group">
                <label for="Phone">Phone number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="Phone"
                  placeholder="Enter Phone number"
                  required
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
              <button
                type="submit"
                className="btn btn-register text-white fw-bold fs-5 my-3"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
