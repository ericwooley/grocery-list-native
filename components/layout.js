import React from 'react'
import { StyleSheet, View } from 'react-native'
export default (props: {children: React.Component}) => (
  <View style={styles.container}>
    {props.children}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBFB'
  }
})
