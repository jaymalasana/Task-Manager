// TaskList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      const response = await fetch("http://localhost:8080/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/task/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      getAllTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Tasks</h1>
      {tasks.map((task) => (
        <div key={task._id} className="bg-white shadow-md rounded p-4 mb-4">
          <ul>
            <li className="mb-2">
              <span className="font-semibold">Title:</span> {task.title}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Description:</span>{" "}
              {task.description || "No description provided"}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Status:</span> {task.status}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(task.createdAt).toISOString().split("T")[0]}
            </li>
            <li className="flex space-x-2">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
              <Link to={`/tasks/${task._id}`}>
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Edit
                </button>
              </Link>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
