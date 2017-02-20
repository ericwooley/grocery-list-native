import React, {PropTypes, Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Layout from '../components/layout'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import requireAuth from '../HOC/requireAuth'
const MyQuery = gql`
query getUser {
  user {
    username
  }
}
`
export class MyLists extends Component {
  // constructor () {
  //   super()
  // }

  render (route: React.Route, navigator: React.NavigatorStatic) {
    return (
      <Layout>
        <View style={styles.form}>
          <Text style={styles.registerTitle}>
            My Lists
          </Text>
        </View>
      </Layout>
    )
  }
}

MyLists.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object
  }).isRequired
}
export default requireAuth(graphql(MyQuery)(MyLists))
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
  },
  buttonWrapper: {
    flexDirection: 'row'
  }
})
