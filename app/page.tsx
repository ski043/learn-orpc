import { SimpleTodoForm } from "@/components/todo/simple-todo-form";
import { client } from "@/lib/orpc";
import { isDefinedError, safe } from "@orpc/server";

export default async function Home() {
  const [error, data, isDefined] = await safe(
    client.todo.getTodos({ amount: 5 })
  );

  if (isDefinedError(error)) {
    // or isDefined
    // handle known error
    console.log(error.code === "FORBIDDEN");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <SimpleTodoForm />
    </main>
  );
}
