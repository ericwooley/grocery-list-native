import React, {PropTypes} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import requireAuth from '../HOC/requireAuth'
const MyQuery = gql`
query userWithLists {
  user {
    username,
    lists {
      id,
      name,
      items {
        name,
        id
      }
    }
  }
}
`
export const MyLists = (props) => (
  <View style={styles.form}>
    <Text style={styles.registerTitle}>
      My Lists: {!props.data.loading && props.data.user.lists.length}
    </Text>
  </View>
)

MyLists.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      lists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        items: PropTypes.shape({
          name: PropTypes.string
        })
      }))
    })
  }).isRequired
}
export default graphql(MyQuery)(requireAuth(MyLists))
const styles = StyleSheet.create({
  form: {
    paddingTop: 20,
    justifyContent: 'flex-start',
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
