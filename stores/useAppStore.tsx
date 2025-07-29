import { create } from "zustand";

export type ScreenState = "todos" | "edit";

export type Todo = {
    id?: string;
    title: string;
    done?: boolean;
};

type useAppStore = {
    screenRoute: ScreenState;
    setScreenRoute: (route: ScreenState) => void;

    openTodoEditModal: boolean;
    setOpenTodoEditModal: (open: boolean) => void;

    editTodo: Todo | null;
    setEditTodo: (todo: Todo | null) => void;

    todos: Todo[];
    addTodo: (todo: Todo) => void;
    removeTodo: (id: string) => void;
    updateTodo: (id: string, todo: Todo) => void;
    toggleTodo: (id: string) => void;
};

const useAppStore = create<useAppStore>((set) => ({
    screenRoute: "todos",
    setScreenRoute: (route: ScreenState) => set(() => ({ screenRoute: route })),

    editTodo: null,
    setEditTodo: (todo: Todo | null) => set(() => ({ editTodo: todo })),

    openTodoEditModal: false,
    setOpenTodoEditModal: (open: boolean) => set(() => ({ openTodoEditModal: open })),

    todos: [],
    addTodo: (todo: Todo) => set((state) => ({ todos: [...state.todos, todo] })),
    removeTodo: (id: string) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
    updateTodo: (id: string, todo: Todo) => set((state) => ({ todos: state.todos.map((t) => (t.id === id ? todo : t)) })),
    toggleTodo: (id: string) => set((state) => ({ todos: state.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) })),
}));

export default useAppStore;
