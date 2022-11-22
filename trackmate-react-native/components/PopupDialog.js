import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { faRedo, faTrash } from '@fortawesome/free-solid-svg-icons';

import Button, { ButtonColor, ButtonStyle } from './Button';
import Separator from './Separator';

function PopupDialog({
    visible = false,
    title = "",
    description = "",
    okButtonTitle = "OK",
    cancelButtonTitle = "Cancel",
    onOkPressed,
    onCancelPressed,
    actionButtonColor = ButtonColor.NORMAL,
}) {
    return (
        visible ? <View style={styles.root}>
            <View style={styles.dialog}>
                <Separator height={10} />
                <Text style={styles.title}>{title}</Text>
                <Separator height={20} />
                <Text style={styles.description}>{description}</Text>
                <Separator height={20} />
                <View style={styles.buttons}>
                    <Button
                        title={okButtonTitle}
                        buttonStyle={ButtonStyle.TRANSPARENT}
                        buttonColor={actionButtonColor}
                        onPress={onOkPressed}
                        icon={faTrash} />
                    <Separator width={20} />
                    <Button
                        title={cancelButtonTitle}
                        onPress={onCancelPressed}
                        buttonStyle={ButtonStyle.TRANSPARENT}
                        icon={faRedo} />
                </View>
            </View>
        </View> :
            <View></View>
    )
}

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    dialog: {
        borderRadius: 8,
        backgroundColor: "white",
        padding: 20,
        paddingHorizontal: 30,
        margin: 20,
    },
    title: {
        fontSize: 18,
    },
    description: {
        fontSize: 14,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-evenly'
    },
});

export default PopupDialog;