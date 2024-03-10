import React from "react";
import { useNavigate } from "react-router-dom";
import { useDrag } from "react-dnd";

const SingleTask = ({ task }) => {
  const navigate = useNavigate();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  // console.log(isDragging);
  const handleClick = (id) => {
    navigate(`/task/${id}`);
  };

  return (
    <div
      onClick={() => handleClick(task.id)}
      ref={drag}
      className={`relative mt-3 shadow-md rounded-md border h-12 mb-2 flex justify-start items-center ${
        isDragging ? "opacity-25" : "opacity-100"
      } cursor-pointer`}
    >
      <h3 className={`text-lg ml-3 font-medium capitalize`}>{task.name}</h3>
    </div>
  );
};
export default SingleTask;
