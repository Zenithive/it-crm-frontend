"use client";
import Link from "next/link";
import { useState } from "react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import HeaderOfLogin from "./HeaderOfLogin";

import { useLoginUser} from "../../graphQl/functions/login.function";
import { useDispatch, UseDispatch } from "react-redux";
import { loginSuccess } from "../redux/actions/authReducer";

export default function Login() {
  const [formBg, setFormBg] = useState("");
  const { loginUser,error:apiError,reset} = useLoginUser();
  
  
  const router = useRouter();

  const validationSchema = Yup.object().shape({
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

 
    


  const handleNextClick= async (values: { email: string; password: string }) => {
   

 
      const response = await loginUser(values.email, values.password);
      if (response?.token) {
        localStorage.setItem("token", response.token);
     
        router.push("/dashboard"); 
      }
     

    
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
        <HeaderOfLogin />
        <div className="grid md:grid-cols-2 gap-6 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col items-center justify-center space-y-4 p-4">
            <div className="w-full max-w-md">
              <img src="Loginpic.svg" alt="login" className="w-full h-auto max-w-[320px] mx-auto" />
            </div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-center">
              Login faster and safer to your <span className="text-bg-blue-12">Clarvion</span> account😊
            </h2>
          </div>
          <div className="w-full max-w-md mx-auto">
            <div className="border border-bg-blue-11 border-opacity-30 rounded-2xl p-4">
              <div className="w-full rounded-xl p-6" style={{ backgroundColor: formBg || "white" }}>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleNextClick}
                >
                  {({ errors, touched, handleSubmit,setFieldValue,setFieldTouched }) => (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="space-y-1">
                        <label className="block text-[18px]  font-semibold">Email</label>
                        <Field
                          type="email"
                          name="email"
                           data-testid="email"
                           onChange={(e) => {
                            setFieldValue("email", e.target.value);


                            if (apiError) {
                        
                              reset();
                            }
                          
                          }}
                         
                         
                          className={`w-full h-[40px] px-3 border rounded-xl text-sm focus:outline-none focus:border-gray-200 focus:shadow-lg focus:shadow-bg-blue-14 ${
                            errors.email && touched.email ? "border-red-500" : "border-bg-blue-12"
                          }`}
                        />
                        <ErrorMessage  data-testid="errorEmail" name="email" component="div" className="text-red-500 text-xs" />
                      </div>
                      <div className="space-y-1 ">
                        <label className="block text-[18px]  font-semibold">Password</label>
                        <Field
                          type="password"
                          name="password"
                           data-testid="pass"
                           onChange={(e) => {
                            setFieldValue("password", e.target.value);
                            if (apiError) {
                          
                          reset();
                            }
                          
                          }}
                        
                          className={`w-full h-10 px-3 border rounded-xl text-sm focus:outline-none focus:border-gray-200 focus:shadow-lg focus:shadow-bg-blue-14 ${
                            errors.password && touched.password ? "border-red-500" : "border-bg-blue-12"
                          }`}
                        />
                        <ErrorMessage  data-testid="errorPass" name="password" component="div" className="text-red-500 text-xs" />
            
                      </div>
                      {apiError && <p className="text-red-500">{apiError.message}</p>}
                      <button
                        type="submit"
                      
                        className="w-full h-[40px] bg-bg-blue-12 hover:bg-bg-blue-11 text-white rounded-xl font-bold text-[18px] transition-colors"
                      >
                        Next
                      </button>
                    </form>
                  )}
                </Formik>
                <div className="flex justify-between mt-3 text-xs md:text-sm">
                  <span className="text-bg-gray-13 font-semibold">2FA</span>
                  <span className="text-black font-semibold">Forgot Password?</span>
                </div>
                <div className="flex items-center justify-center my-4">
                  <span className="text-[18px] font-semibold">OR</span>
                </div>
                <div className="space-y-3">
                  <Link href="#" data-testid="googleLogin" className="flex items-center justify-center gap-3 p-2 border border-bg-blue-12 rounded-xl">
                    <img src="google.svg" className="w-5 h-5" alt="Google" />
                    <span className="text-[18px] text-bg-blue-12">Login with Google</span>
                  </Link>
                  <Link href="#"  data-testid="linkedinLogin" className="flex items-center justify-center gap-3 p-2 border border-bg-blue-12 rounded-xl ">
                    <img src="linkedin.svg" className="w-6 h-6" alt="LinkedIn" />
                    <span className="text-[18px] text-bg-blue-12">Login with LinkedIn</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
