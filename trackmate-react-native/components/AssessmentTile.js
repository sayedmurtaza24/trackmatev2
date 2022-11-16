import React from 'react';
import { View, StyleSheet } from 'react-native';

function AssessmentTile({ valueRange, value, comment }) {
    const min = "#4a4a4a";
    const max = "#5de86b";

    const maxValue = valueRange - 1;
    const v = value - 1;
    const amount = v / maxValue;

    function lerpColor(a, b, amount) {
        const ah = parseInt(a.replace(/#/g, ''), 16),
            ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
            bh = parseInt(b.replace(/#/g, ''), 16),
            br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
            rr = ar + amount * (br - ar),
            rg = ag + amount * (bg - ag),
            rb = ab + amount * (bb - ab);

        return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
    }

    return (
        <View style={styles.root}>
            <View style={{ ...styles.circle, backgroundColor: lerpColor(min, max, amount) }}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: 60,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 100,
    }
});

export default AssessmentTile