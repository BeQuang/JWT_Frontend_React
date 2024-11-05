import { toast } from "react-toastify";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateRegister = (dataRegister, setObjectCheckValid) => {
  const defaultValid = {
    validUsername: true,
    validEmail: true,
    validPassword: true,
    validConfirmPassword: true,
    validGender: true,
    validAddress: true,
    validPhoneNumber: true,
  };

  setObjectCheckValid(defaultValid);

  if (!dataRegister.username) {
    toast.error("Username is required");
    setObjectCheckValid((prev) => ({ ...prev, validUsername: false }));
    return false;
  }
  if (!validateEmail(dataRegister.email)) {
    toast.error("Please enter a valid email");
    setObjectCheckValid((prev) => ({ ...prev, validEmail: false }));
    return false;
  }
  if (!dataRegister.password) {
    toast.error("Password is required");
    setObjectCheckValid((prev) => ({ ...prev, validPassword: false }));
    return false;
  }
  if (dataRegister.password !== dataRegister.confirmPassword) {
    toast.error("Authentication passwords are not the same");
    setObjectCheckValid((prev) => ({ ...prev, validConfirmPassword: false }));
    return false;
  }
  if (!dataRegister.gender) {
    toast.error("Gender is required");
    setObjectCheckValid((prev) => ({ ...prev, validGender: false }));
    return false;
  }
  if (!dataRegister.address) {
    toast.error("Address is required");
    setObjectCheckValid((prev) => ({ ...prev, validAddress: false }));
    return false;
  }
  if (!dataRegister.phoneNumber) {
    toast.error("PhoneNumber is required");
    setObjectCheckValid((prev) => ({ ...prev, validPhoneNumber: false }));
    return false;
  }

  return true;
};

const validateLogin = (
  valueLogin,
  passwordLogin,
  setCheckValidValueLogin,
  setCheckValidPassword
) => {
  setCheckValidValueLogin(true);
  setCheckValidPassword(true);

  if (!valueLogin) {
    toast.error("Please enter your email or phone number");
    setCheckValidValueLogin(false);
    return false;
  }
  if (!passwordLogin) {
    toast.error("Please enter your password");
    setCheckValidPassword(false);
    return false;
  }

  return true;
};

export { validateRegister, validateLogin };
