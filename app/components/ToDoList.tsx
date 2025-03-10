"use client"
import React, { useState } from "react";
import Pagination from "../microComponents/Pagination";
import HeaderButtons from "../microComponents/HeaderButtons";
import Title from "../microComponents/Title";
import { Todolisttitle } from "./Path/TitlePaths";
import Search from "../microComponents/Search";
import { headerbutton, search } from "./Path/TaskData";
import CreateTaskModal from "./CreateTaskModal";
import TaskTable from "./TaskTable";
import DeleteConfirmation from "./DeleteConfirmation";
import todoListApiService from "../api/apiService/todoListApiService";
import { useDeleteTask } from "../hooks/useDeleteTask";

const TodoList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { todos, loading, error, totalItems, refetch } = todoListApiService(
    currentPage,
    itemsPerPage
  );

  const {
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
  } = useDeleteTask(refetch);

  return (
    <div className="p-4 max-w-[1350px] mx-auto">
      <div className="flex flex-col sm:flex-row items-center mb-6 justify-between">
        <Title title={Todolisttitle[0].titleName} />
        <Search searchText={search[2].searchText} />
        <HeaderButtons {...headerbutton[2]} />
        <CreateTaskModal />
      </div>

      {loading ? (
        <p className="text-center">Loading tasks...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <TaskTable todos={todos} onDelete={handleOpenDeleteModal} />
      )}

       <Pagination
         currentPage={currentPage}
         totalItems={totalItems}
         itemsPerPage={itemsPerPage}
         onPageChange={setCurrentPage}
         onItemsPerPageChange={setItemsPerPage}
       />
     
      
      <DeleteConfirmation isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} onConfirm={handleConfirmDelete} />
    </div>
  );
};

export default TodoList;