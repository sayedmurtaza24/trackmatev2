import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { View, StyleSheet } from "react-native";
import Button, { ButtonSize, ButtonStyle } from "./Button";
import Separator from "./Separator";
import Input from "./TextInput";

const FieldOptions = ({ onNameChange, onRangeChange, nameValue, rangeValue, deletable = true, onRemove }) => {
    return (
        <View style={styles.root}>
            <Input
                placeholder="Name of field"
                style={styles.input}
                value={nameValue}
                onChangeText={onNameChange} />
            <Separator height={10} />
            <Input
                placeholder="Range of values"
                style={styles.input}
                value={rangeValue}
                onChangeText={onRangeChange} />
            <Separator height={10} />
            {deletable && <Button
                title="Remove"
                icon={faTrash}
                buttonStyle={ButtonStyle.TRANSPARENT}
                onPress={onRemove}
                buttonSize={ButtonSize.SMALL} />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        padding: 10,
        backgroundColor: 'rgb(250, 250, 250)',
        display: 'flex',
        borderRadius: 8,
    },
});

export default FieldOptions;
