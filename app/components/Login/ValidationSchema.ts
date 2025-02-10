import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    email: Yup.string()
      .max(50, "Email is too long")
      .email("Enter Valid Email ID")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
        "Please provide a valid email address (example@domain.com)"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Should be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/, 
        "Must contain 6 characters, one uppercase, one lowercase, one number, and one special character"
      )
      .required("Enter Valid Password"),
  });
