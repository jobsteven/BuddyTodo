import { Alert, KeyboardAvoidingView, Modal, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import useAppStore from '../stores/useAppStore'
import { generateLocalId } from '../utils'

function TodoEditModal() {
    const openTodoEditModal = useAppStore((state) => state.openTodoEditModal)
    const editTodo = useAppStore((state) => state.editTodo)
    const setEditTodo = useAppStore((state) => state.setEditTodo)
    const setOpenTodoEditModal = useAppStore((state) => state.setOpenTodoEditModal)
    const addTodoAuthorized = useAppStore((state) => state.addTodoAuthorized)
    const updateTodoAuthorized = useAppStore((state) => state.updateTodoAuthorized)

    const handleSave = () => {
        if (!editTodo?.title) {
            handleCloseModal()
            return
        }

        // update todo
        if (editTodo?.id) {
            updateTodoAuthorized(editTodo.id, {
                id: editTodo.id,
                title: editTodo.title,
                done: editTodo.done
            })
        }

        // add todo
        if (!editTodo?.id) {
            addTodoAuthorized({
                id: generateLocalId(),
                title: editTodo?.title || '',
                done: false
            })
        }

        setOpenTodoEditModal(false)
        setEditTodo(null)
    }

    const handleCloseModal = () => {
        setOpenTodoEditModal(false)
        setEditTodo(null)
    }

    const handleTouchOutside = () => {
        if (editTodo?.title) {
            Alert.alert('Are you sure you want to discard your changes?', 'You will lose your changes.', [
                {
                    text: 'Discard',
                    style: 'destructive',
                    onPress: handleCloseModal
                },
                { text: 'Cancel', style: 'cancel' }
            ])
        } else {
            handleCloseModal()
        }
    }

    return (
        <Modal transparent animationType="slide" visible={openTodoEditModal} onRequestClose={handleCloseModal} onAccessibilityAction={handleCloseModal}>
            <TouchableWithoutFeedback onPress={handleTouchOutside}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View style={styles.container}>
                        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                            <SafeAreaView style={styles.safe_area_container}>
                                <View style={styles.input_container}>
                                    <TextInput
                                        style={styles.title_input}
                                        value={editTodo?.title}
                                        autoFocus={true}
                                        placeholder="What's on your mind?"
                                        onChangeText={(text) => setEditTodo({ ...editTodo, title: text })}
                                    />
                                    <TouchableOpacity style={styles.save_btn} onPress={handleSave}>
                                        <Text style={styles.save_btn_text}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </SafeAreaView>
                        </TouchableWithoutFeedback>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },

    safe_area_container: {
        backgroundColor: '#fff'
    },

    input_container: {
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        gap: 8
    },

    title_input: {
        flex: 1,
        fontSize: 24,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 10
    },

    save_btn: {
        borderRadius: 5,
        color: '#fff',
        backgroundColor: '#0145a6'
    },

    save_btn_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 10
    }
})

export default TodoEditModal
