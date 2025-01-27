import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="">
        <div className="h-[88px] bg-bg-blue-12">
          <div className="flex p-5">
            <div className="ml-[72px] ">
              <img src="white_logo.svg" alt="logo" className=""></img>
            </div>

            <div className="">
              <div className="bg-white w-[336px] h-[50px] ml-[50px] rounded-xl">
                <div className="flex items-center gap-3 p-3">
                  <div className="">
                    <img
                      src="search_icon.svg"
                      alt="search"
                      className="h-6 w-6"
                    ></img>
                  </div>
                  {/* <div className="">
                    <div className="">Search Clarvion</div>
                  </div> */}
                  <input
                    type="text"
                    placeholder="Search Clarvion"
                    className="  w-[336px] focus:outline-none focus:border-transparent" 
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5 ml-auto">
              <div className="flex items-center gap-14">
                <div className="">
                  <img
                    src="nav_icon_1.svg"
                    alt="notification"
                    className="h-6 w-6"
                  ></img>
                </div>
                <div className="">
                  <img
                    src="nav_icon_2.svg"
                    alt="notification"
                    className="h-6 w-6"
                  ></img>
                </div>
                <div className="">
                  <img
                    src="nav_icon_3.svg"
                    alt="notification"
                    className="h-6 w-6"
                  ></img>
                </div>
                <div className="">
                  <img
                    src="nav_icon_4.svg"
                    alt="notification"
                    className="h-6 w-6"
                  ></img>
                </div>
                <div className="">
                  <img
                    src="Nav_icon_5.svg"
                    alt="profile"
                    className="h-6 w-6"
                  ></img>
                </div>
                <div className="">
                  <hr className="w-[1px] h-[34px] bg-white"></hr>
                </div>
                <div className="flex gap-2">
                  <div className="">
                    <img
                      src="image.svg"
                      alt="profile"
                      className="h-6 w-6 mt-1"
                    ></img>
                  </div>

                  <div className="text-white text-lg">Yash</div>
                  <div className="mr-12">
                    <img
                      src="vector.svg"
                      alt="profile"
                      className="h-6 w-6 mt-1"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
