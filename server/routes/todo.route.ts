import { Router } from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router()

router.route("/create").post(verifyJWT, createTodo)

router.route("/get").get(verifyJWT, getAllTodos)

router.route("/update/:todo_id").put(verifyJWT, updateTodo)

router.route("/delete/:todo_id").delete(verifyJWT, deleteTodo)

export default router