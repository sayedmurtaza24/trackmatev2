import { TouchableHighlight, View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Separator from './Separator'

export default function Button({ onPress, title, icon, iconPosition = "left" }) {
    return (
        <TouchableHighlight onPress={onPress}>
            <View style={styles.button}>
                {iconPosition === "left" && (
                    <>
                        <FontAwesomeIcon color="white" size={18} icon={icon} />
                        <Separator width={10} />
                    </>
                )}
                {!!title && <Text style={styles.title}>{title}</Text>}
                {iconPosition === "right" && (
                    <>
                        <Separator width={10} />
                        <FontAwesomeIcon color="white" size={18} icon={icon} />
                    </>
                )}
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
