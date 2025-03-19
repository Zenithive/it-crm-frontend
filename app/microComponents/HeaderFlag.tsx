import React from 'react'

const HeaderFlag = () => {
  return (
    <div>
      <div className="bg-white flex p-4 rounded-xl h-12 space-x-4 shadow-custom">
            <div className="flex items-center ">
              <img src="/flag_india.svg" alt="flag" className="mr-1" />
              <img
                src="/vector(1).svg"
                alt="dropdown"
                className="h-4 w-4 text-gray-500 ml-3"
              />
              <div className="h-6 w-px bg-bg-blue-11 ml-3"></div>
            </div>
            <div className="text-gray-600 flex justify-center items-center">
              12:00 PM
            </div>
          </div>

    </div>
  )
}

export default HeaderFlag
