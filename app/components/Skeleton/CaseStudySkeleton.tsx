import React from 'react';

// Single resource card skeleton
export const ResourceCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-100 p-4 sm:p-6 rounded-xl shadow-custom transition-all duration-300 flex flex-col min-h-[170px] h-full animate-pulse">
      {/* Title skeleton */}
      <div className="h-7 bg-gray-200 rounded-md w-3/4 mb-3 sm:mb-4"></div>
      
      <div className="flex-grow flex flex-col justify-between">
        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="px-3 py-1.5 bg-gray-200 rounded-lg w-16 h-8"></div>
          <div className="px-3 py-1.5 bg-gray-200 rounded-lg w-20 h-8"></div>
          <div className="px-3 py-1.5 bg-gray-200 rounded-lg w-14 h-8"></div>
        </div>
        
        {/* Bottom row - company and view details */}
        <div className="w-full flex justify-between items-center mb-4 lg:mb-0">
          <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
          <div className="flex items-center gap-1">
            <div className="h-4 bg-gray-200 rounded-md w-20"></div>
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Table row skeleton
export const TableRowSkeleton: React.FC = () => {
  return (
    <div className="flex items-center w-full py-4 border-b border-gray-200 animate-pulse">
      <div className="w-1/4 pr-2">
        <div className="h-5 bg-gray-200 rounded-md"></div>
      </div>
      <div className="w-1/4 px-2">
        <div className="h-5 bg-gray-200 rounded-md"></div>
      </div>
      <div className="w-1/3 px-2">
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-gray-200 rounded-md"></div>
          <div className="h-5 w-16 bg-gray-200 rounded-md"></div>
        </div>
      </div>
      <div className="w-1/6 pl-2 flex justify-end">
        <div className="h-5 w-24 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

// Resource Container Skeleton - Grid View
export const ResourceGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6 lg:p-8 bg-white shadow-custom rounded-xl">
      {Array(9).fill(0).map((_, index) => (
        <ResourceCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Resource Container Skeleton - Table View
export const ResourceTableSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-white shadow-custom rounded-xl p-4">
      {/* Table header */}
      <div className="flex items-center w-full py-3 border-b-2 border-gray-200 font-medium text-gray-600">
        <div className="w-1/4 pr-2">
          <div className="h-5 bg-gray-200 rounded-md w-20"></div>
        </div>
        <div className="w-1/4 px-2">
          <div className="h-5 bg-gray-200 rounded-md w-24"></div>
        </div>
        <div className="w-1/3 px-2">
          <div className="h-5 bg-gray-200 rounded-md w-16"></div>
        </div>
        <div className="w-1/6 pl-2"></div>
      </div>
      
      {/* Table rows */}
      {Array(8).fill(0).map((_, index) => (
        <TableRowSkeleton key={index} />
      ))}
    </div>
  );
};