/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Navigator } from 'react-native'
import Register from './scenes/register'
export default class groceryListNative extends Component {
  render () {
    return (
      <Navigator initialRoute={{ title: 'My Initial Scene', index: 0 }} renderScene={(route, navigator) => <Register />} />
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5
//   }
// })

AppRegistry.registerComponent('groceryListNative', () => groceryListNative)
