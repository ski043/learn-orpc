import { me, signin, signup } from "./auth";
import { createTodo, getTodos } from "./todo";

export const router = {
  todo: {
    create: createTodo,
    get: getTodos,
  },
  auth: {
    signup,
    signin,
    me,
  },
};
