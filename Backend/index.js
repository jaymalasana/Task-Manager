const express = require("express");
const cors = require("cors");
const Task = require("./db/task.models");
require("./db/config");

const app = express();

app.use(cors());
app.use(express.json());

// Route to add task
app.post("/addtasks", async (req, res) => {
  try {
    // console.log("Add Task Request Body:", req.body);
    let task = new Task(req.body);
    let result = await task.save();
    // console.log("Task Saved:", result);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error saving task:", error);
    res.status(500).send({ error: "Failed to save task" });
  }
});

// Route for getting all task
app.get("/tasks", async (req, res) => {
  try {
    let result = await Task.find();
    // console.log("Tasks Retrieved:", result);
    res.send(result);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send({ error: "Failed to fetch tasks" });
  }
});

// Delete a task
app.delete("/task/:id", async (req, res) => {
  try {
    // console.log("Delete Task ID:", req.params.id);
    const result = await Task.deleteOne({ _id: req.params.id });
    // console.log("Delete Result:", result);
    res.send(result);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send({ error: "Failed to delete task" });
  }
});

// Task by one id
app.get("/tasks/:id", async (req, res) => {
  try {
    let result = await Task.findOne({ _id: req.params.id });
    if (!result) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).send({ error: "Failed to fetch task" });
  }
});

// Route for update task
app.put("/tasks/:id", async (req, res) => {
  try {
    let result = await Task.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      }
    );
    res.send(result);
  } catch (error) {
    console.log("Error", error);
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
