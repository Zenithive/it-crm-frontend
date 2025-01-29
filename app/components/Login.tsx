"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Login() {
  const [formBg, setFormBg] = useState("");
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
        "Must contain 6 characters, one uppercase, one lowercase, one number, and one special character"
      )
      .required("Enter Valid Password"),
  });

  const handleNextClick = () => {
    setFormBg("#F6F5FF");
    router.push("/dashboard");
  };

  return (
    <div className="grid grid-cols-1 px-4 place-items-center sm:px-6 md:px-10 lg:px-20 mt-[88px]" data-testid="login-1">
      <div>
        <img src="logo.svg" alt="Logo" className="w-[200px] sm:w-[320px] h-auto" />
      </div>
      <div className="pt-5 sm:pt-8 text-center">
        <p className="text-[24px] sm:text-[32px] md:text-[42px] font-semibold">
          Login faster and safer to your <span className="text-bg-blue-12">Clarvion</span> account 😊
        </p>
      </div>
      <div className="w-full sm:w-auto">
        <div
          className="container mx-auto px-5 sm:px-10 md:px-20 lg:px-40 xl:px-64 rounded-[10px] mt-[45px] py-[35px]"
          style={{ backgroundColor: formBg }}
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-1 font-semibold">
                  <label className="text-[18px] sm:text-[24px] text-bg-blue-11">Email</label>
                  <Field
                    type="email"
                    name="email"
                    data-testid="email"
                    className="w-full sm:w-[433px] h-[50px] bg-white sm:h-[60px] border-[1px] border-black rounded-[4px] px-4 text-[18px] focus:outline-none focus:border-gray-200 focus:shadow-lg focus:shadow-bg-blue-14"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-[16px]" />
                </div>
                <div className="flex flex-col gap-1 font-semibold">
                  <label className="text-[18px] sm:text-[24px] text-bg-blue-11">Password</label>
                  <Field
                    type="password"
                    name="password"
                    data-testid="pass"
                    className="w-full sm:w-[433px] h-[50px] bg-white sm:h-[60px] border-[1px] border-black rounded-[4px] px-4 text-[18px] focus:outline-none focus:border-gray-200 focus:shadow-lg focus:shadow-bg-blue-14"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-[16px] text-wrap w-full sm:w-[433px]" />
                </div>
                <div className="mt-4 md:w-[433px] w-full">
                  <button type="submit" data-testid="nextButton" className="btn bg-bg-blue-12 hover:bg-bg-blue-11 text-white w-full p-3 rounded-md">
                    Next
                  </button>
                </div>
              </form>
            )}
          </Formik>
          <div className="flex flex-col gap-5 mt-6">
            <Link href="#" className="flex items-center gap-[45px] bg-white border-[0.8px] rounded-md border-black p-3 hover:shadow-lg">
              <img src="google.svg" className="w-6 h-6" alt="Google" />
              <span className="text-[16px] sm:text-[20px]">Login with Google</span>
            </Link>
            <Link href="#" className="flex items-center gap-[39px] bg-white border-[0.8px] rounded-md border-black p-3 hover:shadow-lg">
              <img src="linkedin.svg" className="w-8 h-8" alt="LinkedIn" />
              <span className="text-[16px] sm:text-[20px]">Login with LinkedIn</span>
            </Link>
          </div>
          <footer className="mt-12 text-[14px] sm:text-[20px] text-center">
            ©2024 Clarvion, Inc. All Rights Reserved. <span className="text-bg-blue-12 cursor-pointer font-semibold">Privacy Policy & Manage Cookies</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
