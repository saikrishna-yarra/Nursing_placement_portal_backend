const isEmail = (email) => {
  const emailRegEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};
const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

exports.validateUserData = (data) => {
  let errors = {};

  // Validate email

  if (isEmpty(data.email)) errors.email = "Must not be empty";
  else if (!isEmail(data.email)) errors.email = "Must be a valid email";

  // Validate values

  if (isEmpty(data.first_name)) errors.first_name = "Must not be empty";
  if (isEmpty(data.last_name)) errors.last_name = "Must not be empty";
  if (isEmpty(data.student_number)) errors.student_number = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
