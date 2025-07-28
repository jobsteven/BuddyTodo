import { StyleSheet, Text, View } from "react-native";

export default function NotFound() {
    return (
        <View style={styles.main}>
            <Text>NotFound</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
});
