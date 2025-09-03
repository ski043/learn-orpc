import { os } from "@orpc/server";
import z from "zod";
import { TodoSchema } from "../schemas/todo";
import prisma from "@/lib/db";

export const createTodo = os
  .route({
    method: "POST",
    path: "/todos",
    summary: "Create a new todo",
    tags: ["Todos"],
  })
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  )
  .output(TodoSchema)

  .handler(async ({ context, input }) => {
    const channel = await prisma.todo.create({
      data: {
        title: input.title,
        description: input.description,
      },
    });

    return channel;
  });

export const getTodos = os
  .route({
    method: "GET",
    path: "/todos",
    summary: "Get all todos",
    tags: ["Todos"],
  })
  .input(
    z.object({
      amount: z.number(),
    })
  )
  .output(z.array(TodoSchema))
  .errors({
    UNAUTHORIZED: {
      message: "You are not authorized to do this",
      status: 401,
    },
  })
  .handler(async ({ context, input, errors }) => {
    if (input.amount > 10) {
      throw errors.UNAUTHORIZED();
    }

    const todos = await prisma.todo.findMany();

    return todos;
  });
