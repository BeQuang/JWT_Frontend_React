import "./Login.scss";

const Login = () => {
  return (
    <div className="login-container">
      <div className="container">
        <div className="row">
          <div className="content-left col-7">
            <div className="brand">facebook</div>
            <div className="detail">
              Facebook helps you connect and share with the people in your life.
            </div>
          </div>
          <div className="content-right col-5 d-flex justify-content-center bg-light">
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
                <span>Forgotten password?</span>
              </div>
              <hr />
              <div className="text-center">
                <button className="btn btn-login text-white fw-bold fs-4">
                  Create new account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
