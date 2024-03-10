import { useDrop } from "react-dnd";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import SingleTask from "./SingleTask";
import { FaPlus } from "react-icons/fa6";
import CreateTask from "./CreateTask";
const Section = ({ tasks, setTasks, status, todo, inProgress, completed }) => {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, [tasks]);
  // const [fortodo, setFortodo] = useState(false);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addToAnotherSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let title = "Not started";
  let bg = "bg-[#fecdd1]";
  let taskToMap = todo;
  if (status === "inProgress") {
    title = "In Progress";
    bg = "bg-[#fbeecc]";
    taskToMap = inProgress;
  }
  if (status === "completed") {
    title = "Completed";
    bg = "bg-[#cde7e0]";
    taskToMap = completed;
  }
  const addToAnotherSection = (id) => {
    setTasks((prev) => {
      const mtask = prev.map((item) => {
        if (item.id === id) {
          return { ...item, status: status };
        }
        return item;
      });
      localStorage.setItem("tasks", JSON.stringify(mtask));
      return mtask;
    });
  };
  return (
    <div ref={drop} className={`w-64 ${isOver ? "bg-slate-200" : ""}`}>
      <Header
        setFlag={setFlag}
        title={title}
        bg={bg}
        count={taskToMap.length}
      />
      {taskToMap.length > 0 &&
        taskToMap.map((item) => (
          <SingleTask key={item.id} task={item}></SingleTask>
        ))}
      <div
        className={`relative mt-3 border-none rounded-md border h-12 mb-2 flex justify-start items-center cursor-pointer`}
      >
        {flag && (
          <CreateTask tasks={tasks} setTasks={setTasks} status={status} />
        )}
        {!flag && (
          <div
            className="flex"
            onClick={() => {
              setFlag(!flag);
            }}
          >
            <FaPlus className={`text-lg ml-3`} />
            <h3 className={`text-lg ml-3 font-medium capitalize`}>New Task</h3>
          </div>
        )}
      </div>
    </div>
  );
};
export default Section;
