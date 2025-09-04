"use client";

import { useQuery } from "@tanstack/react-query";
import { TanstackForm } from "./_components/tanstack-form";
import { orpc } from "@/lib/orpc";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const query = useQuery(
    orpc.todo.getTodos.queryOptions({
      input: { amount: 5 }, // Specify input if needed
    })
  );
  return (
    <main className="min-h-screen flex flex-col items-center mt-36 w-full">
      <TanstackForm />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 w-full px-10">
        {query.data?.map((todo) => (
          <Card key={todo.id}>
            <CardHeader>
              <CardTitle className="text-base">Preview</CardTitle>
              <CardDescription>Rendered below after submit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">Title</span>
                <p className="font-medium">{todo.title}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Description
                </span>
                <p className="whitespace-pre-wrap">{todo.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
