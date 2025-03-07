import React from "react";
import { Pagination as AntPagination } from "antd";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination2: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
}) => {
  return (
    <div className="flex justify-center py-4">
      <AntPagination
        current={currentPage}
        pageSize={pageSize}
        total={totalCount}
        onChange={onPageChange}
        showSizeChanger
        onShowSizeChange={(_, size) => onPageSizeChange(size)}
      />
    </div>
  );
};

export default Pagination2;
