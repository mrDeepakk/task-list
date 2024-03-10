import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
function CreateTask({ status, setTasks }) {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: status,
    description: "Sample Description...",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.name.length < 3)
      return toast.error("Task name must be at least 3 characters");
    setTasks((prevTasks) => {
      const list = [...prevTasks, task];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });
    toast.success("Task created successfully");
    setTask({
      id: "",
      name: "",
      status: status,
      description: "Sample Description...",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="p-3 text-md font-bold relative w-64 mt-3 shadow-md rounded-md border h-12 mb-2 flex justify-start items-center cursor-text"
        placeholder="Enter new task.."
        value={task.name}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
        onChange={(e) =>
          setTask({
            ...task,
            name: e.target.value,
            id: uuidv4(),
            status: status,
          })
        }
      />
    </form>
  );
}

export default CreateTask;
