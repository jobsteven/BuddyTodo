import { memo } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import useAppStore from '../stores/useAppStore'

function AddTodoButton() {
    const setOpenTodoEditModal = useAppStore((state) => state.setOpenTodoEditModal)

    return (
        <TouchableOpacity style={styles.container} onPress={() => setOpenTodoEditModal(true)}>
            <Text style={styles.button_text}>+</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 32,
        left: '50%',
        transform: [{ translateX: -32 }],

        backgroundColor: '#fff',
        borderRadius: 100,

        width: 64,
        height: 64,

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 2.22
    },

    button_text: {
        fontSize: 48,
        color: '#333'
    }
})

export default memo(AddTodoButton)
