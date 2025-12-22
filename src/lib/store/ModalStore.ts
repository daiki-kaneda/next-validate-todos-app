import { create } from "zustand";

type ModalState = {
    open:boolean;
    openModal:()=>void;
    closeModal:()=>void
};

export const useModalStore = create<ModalState>((set)=>({
    open:false,
    openModal:()=>set({open:true}),
    closeModal:()=>set({open:false})
}));