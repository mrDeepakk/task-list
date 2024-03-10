import React from "react";
import ListTask from "./ListTask";
function Home({ tasks, setTasks }) {
  return (
    <div className="w-screen h-screen flex flex-col items-center p-32 gap-16">
      <ListTask tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default Home;
