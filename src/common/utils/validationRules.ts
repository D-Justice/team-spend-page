import { validateProps } from "../../common/types";

export default function validate(values: validateProps) {
  let errors = {} as validateProps;

  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  } 
  if (!parseInt(values.employees)) {
    errors.employees = "Must be a number"
  }
  if (!values.employees) {
    errors.employees = "Number of employees is required";
  }
  if (parseInt(values.employees) <= 0) {
    errors.employees = "Number of employees must be higher than 0"
  }
  if (!values.message) {
    errors.message = "Message is required";
  }
  return errors;
}
