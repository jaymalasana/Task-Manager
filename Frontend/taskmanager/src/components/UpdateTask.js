// UpdateTask.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getTaskById = async (id) => {
      try {
        let result = await fetch(`http://localhost:8080/tasks/${id}`);
        if (!result.ok) {
          throw new Error("Failed to fetch task");
        }
        result = await result.json();
        setTitle(result.title);
        setDescription(result.description);
        setStatus(result.status);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    if (params.id) {
      getTaskById(params.id);
    }
  }, [params.id]);

  const updateTask = async () => {
    try {
      let result = await fetch(`http://localhost:8080/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description, status }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!result.ok) {
        throw new Error("Failed to update task");
      }
      result = await result.json();
      console.log("Update result:", result);
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Update Task</h1>
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
        <option value="" disabled>
          Select status
        </option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={updateTask}
      >
        Update Task
      </button>
    </div>
  );
};

export default UpdateTask;
