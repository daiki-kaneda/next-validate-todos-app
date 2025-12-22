import { z } from 'zod';

//   {
//     "userId": 1,
//     "id": 1,
//     "title": "delectus aut autem",
//     "completed": false
//   }

export const TodoSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string().min(1, "タイトルは必須です。"),
    completed: z.boolean()
});

export const CreateTodoSchema = TodoSchema.omit({
    userId:true,
    id:true,
    completed:true
});

export type Todo = z.infer<typeof TodoSchema>;
export type CreateTodoInput = z.infer<typeof CreateTodoSchema>;
