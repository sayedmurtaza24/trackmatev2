import React, { useState } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";

function AssessmentTile({ valueRange, value, onPress }) {
  // const min = "#4a4a4a";
  // const max = "#5de86b";

  const maxValue = valueRange - 1;
  const v = value - 1;
  // const amount = v / maxValue;

  // function lerpColor(a, b, amount) {
  //   const ah = parseInt(a.replace(/#/g, ""), 16),
  //     ar = ah >> 16,
  //     ag = (ah >> 8) & 0xff,
  //     ab = ah & 0xff,
  //     bh = parseInt(b.replace(/#/g, ""), 16),
  //     br = bh >> 16,
  //     bg = (bh >> 8) & 0xff,
  //     bb = bh & 0xff,
  //     rr = ar + amount * (br - ar),
  //     rg = ag + amount * (bg - ag),
  //     rb = ab + amount * (bb - ab);

  //   return (
  //     "#" +
  //     (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1)
  //   );
  // }
  const chooseColor = (v, max) => {
    const c = 9 * v / max;
    switch (Math.round(c)) {
      case 0: return '#ff0000';
      case 1: return '#ff4300';
      case 2: return '#ff6200';
      case 3: return '#ff7b00';
      case 4: return '#ff9200';
      case 5: return '#ffa600';
      case 6: return '#dcb300';
      case 7: return '#b3bf00';
      case 8: return '#81c700';
      case 9: return '#32cd32';
      default: break;
    }
  }

  return (
    <View style={styles.root}>
      <TouchableHighlight
        style={{ borderRadius: 50 }}
        underlayColor="rgba(0, 0, 0, 0.1)"
        onPress={onPress}
      >
        <View
          style={{
            ...styles.circle,
            backgroundColor: chooseColor(v, maxValue),
          }}
        />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 60,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
});

export default AssessmentTile;
