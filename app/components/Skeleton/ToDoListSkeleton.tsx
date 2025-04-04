"use client";
import React from "react";

const TodoListSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Header section skeleton */}
      <div className="flex flex-col sm:flex-row items-center mb-6 justify-between">
        <div className="flex">
          {/* Title skeleton */}
          <div className="h-8 w-40 bg-gray-200 rounded"></div>
          {/* Search box skeleton */}
          <div className="ml-4 h-10 w-64 bg-gray-200 rounded"></div>
        </div>
        {/* Header buttons skeleton */}
        <div className="flex gap-2 mt-4 sm:mt-0">
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Table skeleton */}
      <div className="w-full overflow-x-auto mt-4">
        <div className="border border-gray-200 rounded-lg">
          {/* Table header skeleton */}
          <div className="flex bg-gray-100 p-4 border-b">
            <div className="w-1/6 h-6 bg-gray-200 rounded"></div>
            <div className="w-1/6 h-6 bg-gray-200 rounded mx-2"></div>
            <div className="w-1/6 h-6 bg-gray-200 rounded mx-2"></div>
            <div className="w-1/6 h-6 bg-gray-200 rounded mx-2"></div>
            <div className="w-1/6 h-6 bg-gray-200 rounded mx-2"></div>
            <div className="w-1/6 h-6 bg-gray-200 rounded"></div>
          </div>

          {/* Table rows skeleton */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex p-4 border-b">
              <div className="w-1/6 h-5 bg-gray-200 rounded"></div>
              <div className="w-1/6 h-5 bg-gray-200 rounded mx-2"></div>
              <div className="w-1/6 h-5 bg-gray-200 rounded mx-2"></div>
              <div className="w-1/6 h-5 bg-gray-200 rounded mx-2"></div>
              <div className="w-1/6 h-5 bg-gray-200 rounded mx-2"></div>
              <div className="w-1/6 flex">
                <div className="h-8 w-8 bg-gray-200 rounded-full mr-2"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-between items-center mt-4">
        <div className="h-8 w-32 bg-gray-200 rounded"></div>
        <div className="flex gap-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-8 w-8 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoListSkeleton;