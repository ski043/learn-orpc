import { client } from "@/lib/orpc";
import { isDefinedError, safe } from "@orpc/server";

export default async function Home() {
  const [error, data, isDefined] = await safe(client.todo.get({ amount: 5 }));

  if (isDefinedError(error)) {
    // or isDefined
    // handle known error
    console.log(error.code === "UNAUTHORIZED");
  }

  return <h1>yoo</h1>;
}
