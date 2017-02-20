/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry, Navigator } from 'react-native'
import MyLists from './scenes/MyLists'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
// By default, this client will send queries to the
//  `/graphql` endpoint on the same host
const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://127.0.0.1:8090/graphql' })
})


export default class groceryListNative extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <Navigator
          initialRoute={{ title: 'My Lists', index: 0 }}
          renderScene={(route, navigator) => <MyLists />} />
      </ApolloProvider>
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
