// AddTask.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const addTask = async () => {
    let result = await fetch("http://localhost:8080/addtasks", {
      method: "POST",
      body: JSON.stringify({ title, description, status }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log("Result", result);
    navigate("/tasks");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Add Task</h1>
      <label className="block mb-2">Title:</label>
      <input
        type="text"
        required
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        placeholder="Add title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label className="block mb-2">Description:</label>
      <input
        type="text"
        required
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        placeholder="Add Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="" disabled>Select status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
