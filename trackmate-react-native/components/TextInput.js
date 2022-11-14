import { TextInput, StyleSheet, Text } from 'react-native';
import Separator from './Separator';

export const InputType = Object.freeze({
    TEXT: 'text',
    NUMERIC: 'numeric',
});

const Input = ({ label, onChangeText, value, placeholder, required, type = InputType.TEXT }) => {
    const onChange = (text) => {
        switch (type) {
            case InputType.TEXT:
                return onChangeText(text);
            case InputType.NUMERIC:
                return onChangeText(Number(text.replace(/[^0-9]/g, '')));
            default:
                break;
        }
    }

    return (
        <>
            {label && <Text style={styles.label}>{label}</Text>}
            {label && <Separator height={10} />}
            <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#aaa"
                required={required} />
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#eee",
        paddingHorizontal: 20,
        height: 40,
        borderRadius: 6,
        fontSize: 18,
    },
    label: {
        paddingHorizontal: 10,
        fontSize: 15.5,
    }
});

export default Input;