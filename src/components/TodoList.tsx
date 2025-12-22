import { getTodos } from "../lib/actions/todos";

export async function TodoList() {
  const todos = await getTodos();

  if (todos.length === 0) {
    return <div className="p-12 text-center text-slate-400">タスクがありません</div>;
  }

  return (
    <div className="divide-y divide-slate-100">
      {todos.map((todo) => (
        <div key={todo.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors group">
          {/* 未完了状態を視覚化するダミーチェックボックス */}
          <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-blue-500 transition-colors" />
          <span className="text-slate-700 font-medium">{todo.title}</span>
        </div>
      ))}
    </div>
  );
}