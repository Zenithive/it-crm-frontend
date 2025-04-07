import React, { useEffect  } from "react";
import { useForm } from "react-hook-form";
import useCreateTask from "../api/apiService/createTaskModalApiService";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Task } from "./TaskTable";
import PubSub from "../pubsub/Pubsub";

dayjs.extend(utc);

interface TaskFormData {
  taskID?: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

interface CreateTaskModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onClose: () => void;
  initialTaskData?: Task | null;
  onUpdateTask: (taskID: string, input: TaskFormData) => void;
  refetch: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  setVisible,
  onClose,
  initialTaskData,
  onUpdateTask,
  refetch,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<TaskFormData>();
  const { createTask, loading } = useCreateTask();
 
  
  useEffect(() => {
    if (initialTaskData) {
      console.log(`initialTaskData`, initialTaskData);
      setValue("title", initialTaskData.title);
      setValue("description", initialTaskData.description || "");
      setValue("status", initialTaskData.status);
      setValue("priority", initialTaskData.priority);
      setValue(
        "dueDate",
        initialTaskData.dueDate ? dayjs(initialTaskData.dueDate).toISOString() : ""
      );
    }else{
      reset({
        title: "",
        description: "",
        status: "",
        priority: "",
        dueDate: "",
      });
    }
  }, [initialTaskData, setValue,reset]);

  const handleDateChange = (value: dayjs.Dayjs | null) => {
    setValue("dueDate", value ? value.toISOString() : "");
  };
  

  const statusValue = watch("status");
  
  const priorityValue = watch("priority");
  const getSelectTextColorClass = (value: string | undefined) => {
    return value ? "text-black" : "text-gray-400";
  };
  const onSubmit = async (data: TaskFormData) => {
    try {
      if (initialTaskData) {
        onUpdateTask(initialTaskData.taskID, data);

        
        PubSub.publish("TODO", { 
          title: `${data.title}`,
          component:"todoupdate"
    
          
          });
      } else {
        await createTask(data);


        PubSub.publish("TODO", { 
          title: `${data.title}`,
          component:"todoadd"
    
          
          });
      }
      reset();
      onClose();
      setVisible(false);
      refetch();
    } catch (error) {
      console.error("Failed to process task:", error);
      
      PubSub.publish("TODO_ERROR", {     
        });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"  onClick={onClose}>
      <div className=" rounded-lg shadow-lg w-full max-w-lg"  onClick={(e) => e.stopPropagation()}>
        <div className="bg-bg-blue-12 rounded-t-2xl p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            {initialTaskData ? "Edit Task" : "Create Task"}
          </h2>
          <button
            className="text-gray-500 bg-white hover:text-gray-700 p-3 rounded-lg"
            onClick={onClose}
          >
            <img src="cross_icon.svg" alt="Close" className="h-3 w-3" />
          </button>
        </div>

        <div className="p-6 bg-white rounded-b-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-base font-medium text-bg-blue-12 mb-1">
                Title
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                placeholder="Title"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-bg-blue-12 mb-1">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-medium text-bg-blue-12 mb-1">
                  Status
                </label>
                <select
                  {...register("status")}
                  className={`w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none  ${getSelectTextColorClass( statusValue)}`}
                >
                  <option value="">Select Status</option>
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-base font-medium text-bg-blue-12 mb-1">
                  Priority
                </label>
                <select
                  {...register("priority")}
                  className={`w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none  ${getSelectTextColorClass( priorityValue)}`}
                >
                  <option value="">Select Priority</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-bg-blue-12 mb-1">
                Due Date
              </label>
              <DatePicker
                showTime
                value={watch("dueDate") ? dayjs(watch("dueDate")) : null} // Ensure dayjs format
                onChange={handleDateChange}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                placeholder="Select Due Date"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-bg-blue-12 text-white rounded-lg"
            >
              {initialTaskData ? "Update" : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
