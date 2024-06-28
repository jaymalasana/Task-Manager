// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-800 p-4">
      <h1 className="text-3xl font-bold text-white text-center">Task Manager</h1>
      <ul className="flex justify-center mt-4">
        <li className="mx-4">
          <Link to="/addtasks" className="text-white hover:text-gray-300">Add Task</Link>
        </li>
        <li className="mx-4">
          <Link to="/tasks" className="text-white hover:text-gray-300">Tasks</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
