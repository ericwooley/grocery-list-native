import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Layout from '../components/layout'

export default (route: React.Route, navigator: React.NavigatorStatic) => (
  <Layout>
    <View style={styles.form}>
      <Text style={styles.registerTitle}>
        Register
      </Text>
      <TextInput style={styles.input} placeholder='User Name' />
      <TextInput style={styles.input} placeholder='Password' secureTextEntry />
    </View>
  </Layout>
)
const styles = StyleSheet.create({
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column'
  },
  registerTitle: {
    fontSize: 30,
    marginBottom: 20
  },
  input: {
    width: 250,
    height: 40,
    textAlign: 'center'
  }
})
