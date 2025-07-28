import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from "react-native";
import AddTodoButton from "./components/AddTodoButton";
import TodoEditModal from "./components/TodoEditModal";
import NotFound from "./pages/NotFound";
import { routes } from "./pages/routes";
import useAppStore from "./stores/useAppStore";

function App() {
    const isDarkMode = useColorScheme() === "dark";
    const screenRoute = useAppStore((state) => state.screenRoute);
    const Screen = routes[screenRoute as keyof typeof routes];

    return (
        <>
            <SafeAreaView style={styles.app}>
                <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
                {Screen ? <Screen /> : <NotFound />}
                <AddTodoButton />
            </SafeAreaView>
            <TodoEditModal />
        </>
    );
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
});

export default App;
