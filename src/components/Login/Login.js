/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import "./Login.scss";

const Login = () => {
  return (
    <div className="login-container">
      <div className="container">
        <div className="row">
          <div className="content-left col-12 d-none col-md-7 d-md-flex flex-column justify-content-center">
            <img
              className="brand"
              src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
              alt="Facebook"
            />
            <div className="detail fs-1 w-85">
              Facebook helps you connect and share with the people in your life.
            </div>
          </div>
          <div className="content-right col-12 col-md-5 d-flex flex-column align-items-center">
            <img
              className="brand w-30 d-block d-md-none"
              src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
              alt="Facebook"
            />
            <div className="form-login d-flex justify-content-center bg-light w-100">
              <div className="d-flex flex-column gap-3 py-3 w-90">
                <input
                  type="text"
                  className="form-control pt-3 pb-3"
                  placeholder="Email address or phone number"
                />
                <input
                  type="password"
                  className="form-control pt-3 pb-3"
                  placeholder="Password"
                />
                <button className="btn btn-primary pt-3 pb-3 fs-4 fw-bold">
                  Login
                </button>
                <div className="text-center color-blue">
                  <a href="#">Forgotten password?</a>
                </div>
                <hr />
                <div className="text-center">
                  <button className="btn btn-login text-white fw-bold fs-4">
                    Create new account
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <a className="create-page text-black fw-bold fs-5" href="#">
                Create a Page
              </a>
              &nbsp;for a celebrity, brand or business.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
