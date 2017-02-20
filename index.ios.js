/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry, Navigator } from 'react-native'
import MyLists from './scenes/MyLists'
import { ApolloProvider } from 'react-apollo'
import client from './apolloClient'
import Layout from './components/layout'

export default class groceryListNative extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <Layout>
          <Navigator
            initialRoute={{ title: 'My Lists', index: 0 }}
            renderScene={(route, navigator) => <MyLists />} />
        </Layout>
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
