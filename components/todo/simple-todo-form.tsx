"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/orpc";

interface TodoFormValues {
  title: string;
  description: string;
}

export function SimpleTodoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<TodoFormValues | null>(
    null
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: TodoFormValues = {
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
    };

    if (!values.title && !values.description) return;

    setIsSubmitting(true);
    try {
      // TODO: mutate using your ORPC procedure here, e.g.:
      // await client.todo.createTodo(values)

      await client.todo.createTodo(values);

      setLastSubmitted(values);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Todo</CardTitle>
          <CardDescription>
            Add a title and description, then submit.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="contents">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input id="title" name="title" placeholder="Buy milk" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="2% milk, 1 gallon"
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="ml-auto">
              {isSubmitting ? "Submitting..." : "Add Todo"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {lastSubmitted && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Preview</CardTitle>
            <CardDescription>Rendered below after submit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Title</span>
              <p className="font-medium">{lastSubmitted.title}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Description</span>
              <p className="whitespace-pre-wrap">{lastSubmitted.description}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
