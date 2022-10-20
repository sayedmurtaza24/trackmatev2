import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import trackmateLogo from '../assets/trackmateLogo.png'

export default function Logo() {
  return (
    <View>
      <Image
        style={styles.logo}
        source={trackmateLogo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 246,
    height: 58,
    resizeMode: 'contain'
  },
});