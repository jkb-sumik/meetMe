import {
  validateEmail,
  validateLength,
  validatePassword,
  validateString,
  validateNumber,
} from "../validationConstraints";

export const validateInput = (inputId, inputValue) => {
  if (
    inputId === "firstName" ||
    inputId === "lastName" ||
    inputId === "city" ||
    inputId === "gender"
  ) {
    return validateString(inputId, inputValue);
  } else if (inputId === "email") {
    return validateEmail(inputId, inputValue);
  } else if (inputId === "password") {
    return validatePassword(inputId, inputValue);
  } else if (inputId === "about") {
    return validateLength(inputId, inputValue, 0, 150, true);
  } else if (inputId === "age") {
    return validateNumber(inputId, inputValue);
  }
};
