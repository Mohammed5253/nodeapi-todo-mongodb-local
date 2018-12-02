import express from "express";
import * as todoController from "../controllers/controller.todo";

//get an instance of express router
const router = express.Router();

router
  .route("/")
  .get(todoController.getTodos)
  .post(todoController.addTodo)
  .put(todoController.updateTodo);

router
  .route("/:id")
  .get(todoController.getTodo)
  .delete(todoController.deleteTodo);

export default router;
