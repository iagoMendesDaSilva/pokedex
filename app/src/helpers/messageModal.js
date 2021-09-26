import * as React from 'react';

import Color from '../constants/color';
import { StyleSheet, Text, Modal, View, TouchableOpacity, TextInput } from 'react-native';

export const MessageModal = ({ message, title, visible, onPress, onChange, button="OK", input = false }) => {
    return (
        <Modal
            visible={visible}
            animationType={'slide'}
            transparent
        >
            <View style={styles.containerAll}>
                <View style={styles.containerModal}>
                    <View style={styles.containerMessage}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.message}>{message}</Text>
                        {
                        input &&
                            <TextInput
                                placeholder={input}
                                defaultValue={input}
                                style={styles.message}
                                onChangeText={onChange} />
                        }
                    </View>
                    <View>
                        <TouchableOpacity onPress={onPress}>
                            <Text style={styles.button}>{button}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerModal: {
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "space-between",
    },
    containerMessage: {
        width: 230,
    },
    title: {
        fontSize: 20,
        color: Color.DARK,
        fontWeight: "700",
        fontFamily: "Rubik-Regular",
    },
    message: {
        fontSize: 18,
        paddingBottom: 5,
        color: Color.DARK,
        fontFamily: "Rubik-Regular"
    },
    button: {
        width: 230,
        fontSize: 18,
        textAlign: "center",
        borderTopWidth: 1,
        color: Color.DARK_LIGHT,
        fontFamily: "Rubik-Medium",
        borderTopColor: Color.DARK_LIGHT,
    }
});