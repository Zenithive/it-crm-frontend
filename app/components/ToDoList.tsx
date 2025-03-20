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
import Filter from "./Filter/Filter";
import FilterDropdown from "../microComponents/FiterDropdown";
import FilterHandler from "./Filter/FilterHandler";



interface FilterPayload {
  filter: {
    [key: string]: string | undefined; // Dynamic filter keys
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
const TodoList: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
const [showFilter, setShowFilter] = useState(false);
  

    
  const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
 const [priorityFilter, setPriorityFilter] = useState<string | undefined>(undefined);
  const { todos, loading, error, totalItems, refetch } = useTodoListApiService(
    currentPage,
    itemsPerPage,
    dateFilter,
    priorityFilter,
    statusFilter
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
  
 
    const filterSections = [
      {
        id: "date",
        title: "Date",
        options: [
          
          { id: "start_date", label: "Start Date", checked: false },
          { id: "end_date", label: "End Date", checked: false },
      
        ]
      },
      {
        id: "priority",
        title: "Priority",
        options: [
          { id: "high", label: "High", checked: false },
          { id: "low", label: "Low", checked: false },
          { id: "medium", label: "Medium", checked: false },
         
        ]
      },
      {
        id: "status",
        title: "Status",
        options: [
          { id: "inProgress", label: "In Progress", checked: false },
          { id: "schedule", label: "Schedule", checked: false },
          { id: "complete", label: "Complete", checked: false },
        ]
      },
    
  
    ];

  
  const { handleConfirmUpdate } = useUpdateTask(refetch); // Use the update hook



  const handleFilterApply = async (payload: FilterPayload) => {
    const { filter } = payload;
    setDateFilter(filter.date);
    setStatusFilter(filter.status);
    setPriorityFilter(filter.priority);
    setCurrentPage(1);
   
  };
  return (
    <div className="p-4 max-w-[1350px] mx-auto">
      <div className="flex flex-col sm:flex-row items-center mb-6 justify-between">
        <div className="flex">
          <Title title={Todolisttitle[0].titleName} />
          <div className="ml-4">
            <Search searchText={search[2].searchText} value={""} onChange={function (value: string): void {
              throw new Error("Function not implemented.");
            } } />
          </div>
        </div>
        <HeaderButtons
          button1Text={headerbutton[2].button1text}
          button1img={headerbutton[2].button1img}
          button2Text={headerbutton[2].button2text}
          button2img={headerbutton[2].button2img}
          onClick2={showModal}
          onClick1={() => setShowFilter(true)}
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

{showFilter && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
        

          
<FilterHandler
            filterSections={filterSections}
            onFilterApply={handleFilterApply}
            setShowFilter={setShowFilter}
             pageType="todo"
          />
        </div>
      )}
    </div>

    
  );
};

export default TodoList;
