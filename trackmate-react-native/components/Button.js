import { TouchableHighlight, View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Separator from './Separator'

export default function Button({ onPress, title, icon }) {
    return (
        <TouchableHighlight onPress={onPress}>
            <View style={styles.button}>
                <FontAwesomeIcon color="white" size={18} icon={icon} />
                <Separator width={10} />
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#187dc9",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        display: 'flex',
        flexDirection: 'row'
    },
    title: {
        fontSize: 18,
        color: 'white'
    }
});
