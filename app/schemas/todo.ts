import z from "zod";

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

export type TodoSchemaType = z.infer<typeof TodoSchema>;
