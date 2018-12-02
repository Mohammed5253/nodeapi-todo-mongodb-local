import mongoose from "mongoose";

//import models
import Todo from "../models/model.todo";

export const getTodos = (req, res) => {
  Todo.find().exec((err, todos) => {
    if (err) {
      return res.json({
        code: "999",
        message: "Exe Error",
        success: false,
        err: err
      });
    } else {
      return res.json({ code: "1000", message: todos, success: true });
    }
  });
};

export const addTodo = (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo.save((err, todo) => {
    if (err) {
      return res.json({
        code: "999",
        message: "Exe Error",
        success: false,
        err: err
      });
    } else {
      return res.json({
        code: 1000,
        message: todo
      });
    }
  });
};

export const updateTodo = (req, res) => {
  Todo.findOneAndUpdate(
    { _id: req.body.id },
    req.body,
    { new: true },
    (err, todo) => {
      if (err) {
        return res.json({
          code: "999",
          message: "Exe Error",
          success: false,
          err: err
        });
      } else {
        return res.json({
          code: 1000,
          message: todo
        });
      }
    }
  );
};

export const getTodo = (req, res) => {
  Todo.find({ _id: req.params.id }).exec((err, todo) => {
    if (err) {
      return res.json({
        code: "999",
        message: "Exe Error",
        success: false,
        err: err
      });
    }
    if (todo.length) {
      return res.json({
        code: 1000,
        message: todo
      });
    } else {
      return res.json({
        code: "000",
        message: "No Todo Found."
      });
    }
  });
};

export const deleteTodo = (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err, todo) => {
    if (err) {
      return res.json({
        code: "999",
        message: "Exe Error",
        success: false,
        err: err
      });
    } else {
      return res.json({
        code: 1000,
        message: todo.todoText + "deleted successfully"
      });
    }
  });
};
