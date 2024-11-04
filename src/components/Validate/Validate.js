import { toast } from "react-toastify";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateRegister = (dataRegister) => {
  if (!dataRegister.username) {
    toast.error("Username is required");
    return false;
  }
  if (!validateEmail(dataRegister.email)) {
    toast.error("Please enter a valid email");
    return false;
  }
  if (!dataRegister.password) {
    toast.error("Password is required");
    return false;
  }
  if (dataRegister.password !== dataRegister.confirmPassword) {
    toast.error("Authentication passwords are not the same");
    return false;
  }
  if (!dataRegister.gender) {
    toast.error("Gender is required");
    return false;
  }
  if (!dataRegister.address) {
    toast.error("Address is required");
    return false;
  }
  if (!dataRegister.phoneNumber) {
    toast.error("PhoneNumber is required");
    return false;
  }

  return true;
};

export { validateRegister };
