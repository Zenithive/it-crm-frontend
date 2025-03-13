"use client";
import React, { useState } from "react";
import Pagination from "../microComponents/Pagination";
import HeaderButtons from "../microComponents/HeaderButtons";
import Title from "../microComponents/Title";
import { Todolisttitle } from "./Path/TitlePaths";
import Search from "../microComponents/Search";
import { headerbutton, search } from "./Path/TaskData";
import CreateTaskModal from "./CreateTaskModal";
import TaskTable, { Task } from "./TaskTable";
import DeleteConfirmation from "./DeleteConfirmation";
import useTodoListApiService from "../api/apiService/todoListApiService"; // Assuming this is a hook
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useUpdateTask } from "../hooks/useUpdateTask";

const TodoList: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Ensure todoListApiService is used correctly
  const { todos, loading, error, totalItems, refetch } = useTodoListApiService(
    currentPage,
    itemsPerPage
  );

  
  const typedTodos: Task[] = todos;
  
  const handleCloseModal = () => {
    setVisible(false);
    setSelectedTask(null);
  };
  
  const showModal = () => {
    setVisible(true);
    setSelectedTask(null);
  };
  
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setVisible(true);
  };
  
  const {
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
  } = useDeleteTask(refetch);
  
  const { handleConfirmUpdate } = useUpdateTask(refetch); // Use the update hook

  return (
    <div className="p-4 max-w-[1350px] mx-auto">
      <div className="flex flex-col sm:flex-row items-center mb-6 justify-between">
        <div className="flex">
          <Title title={Todolisttitle[0].titleName} />
          <div className="ml-4">
            <Search searchText={search[2].searchText} />
          </div>
        </div>
        <HeaderButtons
          button1Text={headerbutton[2].button1text}
          button1img={headerbutton[2].button1img}
          button2Text={headerbutton[2].button2text}
          button2img={headerbutton[2].button2img}
          button1width="w-[109px]"
          button2width="w-[120px]"
          onClick2={showModal}
        />
        <CreateTaskModal
          visible={visible}
          setVisible={setVisible}
          onClose={handleCloseModal}
          initialTaskData={selectedTask}
          onUpdateTask={handleConfirmUpdate} 
          refetch={refetch}
        />
      </div>

      {loading ? (
        <p className="text-center">Loading tasks...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <TaskTable todos={typedTodos} onDelete={handleOpenDeleteModal} onEdit={handleEditTask} refetch={refetch}/>
      )}

      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
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
  );
};

export default TodoList;
