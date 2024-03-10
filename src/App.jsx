import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";
import PageNotFound from "./components/PageNotFound";
import NavBar from "./components/NavBar";
function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
  }, []);
  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <NavBar />
        <h1 className="flex pt-7 text-3xl font-bold justify-center items-center">
          My Task
        </h1>
        <Routes>
          <Route
            path="/"
            element={<Home tasks={tasks} setTasks={setTasks} />}
          />
          <Route path="/task/:id" element={<Details />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </DndProvider>
    </BrowserRouter>
  );
}

export default App;
