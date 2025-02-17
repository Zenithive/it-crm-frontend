"use client";
import * as React from "react";

import HeaderOfLogin from "./Login/HeaderOfLogin";

import Form from "./Login/Form";
import { ApolloTestProvider } from "../../__mocks__/test_utills";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
        <HeaderOfLogin />
        <div className="grid md:grid-cols-2 gap-6 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col items-center justify-center space-y-4 p-4">
            <div className="w-full max-w-md">
              <img
                src="Loginpic.svg"
                alt="login"
                className="w-full h-auto max-w-[320px] mx-auto"
              />
            </div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-center">
              Login faster and safer to your{" "}
              <span className="text-bg-blue-12">Clarvion</span> account😊
            </h2>
          </div>
          <ApolloTestProvider>
          <Form />
          </ApolloTestProvider>
        </div>
      </div>
    </div>
  );
}
