import React from 'react';

// Resource Card Skeleton for the Resource List
export const ResourceCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-100 p-4 sm:p-6 rounded-xl shadow-custom transition-all duration-300 flex flex-col min-h-[170px] h-full animate-pulse">
      {/* Title and experience row */}
      <div className="flex justify-between">
        <div className="h-7 bg-gray-200 rounded-md w-3/5 mb-3 sm:mb-4"></div>
        <div className="h-6 bg-gray-200 rounded-md w-1/5"></div>
      </div>
      
      <div className="flex-grow flex flex-col justify-between">
        {/* Skills/tags skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="px-3 py-1.5 bg-gray-200 rounded-lg w-24 h-9"></div>
          <div className="px-3 py-1.5 bg-gray-200 rounded-lg w-24 h-9"></div>
          <div className="px-3 py-1.5 bg-gray-200 rounded-lg w-24 h-9"></div>
        </div>
        
        {/* Company name and view button */}
        <div className="w-full flex justify-between items-center mb-4 lg:mb-0">
          <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
          <div className="flex items-center gap-1">
            <div className="h-4 bg-gray-200 rounded-md w-12"></div>
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Full grid skeleton for resource list
export const ResourceListSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6 lg:p-8">
      {Array(9).fill(0).map((_, index) => (
        <ResourceCardSkeleton key={index} />
      ))}
    </div>
  );
};