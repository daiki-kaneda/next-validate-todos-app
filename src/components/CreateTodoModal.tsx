"use client";
import { useModalStore } from "../lib/store/ModalStore";
import { CreateTodoForm } from "./CreateTodoForm";

export function CreateTodoModal() {
    const { open, closeModal } = useModalStore();

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* 背景のオーバーレイ（ぼかし効果） */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeModal} />
            
            {/* モーダル本体 */}
            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">新しいタスクを追加</h2>
                    <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                        ✕
                    </button>
                </div>
                
                <CreateTodoForm/>
            </div>
        </div>
    );
}

export function OpenModalButton() {
    const openModal = useModalStore((state) => state.openModal);
    return (
        <button 
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-full shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
            + タスクを追加
        </button>
    );
}