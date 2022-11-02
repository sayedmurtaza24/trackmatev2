import { TextInput, StyleSheet } from 'react-native';

export const InputType = Object.freeze({
    TEXT: 'text',
    NUMERIC: 'numeric',
});

const Input = ({ onChangeText, value, placeholder, required, type = InputType.TEXT }) => {
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
        <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#aaa"
            required={required} />
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
});

export default Input;