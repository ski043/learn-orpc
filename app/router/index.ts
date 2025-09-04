import { me, signin, signup } from "./auth";
import { createTodo, getTodos } from "./todo";

export const router = {
  todo: {
    createTodo: createTodo,
    getTodos: getTodos,
  },
  auth: {
    signup,
    signin,
    me,
  },
};
