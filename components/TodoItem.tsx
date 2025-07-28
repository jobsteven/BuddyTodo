import { useCallback } from "react";
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import useAppStore, { type Todo } from "../stores/useAppStore";

function TodoItem({ todo }: { todo: Todo }) {
    const removeTodo = useAppStore((state) => state.removeTodo);
    const toggleTodo = useAppStore((state) => state.toggleTodo);
    const setEditTodo = useAppStore((state) => state.setEditTodo);
    const setOpenTodoEditModal = useAppStore((state) => state.setOpenTodoEditModal);

    const handleDelete = useCallback(() => {
        Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", onPress: () => todo.id && removeTodo(todo.id) },
        ]);
    }, [removeTodo, todo.id]);

    const handleEdit = useCallback(() => {
        setEditTodo(todo);
        setOpenTodoEditModal(true);
    }, [todo, setEditTodo, setOpenTodoEditModal]);

    const handleDone = useCallback(() => {
        if (todo.id) {
            toggleTodo(todo.id);
        }
    }, [toggleTodo, todo.id]);

    return (
        <View style={styles.container}>
            <Text>{todo.title}</Text>

            <View style={styles.actions}>
                {/* CheckBox */}
                {/* <Switch style={styles.checkbox} value={todo.done} onValueChange={handleDone} /> */}
                <TouchableOpacity onPress={handleDone}>
                    <Text style={todo.done && styles.done_btn_text}>{todo.done ? "Undo" : "Done"}</Text>
                </TouchableOpacity>

                {!todo.done && (
                    <>
                        {/* Edit */}
                        <TouchableOpacity onPress={handleEdit}>
                            <Text>Edit</Text>
                        </TouchableOpacity>

                        {/* Delete */}
                        <TouchableOpacity onPress={handleDelete}>
                            <Text style={styles.del_btn_text}>Delete</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
        marginVertical: 2,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
    },
    del_btn_text: {
        color: "#ff0000",
    },
    done_btn_text: {
        color: "#00ff00",
    },
    checkbox: {
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
});

export default TodoItem;
