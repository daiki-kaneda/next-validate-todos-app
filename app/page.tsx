import { OpenModalButton } from "@/src/components/CreateTodoModal";
import { TodoList } from "@/src/components/TodoList";

export default async function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Tasks</h1>
            <p className="text-slate-500 text-sm mt-1">今日やるべきことを管理しましょう</p>
          </div>
          <OpenModalButton />
        </header>

        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <TodoList />
        </section>
      </div>
    </main>
  );
}
