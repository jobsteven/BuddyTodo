import { memo, useEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import TodoItem from "../components/TodoItem";
import useAppStore from "../stores/useAppStore";

function Todos() {
    const todos = useAppStore((state) => state.todos);
    const flatListRef = useRef<FlatList>(null);
    const sortedTodos = todos.sort((a, b) => {
        if (a.done && !b.done) return 1;
        if (!a.done && b.done) return -1;
        return 0;
    });

    // Scroll to bottom when new todo is added
    useEffect(() => {
        if (sortedTodos.length > 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
            }, 250);
        }
    }, [sortedTodos.length]);

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.header_title}>BuddyTodo</Text>
            </View>
            {todos.length > 0 ? (
                <FlatList
                    ref={flatListRef}
                    data={sortedTodos}
                    renderItem={({ item }) => <TodoItem todo={item} />}
                    keyExtractor={(item) => item.id || ""}
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.no_todo_container}>
                    <Text style={styles.no_todo_text}>No tasks? You're not lazy 😎</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 16,
        paddingBottom: 72,
    },
    header: {
        marginBottom: 16,
    },
    header_title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 64,
    },
    no_todo_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    no_todo_text: {
        fontSize: 16,
    },
});

export default memo(Todos);
