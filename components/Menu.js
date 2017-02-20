import React from 'react'
import { Alert, StyleSheet, View, Text, Button } from 'react-native'
export default () => (
  <View style={styles.menu}>
    <Text>🍔</Text>
    <Button title='Logout'
      onPress={() => Alert.alert('Logout?', 'Are you sure?', [
        {text: 'Cancel', onPress: () => alert('Cancel Pressed!')},
        {text: 'OK', onPress: () => alert('OK Pressed!')}
      ])} />
  </View>
)

const styles = StyleSheet.create({
  menu: {
    flex: 1
  }
})
