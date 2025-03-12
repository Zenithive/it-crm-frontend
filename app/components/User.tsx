"use client";
import React, { useState, useEffect } from "react";
import Title from "../microComponents/Title";
import { Usertitle } from "./Path/TitlePaths";
import { userApi } from "../api/apiService/userApiService"; // API Service
import { user } from "../api/jsonService/userJsonService"; // JSON Static Data
import UserTable from "./UserTable";
import Search from "../microComponents/Search";
import { headerbutton, search } from "./Path/TaskData";
import HeaderButtons from "../microComponents/HeaderButtons";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useUpdateTask } from "../hooks/useUpdateTask";

export interface User {
  userID: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: string;
}

const useDummyData = process.env.NEXT_PUBLIC_USE_DUMMY_DATA === "false";

const User: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        console.log("useDummyData:", useDummyData);
        const response = useDummyData ? await user() : await userApi();
        console.log("Response:", response);
        console.log("Users from response:", response.users);
        setUsers(response.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
      
    fetchUsers();
  }, []);
  

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading users...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

//   if (!users.length) {
//     return <p className="text-center mt-10">No users available.</p>;
//   }



  return (
    <div>
      <div className="p-4 max-w-[1350px] mx-auto">
        <div className="flex flex-col sm:flex-row items-center mb-6 justify-between">
          <div className="flex">
            <Title title={Usertitle[0].titleName} />
            <div className="ml-4">
              <Search searchText={search[5].searchText} />
            </div>
          </div>
          <HeaderButtons
            button1Text={headerbutton[2].button1text}
            button1img={headerbutton[2].button1img}
            button1width="w-[109px]"
          />
        </div>

        <UserTable users={users}/>
      </div>
    </div>
  );
};

export default User;
