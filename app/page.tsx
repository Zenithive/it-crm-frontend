
import Login from "./components/Login";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 px-4 place-items-center sm:px-6 md:px-10 lg:px-20 mt-[88px]">
        <div>
          <img
            src="logo.svg"
            alt="Logo"
            className="w-[200px] sm:w-[320px] h-auto"
          />
        </div>
        <div className="pt-5 sm:pt-8 text-center">
          <p className="text-[24px] sm:text-[32px] md:text-[42px] font-semibold">
            Login faster and safer to your{" "}
            <span className="text-bg-blue-12">Clarvion</span> account😊
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <Login />
        </div>
        <footer className="mt-12 text-[14px] sm:text-[20px] text-center">
          ©2024 Clarvion, Inc. All Rights Reserved.{" "}
          <span className="text-bg-blue-12 cursor-pointer  font-semibold">
            Privacy Policy & Manage Cookies
          </span>
        </footer>
      </div>
    </>
  );
}