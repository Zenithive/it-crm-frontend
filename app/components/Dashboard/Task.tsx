import React from 'react';
import {tasks} from '../Path/TaskData'

const Task = () => {
  return (
    <div className='w-full'>
      <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="border-b">
                <div className="flex space-x-8 mb-4">
                  <button className="text-[#6366F1] border-b-2 border-[#6366F1] pb-2 font-medium">
                    Today Task
                  </button>
                  <button className="text-gray-500">Follow-Ups</button>
                </div>
              </div>
              <div className="space-y-6 mt-4">
                {tasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">{task.title}</h3>
                      <p className="text-sm text-gray-500">{task.dueTime}</p>
                    </div>
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded-md border-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>
    </div>
  )
}

export default Task
