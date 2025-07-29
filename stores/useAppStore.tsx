import { authenticateAsync, hasHardwareAsync } from 'expo-local-authentication'
import { Alert } from 'react-native'
import { create } from 'zustand'

export type ScreenState = 'todos' | 'edit'

export type Todo = {
    id?: string
    title: string
    done?: boolean
}

type useAppStore = {
    screenRoute: ScreenState
    setScreenRoute: (route: ScreenState) => void

    openTodoEditModal: boolean
    setOpenTodoEditModal: (open: boolean) => void

    editTodo: Todo | null
    setEditTodo: (todo: Todo | null) => void

    todos: Todo[]
    addTodo: (todo: Todo) => void
    removeTodo: (id: string) => void
    updateTodo: (id: string, todo: Todo) => void
    toggleTodo: (id: string) => void

    authenticated: boolean
    needAuthorized: () => Promise<boolean>
    addTodoAuthorized: (todo: Todo) => Promise<void>
    removeTodoAuthorized: (id: string) => Promise<void>
    updateTodoAuthorized: (id: string, todo: Todo) => Promise<void>
    toggleTodoAuthorized: (id: string) => Promise<void>
}

const useAppStore = create<useAppStore>((set, get) => ({
    screenRoute: 'todos',
    setScreenRoute: (route: ScreenState) => set(() => ({ screenRoute: route })),

    editTodo: null,
    setEditTodo: (todo: Todo | null) => set(() => ({ editTodo: todo })),

    openTodoEditModal: false,
    setOpenTodoEditModal: (open: boolean) => set(() => ({ openTodoEditModal: open })),

    todos: [],
    addTodo: (todo: Todo) => set((state) => ({ todos: [todo, ...state.todos] })),
    removeTodo: (id: string) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
    updateTodo: (id: string, todo: Todo) => set((state) => ({ todos: state.todos.map((t) => (t.id === id ? todo : t)) })),
    toggleTodo: (id: string) => set((state) => ({ todos: state.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) })),

    authenticated: false,
    needAuthorized: async () => {
        if (get().authenticated) return true

        const { success } = await authenticateAsync()

        if (!success) {
            Alert.alert('Authentication failed', 'Authentication unsuccessful')
            return false
        }

        set(() => ({ authenticated: success }))

        return success
    },

    addTodoAuthorized: async (todo: Todo) => {
        const authorized = await get().needAuthorized()
        if (!authorized) return
        get().addTodo(todo)
    },

    removeTodoAuthorized: async (id: string) => {
        const authorized = await get().needAuthorized()
        if (!authorized) return
        get().removeTodo(id)
    },

    updateTodoAuthorized: async (id: string, todo: Todo) => {
        const authorized = await get().needAuthorized()
        if (!authorized) return
        get().updateTodo(id, todo)
    },

    toggleTodoAuthorized: async (id: string) => {
        const authorized = await get().needAuthorized()
        if (!authorized) return
        get().toggleTodo(id)
    }
}))

export default useAppStore
