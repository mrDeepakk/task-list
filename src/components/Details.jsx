import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { CiBookmarkRemove } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import toast from "react-hot-toast";

function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
  }, []);
  let task = {};
  tasks.forEach((t) => {
    if (t.id === id) {
      task = t;
    }
  });

  const handleRemoveTask = () => {
    const newTasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    toast("Task Removed Successfully", { icon: "👍" });
    navigate(-1);
  };
  const sections = ["todo", "inProgress", "completed"];

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between ">
          {isEdit && (
            <h2 className="text-3xl font-bold mb-4 ml-3 capitalize">
              {task.name}
            </h2>
          )}
          {!isEdit && (
            <input
              disabled={isEdit}
              className="text-3xl font-bold mb-4 ml-3 border-2 capitalize border-gray-300"
              value={task.name}
              onChange={(e) => {
                setTasks(
                  tasks.map((t) => {
                    if (t.id === id) {
                      return { ...t, name: e.target.value };
                    }
                    return t;
                  })
                );
              }}
            ></input>
          )}
          <div className="flex gap-3">
            {" "}
            {!isEdit && (
              <select
                className=" border-1 border-gray-300 shadow-sm rounded-md"
                value={task.status}
                onChange={(e) => {
                  setTasks(
                    tasks.map((t) => {
                      if (t.id === id) {
                        return { ...t, status: e.target.value };
                      }
                      return t;
                    })
                  );
                  localStorage.setItem("tasks", JSON.stringify(tasks));
                }}
              >
                {sections.map((section) => (
                  <option key={section} value={section}>
                    {section === "todo"
                      ? "Not Working"
                      : section === "inProgress"
                      ? "In Progress"
                      : "Completed"}
                  </option>
                ))}
              </select>
            )}
            {isEdit && (
              <MdOutlineEdit
                className="text-2xl text-gray-700 cursor-pointer"
                onClick={() => setIsEdit(!isEdit)}
              />
            )}
            {!isEdit && (
              <IoCheckmarkDoneSharp
                className="text-2xl text-gray-700 cursor-pointer"
                onClick={() => {
                  setIsEdit(!isEdit);
                  const newTasks = tasks.map((t) => {
                    if (t.id === id) {
                      return task;
                    }
                    return t;
                  });
                  localStorage.setItem("tasks", JSON.stringify(newTasks));
                  if (task.name.length < 3) {
                    return toast("Task title is less than 3️⃣ character", {
                      icon: "⚠️",
                    });
                  }
                  return toast.success("Task updated successfully");
                }}
              />
            )}
            <CiBookmarkRemove
              className="text-2xl text-gray-700 cursor-pointer"
              onClick={() => handleRemoveTask()}
            />
          </div>
        </div>
        {isEdit && (
          <h6 className="w-full h-40 p-2 ml-3 rounded-md">
            {task.description}
          </h6>
        )}
        {!isEdit && (
          <textarea
            placeholder="Write a Description for this task✍️..."
            className="w-full h-40 p-2 ml-3 rounded-md border-2 border-gray-300"
            value={task.description}
            onChange={(e) => {
              setTasks(
                tasks.map((t) => {
                  if (t.id === id) {
                    return { ...t, description: e.target.value };
                  }
                  return t;
                })
              );
            }}
          ></textarea>
        )}
      </div>
    </div>
  );
}

export default Details;
