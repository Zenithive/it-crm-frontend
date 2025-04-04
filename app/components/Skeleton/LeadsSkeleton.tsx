import React from "react";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
      {/* Table header */}
      <div className="flex bg-gray-200 p-3">
        {[...Array(columns)].map((_, index) => (
          <div key={index} className="h-4 bg-gray-300 rounded w-full mx-2" />
        ))}
      </div>

      {/* Table rows */}
      {[...Array(rows)].map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex items-center p-3 border-t border-gray-200"
        >
          {[...Array(columns)].map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-4 bg-gray-200 rounded w-full mx-2"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
