import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import trackmateLogo from '../assets/trackmateLogo.png'

export default function Logo() {
  return (
    <View style={styles.root}>
      <Image
        style={styles.logo}
        source={trackmateLogo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logo: {
    width: 246,
    height: 58,
    resizeMode: 'contain',
  },
});