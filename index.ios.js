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


export default class groceryListNative extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <Navigator
          initialRoute={{ title: 'Lists', index: 0 }}
          renderScene={(route, navigator) => {
            console.log('route', route, 'navigation', navigator)
            return (
              <MyLists
                onBack={navigator.pop}
                route={route}
                openList={(list: {name: string, id: number}) => {
                  navigator.push({
                    title: `list: ${list.name}`,
                    list,
                    index: route.index + 1
                  })
                }}
                />)
          }} />
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
