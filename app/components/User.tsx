// User.tsx
"use client";
import React, { useState, useEffect } from "react";
import Title from "../microComponents/Title";
import { Usertitle } from "./Path/TitlePaths";
import { userApi } from "../api/apiService/userApiService";
import { user } from "../api/jsonService/userJsonService";
import UserTable from "./UserTable";
import Search from "../microComponents/Search";
import { headerbutton, search } from "./Path/TaskData";
import HeaderButtons from "../microComponents/HeaderButtons";
import FilterHandler from "./Filter/FilterHandler"; // Updated import
import _ from "lodash";

export interface User {
  userID: string;
  FirstName: string;
  LastName: string;
  role: string;
  email: string;
  phone: string;
  status: string;
}

interface FilterPayload {
  filter: {
    [key: string]: string | undefined;
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

const useDummyData = process.env.NEXT_PUBLIC_USE_DUMMY_DATA === "false"; // Fixed condition (was "false")

const User: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        console.log("useDummyData:", useDummyData);
        const response = useDummyData ? await user() : await userApi();
        console.log("Response:", response);
        console.log("Users from response:", response.users);
        setUsers(response.users || []);
        setFilteredUsers(response.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const debouncedSearch = _.debounce((query: string) => {
    setSearchQuery(query);
    applyFilters(query, roleFilter);
  }, 500);

  const handleSearchChange = (value: string) => {
    debouncedSearch(value);
  };

  const filterSections = [
    {
      id: "role",
      title: "Role",
      options: [
        { id: "admin", label: "C-Level", checked: false },
        { id: "user", label: "Sales Executive", checked: false },
        { id: "manager", label: "Business Executive", checked: false },
      ],
    }
  ];

  const handleFilterApply = (payload: FilterPayload) => {
    const { filter } = payload;
    setRoleFilter(filter.role);
    applyFilters(searchQuery, filter.role);
    setShowFilter(false);
  };

  const applyFilters = (query: string, role: string | undefined) => {
    let filtered = [...users];

    if (query && query.trim() !== "") {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.FirstName.toLowerCase().includes(lowerQuery) ||
          user.LastName.toLowerCase().includes(lowerQuery) ||
          user.email.toLowerCase().includes(lowerQuery)
      );
    }

    if (role) {
      filtered = filtered.filter((user) => user.role.toLowerCase() === role.toLowerCase());
    }

    setFilteredUsers(filtered);
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading users...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div>
      <div className="p-4 max-w-[1350px] mx-auto">
        <div className="flex flex-col sm:flex-row items-center mb-6 justify-between">
          <div className="flex">
            <Title title={Usertitle[0].titleName} />
            <div className="ml-4">
              <Search
                searchText={search[5].searchText}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <HeaderButtons
            button1Text={headerbutton[2].button1text}
            button1img={headerbutton[2].button1img}
            onClick1={() => setShowFilter(true)}
          />
        </div>

        <UserTable users={filteredUsers} />
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