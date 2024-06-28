"use strict";

var express = require("express");

var cors = require("cors");

var Task = require("./db/task.models");

require("./db/config");

var app = express();
app.use(cors());
app.use(express.json()); // Route to add task

app.post("/addtasks", function _callee(req, res) {
  var task, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // console.log("Add Task Request Body:", req.body);
          task = new Task(req.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(task.save());

        case 4:
          result = _context.sent;
          // console.log("Task Saved:", result);
          res.status(201).send(result);
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error("Error saving task:", _context.t0);
          res.status(500).send({
            error: "Failed to save task"
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Route for getting all task

app.get("/tasks", function _callee2(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Task.find());

        case 3:
          result = _context2.sent;
          // console.log("Tasks Retrieved:", result);
          res.send(result);
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error("Error fetching tasks:", _context2.t0);
          res.status(500).send({
            error: "Failed to fetch tasks"
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Delete a task

app["delete"]("/task/:id", function _callee3(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Task.deleteOne({
            _id: req.params.id
          }));

        case 3:
          result = _context3.sent;
          // console.log("Delete Result:", result);
          res.send(result);
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error("Error deleting task:", _context3.t0);
          res.status(500).send({
            error: "Failed to delete task"
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Task by one id

app.get("/tasks/:id", function _callee4(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Task.findOne({
            _id: req.params.id
          }));

        case 3:
          result = _context4.sent;

          if (result) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).send({
            error: "Task not found"
          }));

        case 6:
          res.json(result);
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error("Error fetching task by ID:", _context4.t0);
          res.status(500).send({
            error: "Failed to fetch task"
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Route for update task

app.put("/tasks/:id", function _callee5(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Task.updateOne({
            _id: req.params.id
          }, {
            $set: req.body
          }));

        case 3:
          result = _context5.sent;
          res.send(result);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.log("Error", _context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.listen(8080, function () {
  console.log("Server is running on port 8080");
});