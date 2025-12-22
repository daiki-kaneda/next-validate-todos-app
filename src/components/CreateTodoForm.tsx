"use client";
import { useActionState, useEffect } from "react";
import { createTodoAction } from "../lib/actions/todos";
import { useModalStore } from "../lib/store/ModalStore";

const initialFormState = { message: "", success: false };

export function CreateTodoForm() {
    const [state, formAction, isPending] = useActionState(createTodoAction, initialFormState);
    const closeModal = useModalStore((state) => state.closeModal);

    // 成功時に自動で閉じる
    useEffect(() => {
        if (state.success) {
            const timer = setTimeout(closeModal, 800);
            return () => clearTimeout(timer);
        }
    }, [state.success, closeModal]);

    return (
        <form action={formAction} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                    タイトル
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="例: 牛乳を買う"
                    className={`w-full p-3 rounded-xl border bg-slate-50 outline-none transition-all focus:ring-2 text-gray-900 ${
                        state.errors?.title 
                        ? "border-red-300 focus:ring-red-100" 
                        : "border-slate-200 focus:ring-blue-100 focus:border-blue-400"
                    }`}
                    disabled={isPending}
                />
                {state.errors?.title && (
                    <p className="text-red-500 text-xs mt-2 ml-1 animate-pulse">
                        {state.errors.title.errors[0]}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 disabled:bg-slate-300 transition-all flex justify-center items-center"
                >
                    {isPending ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : "タスクを保存する"}
                </button>

                {state.message && (
                    <p className={`text-center text-sm font-medium p-2 rounded-lg ${
                        state.success ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50"
                    }`}>
                        {state.message}
                    </p>
                )}
            </div>
        </form>
    );
}