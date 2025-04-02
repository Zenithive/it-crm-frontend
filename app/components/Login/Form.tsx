import { ErrorMessage, Field, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { useLoginUser } from "../../../graphQl/functions/login.function";
import { useRouter } from "next/navigation";
import { validationSchema } from "./ValidationSchema";
import { loginSuccess } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";

const Form = () => {
  const [formBg, setFormBg] = useState<string>("");
  const { loginUser, error: apiError, reset } = useLoginUser();
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle regular email/password login
  const handleNextClick = async (values: { email: string; password: string }) => {
    const response = await loginUser(values.email, values.password);
    if (response?.token) {
      localStorage.setItem("token", response.token);
      
      const userData = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
        token: response.token,
      };
  
      // Store in cookie
      document.cookie = `token=${response.token}; path=/; max-age=86400; Secure; SameSite=Strict`;
      document.cookie = `userData=${JSON.stringify(userData)}; path=/; max-age=86400; Secure; SameSite=Strict`;
  
      dispatch(loginSuccess(userData));
      router.push("/dashboard");
    }
  };

  // Handle Google login - just redirect to your backend's Google auth endpoint
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };
  

  console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

  return (
    <>
      <div className="w-full max-w-md mx-auto">
        <div className="border border-bg-blue-11 border-opacity-30 rounded-xl p-4">
          <div
            className="w-full rounded-xl p-6"
            style={{ backgroundColor: formBg || "white" }}
          >
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleNextClick}
            >
              {({ errors, touched, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label className="block text-lg  font-semibold">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      data-testid="email"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("email", e.target.value);

                        if (apiError) {
                          reset();
                        }
                      }}
                      className={`w-full h-[40px] px-3 border rounded-xl text-sm focus:outline-none focus:border-gray-200 focus:shadow-lg focus:shadow-bg-blue-14 ${
                        errors.email && touched.email
                          ? "border-red-500"
                          : "border-bg-blue-12"
                      }`}
                    />
                    <ErrorMessage
                      data-testid="errorEmail"
                      name="email"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="space-y-1 ">
                    <label className="block text-[18px] font-semibold">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      data-testid="pass"
                      onChange={(e: { target: { value: any } }) => {
                        setFieldValue("password", e.target.value);
                        if (apiError) {
                          reset();
                        }
                      }}
                      className={`w-full h-10 px-3 border rounded-xl text-sm focus:outline-none focus:border-gray-200 focus:shadow-lg focus:shadow-bg-blue-14 ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : "border-bg-blue-12"
                      }`}
                    />
                    <ErrorMessage
                      data-testid="errorPass"
                      name="password"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  {apiError && (
                    <p className="text-red-500">{apiError.message}</p>
                  )}
                  <button
                    type="submit"
                    data-testid="nextbutton"
                    className="w-full h-[40px] bg-bg-blue-12 hover:bg-bg-blue-11 text-white rounded-xl font-bold text-[18px] transition-colors"
                  >
                    Next
                  </button>
                </form>
              )}
            </Formik>
            <div className="flex justify-end mt-3 text-xs md:text-sm">
              <span className="text-black font-semibold">Forgot Password?</span>
            </div>
            <div className="flex items-center justify-center my-4">
              <span className="text-[18px] font-semibold">OR</span>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleGoogleLogin}
                type="button"
                data-testid="googleLogin"
                className="w-full flex items-center justify-center gap-3 p-2 border border-bg-blue-12 rounded-xl"
              >
                <img src="google.svg" className="w-5 h-5" alt="Google" />
                <span className="text-[18px] text-bg-blue-12">
                  Login with Google
                </span>
              </button>
              <Link
                href="#"
                data-testid="linkedinLogin"
                className="flex items-center justify-center gap-3 p-2 border border-bg-blue-12 rounded-xl"
              >
                <img src="linkedin.svg" className="w-6 h-6" alt="LinkedIn" />
                <span className="text-[18px] text-bg-blue-12">
                  Login with LinkedIn
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;