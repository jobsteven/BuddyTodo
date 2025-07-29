import { useCallback } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useAppStore, { type Todo } from '../stores/useAppStore'

function TodoItem({ todo }: { todo: Todo }) {
    const removeTodoAuthorized = useAppStore((state) => state.removeTodoAuthorized)
    const toggleTodoAuthorized = useAppStore((state) => state.toggleTodoAuthorized)
    const setEditTodo = useAppStore((state) => state.setEditTodo)
    const setOpenTodoEditModal = useAppStore((state) => state.setOpenTodoEditModal)

    const handleDelete = useCallback(() => {
        Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: () => todo.id && removeTodoAuthorized(todo.id) }
        ])
    }, [removeTodoAuthorized, todo.id])

    const handleEdit = useCallback(() => {
        setEditTodo(todo)
        setOpenTodoEditModal(true)
    }, [todo, setEditTodo, setOpenTodoEditModal])

    const handleDone = useCallback(() => {
        if (todo.id) {
            toggleTodoAuthorized(todo.id)
        }
    }, [toggleTodoAuthorized, todo.id])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{todo.title}</Text>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.actions_btn} onPress={handleDone}>
                    <Text style={todo.done && styles.done_btn_text}>{todo.done ? 'Undo' : 'Done'}</Text>
                </TouchableOpacity>

                {!todo.done && (
                    <>
                        {/* Edit */}
                        <TouchableOpacity style={styles.actions_btn} onPress={handleEdit}>
                            <Text>Edit</Text>
                        </TouchableOpacity>

                        {/* Delete */}
                        <TouchableOpacity style={styles.actions_btn} onPress={handleDelete}>
                            <Text style={styles.del_btn_text}>Delete</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 2,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    title: {
        flex: 1
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 4
    },
    actions_btn: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 4,
        paddingHorizontal: 4,
        borderRadius: 8
    },
    del_btn_text: {
        color: '#ff0000'
    },
    done_btn_text: {
        color: '#00ff00'
    },
    checkbox: {
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
    }
})

export default TodoItem
