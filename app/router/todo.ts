import { ORPCError, os } from "@orpc/server";
import z from "zod";
import { TodoSchema } from "../schemas/todo";
import prisma from "@/lib/db";
import { authed } from "../middlewares/auth";

export const createTodo = authed
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  )
  .output(TodoSchema)
  .handler(async ({ context, input }) => {
    const todo = await prisma.todo.create({
      data: {
        title: input.title,
        description: input.description,
      },
    });

    return todo;
  });

export const getTodos = authed
  .input(
    z.object({
      amount: z.number(),
    })
  )
  .output(z.array(TodoSchema))
  .errors({
    FORBIDDEN: {
      message: "You are not authorized to do this",
      status: 403,
    },
  })

  .handler(async ({ context, input, errors }) => {
    if (input.amount > 10) {
      throw errors.FORBIDDEN();
    }

    const todos = await prisma.todo.findMany();

    return todos;
  });
