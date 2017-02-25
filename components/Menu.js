import React, {PropTypes} from 'react'
import { Alert, StyleSheet, View, Button } from 'react-native'
import logout from '../requests/logout'
import {withApollo} from 'react-apollo'
import ApolloClient from 'apollo-client'
const Menu = (props) => (
  <View style={styles.menu}>
    {props.extraActions}
    <Button color='white' title='🏃 Logout'
      onPress={() => Alert.alert('Logout?', 'Are you sure?', [
        {text: 'Cancel', onPress: props.afterAction},
        {
          text: 'OK',
          onPress: () =>
            logout()
            .then(props.client.resetStore)
            .catch(e => alert('You have been logged out'))
            .then(props.afterAction())
        }
      ])} />
  </View>
)

Menu.propTypes = {
  client: PropTypes.instanceOf(ApolloClient).isRequired,
  afterAction: PropTypes.func.isRequired,
  extraActions: PropTypes.arrayOf(PropTypes.any)
}
export default withApollo(Menu)
const styles = StyleSheet.create({
  menu: {
    flex: 1
  }
})
