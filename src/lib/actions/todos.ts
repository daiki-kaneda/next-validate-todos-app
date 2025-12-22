"use server";
import { z } from 'zod';
import { CreateTodoSchema, Todo, TodoSchema } from '../schemas/Todo';
import { revalidatePath } from 'next/cache';

export type FormState = {
    message?: string,
    success: boolean
};
export async function createTodoAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const title = formData.get("title");
    const fields = {
        title: title
    }

    const result = CreateTodoSchema.safeParse(fields);

    if (!result.success) {
        return { message: result.error.message, success: false }
    }

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...result.data,
                    userId: 1,
                    id: 1
                }
                )
            });
        if (response.ok) {
            revalidatePath("/")
            return { message: `Todo:${title}を作成しました.`, success: true };
        } else {
            return { message: `${response.status}:エラーが発生しました.`, success: false }
        }
    } catch {
        return { message: `予期せぬエラーが発生しました.`, success: false }
    }
}

export async function getTodos(): Promise<Todo[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        next: { revalidate: 60 }
    })
    const rawData = await response.json();

    const result = z.array(TodoSchema).safeParse(rawData);

    if (!result.success) {
        console.log(result.error);
        return [];
    }

    return result.data.slice(0, 10);
}

