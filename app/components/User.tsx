"use client";
import React, { useState, useCallback, useMemo } from "react";
import Title from "../microComponents/Title";
import { Usertitle } from "./Path/TitlePaths";
import { useUserApiService } from "../api/apiService/userApiService";
import UserTable from "./UserTable";
import Search from "../microComponents/Search";
import { headerbutton, search } from "./Path/TaskData";
import HeaderButtons from "../microComponents/HeaderButtons";
import FilterHandler from "./Filter/FilterHandler";
import _ from "lodash";
import Pagination from "../microComponents/Pagination";
import { useDeleteUser } from "../api/apiService/deleteUserApiService";
import { useUpdateUser } from "../api/apiService/updateUserApiService"; // Import the new hook
import DeleteConfirmation from "./DeleteConfirmation";

export interface User {
  userID: string;
  name: string;
  email: string;
  role: string;
  phone?: string; // Add phone to match mutation response
  password?: string; // Add password to match mutation response
  campaigns: {
    campaignID: string;
    campaignName: string;
    campaignCountry: string;
    industryTargeted: string;
  }[];
}

interface FilterPayload {
  filter: {
    [key: string]: string | undefined;
    role?: string;
    name?: string;
  };
  pagination: {
    page: number;
    pageSize: number;
  };
  sort: {
    field: string;
    order: string;
  };
}

const User: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);

  const { users, totalCount, loading, error, refetch } = useUserApiService({
    filter: {
      role: roleFilter,
      name: searchQuery || undefined,
    },
    pagination: {
      page: currentPage,
      pageSize: itemsPerPage,
    },
    sort: {
      field: "name",
      order: "ASC",
    },
  });

  const { isDeleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal, handleConfirmDelete } =
    useDeleteUser(refetch);

  const { handleConfirmUpdate } = useUpdateUser(refetch);

  const filterSections = [
    {
      id: "role",
      title: "Role",
      options: [
        { id: "C-LEVEL", label: "C-Level", checked: false },
        { id: "SALES_EXECUTIVE", label: "Sales Executive", checked: false },
        { id: "BUSINESS_EXECUTIVE", label: "Business Executive", checked: false },
        { id: "MANAGER", label: "Manager", checked: false },
        { id: "ADMIN", label: "Admin", checked: false }, 
      ],
    },
  ];

  const debouncedSearch = useMemo(
    () =>
      _.debounce((query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
      }, 500),
    []
  );

  const handleSearchChange = useCallback(
    (query: string) => {
      setInputValue(query);
      if (query.length >= 3 || query.length === 0) {
        debouncedSearch(query);
      } else if (searchQuery && query.length < 3) {
        debouncedSearch("");
      }
    },
    [debouncedSearch, searchQuery]
  );

  const handleFilterApply = useCallback(
    async (payload: FilterPayload): Promise<void> => {
      const { filter } = payload;
      setRoleFilter(filter.role);
      setCurrentPage(payload.pagination.page || 1);
      return Promise.resolve();
    },
    []
  );

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading users...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div>
      <div className="p-4 max-w-[1350px] mx-auto">
        <div className="flex flex-col sm:flex-row items-center mb-6 justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Title title={Usertitle[0].titleName} />
            <Search
              searchText={search[5].searchText}
              value={inputValue}
              onChange={handleSearchChange}
            />
          </div>
          <HeaderButtons
            button1Text={headerbutton[2].button1text}
            button1img={headerbutton[2].button1img}
            onClick1={() => setShowFilter(true)}
          />
        </div>

        <UserTable
          users={users}
          onDelete={handleOpenDeleteModal}
          onEdit={handleConfirmUpdate} 
        />

        <Pagination
          currentPage={currentPage}
          totalItems={totalCount}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
        />
      </div>

      {showFilter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <FilterHandler
            filterSections={filterSections}
            onFilterApply={handleFilterApply}
            setShowFilter={setShowFilter}
          />
        </div>
      )}
    </div>
  );
};

export default User;