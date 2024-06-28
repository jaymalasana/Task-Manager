import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Addtask from "./components/Addtask";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import UpdateTask from "./components/UpdateTask";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addtasks" element={<Addtask />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/:id" element={<UpdateTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
