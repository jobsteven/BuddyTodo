import { memo, useEffect, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
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
            }, 100);
        }
    }, [sortedTodos.length]);

    return (
        <View style={styles.screen}>
            <FlatList
                ref={flatListRef}
                style={styles.list}
                data={sortedTodos}
                renderItem={({ item }) => <TodoItem todo={item} />}
                keyExtractor={(item) => item.id || ""}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 16,
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 64,
    },
});

export default memo(Todos);
