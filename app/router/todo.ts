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
  .input(z.void())
  .output(z.array(TodoSchema))
  .handler(async ({ context }) => {
    const todos = await prisma.todo.findMany();

    return todos;
  });
