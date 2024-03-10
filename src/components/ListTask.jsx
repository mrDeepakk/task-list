import React, { useEffect, useState } from "react";
import Section from "./Section";
function ListTask({ tasks, setTasks }) {
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
  }, [tasks]);
  useEffect(() => {
    const ftodo = tasks.filter((task) => task.status === "todo");
    const fprogress = tasks.filter((task) => task.status === "inProgress");
    const fcompleted = tasks.filter((task) => task.status === "completed");
    setTodo(ftodo);
    setCompleted(fcompleted);
    setInProgress(fprogress);
  }, [tasks]);
  const sections = ["todo", "inProgress", "completed"];

  return (
    <div className="flex gap-5">
      {sections.map((item) => (
        <Section
          key={item}
          tasks={tasks}
          setTasks={setTasks}
          sections={sections}
          status={item}
          todo={todo}
          inProgress={inProgress}
          completed={completed}
        />
      ))}
    </div>
  );
}

export default ListTask;
