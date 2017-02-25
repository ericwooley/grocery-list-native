import React, {PropTypes, Component} from 'react'
import { StyleSheet, Button } from 'react-native'
import AddList from '../components/addList'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import requireAuth from '../HOC/requireAuth'
import { Content, ListItem, Text, Left, Icon, Body, Right, Button as BaseButton, List } from 'native-base'
import fuzzysearch from 'fuzzysearch'
import Layout from '../components/layout'
const ListInfoFragment = gql`
fragment ListInfoFragment on ShoppingList {
  id,
  name,
  items {
    name,
    id
  }
}
`
const connector = compose(
  graphql(gql`
  query userWithLists {
    user {
      id,
      username,
      lists {
       ... ListInfoFragment
      }
    }
  }
  ${ListInfoFragment}`),
  graphql(gql`
    mutation createList ($name: String!) {
      createList(name: $name ) {
        ... ListInfoFragment
      }
    }
    ${ListInfoFragment}
    `, {props: (props) => ({
      ...props,
      createList: (name) =>
        props.mutate({
          variables: {name},
          forceRefresh: true,
          optimisticResponse: {
            __typename: 'Mutation',
            createList: {
              __typename: 'ShoppingList',
              id: props.ownProps.data.user.lists
                .reduce((lastId, item) =>
                  item.id > lastId ? item.id + 1 : lastId, 0),
              name,
              items: []
            }
          },
          updateQueries: {
            userWithLists: (prev, { mutationResult }) => {
              const newList = mutationResult.data.createList
              console.log('got prev', prev, 'new ', newList)
              const updatedQuery = {
                ...prev,
                user: {
                  __typename: 'User',
                  ...prev.user,
                  lists: [...prev.user.lists, newList]
                }
              }
              return updatedQuery
            }
          }
        })
        .then(() => setTimeout(() => props.ownProps.data.refetch(), 5000))
    })}),
  requireAuth
)

export class MyLists extends Component {
  constructor () {
    super()
    this.state = {filter: '', showDelete: false}
  }
  render () {
    return (
      <Layout
        extraActions={[
          <Button
            key={1}
            color='white'
            title='✎ Edit List'
            onPress={() => this.setState({
              showDelete: !this.state.showDelete
            })} />
        ]}
      >
        <Content>
          <AddList
            onAdd={(name) => this.props.createList(name)}
            onFilterChange={(filter) => this.setState({filter})} />
          {this.props.data.user.lists.length ? (
            <List dataArray={
              this.props.data.user.lists
              .filter((item) => fuzzysearch(
                this.state.filter.toLowerCase(),
                item.name.toLowerCase()
              ))} renderRow={(rowData, key) => (
                <ListItem key={rowData.id} style={{flex: 1}} icon={this.state.showDelete}>
                  {this.state.showDelete &&
                    <Left>
                      <BaseButton danger onPress={() => alert('works')}><Icon name='ios-trash-outline' color='red' /></BaseButton>
                    </Left>
                  }
                  <Body><Text>{rowData.id} - {rowData.name}</Text></Body>
                  <Right />
                </ListItem>
              )} />
          ) : (
            <Text style={styles.registerTitle}>
                You have no lists
            </Text>
          )}
        </Content>
      </Layout>
    )
  }
}

MyLists.propTypes = {
  createList: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      lists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string
        }))
      }))
    })
  }).isRequired
}
export default connector(MyLists)
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
