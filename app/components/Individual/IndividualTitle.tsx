import React from 'react'
import Title from '../../microComponents/Title';
import { Individualtitle } from '../Path/TitlePaths';

const IndividualTitle = () => {
  return (
    <div>
          <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Title title={Individualtitle[0].titleName}></Title>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
              Qualified Lead
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 ">
              <img src='edit_icon.svg' alt='Edit'/>
              <div className='text-bg-blue-12 font-semibold'>Edit Contact</div>
            </button>

             <div className="bg-white flex p-4 rounded-xl h-12 space-x-4 shadow-custom">
            <div className="flex items-center ">
              <img src="flag_india.svg" alt="flag" className="mr-1" />
              <img
                src="vector(1).svg"
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
        </div>
    </div>
  )
}

export default IndividualTitle
