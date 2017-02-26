import React, {PropTypes, Component} from 'react'
import { StyleSheet, Button } from 'react-native'
import AddList from '../components/addList'
import { compose } from 'react-apollo'
import requireAuth from '../HOC/requireAuth'
import { Content, ListItem, Text, Left, Icon, Body, Right, Button as BaseButton, List } from 'native-base'
import fuzzysearch from 'fuzzysearch'
import Layout from '../components/layout'
import userWithListsGQL from '../graphql/queries/userWithLists'
import createListMutation from '../graphql/mutations/createList'
import deleteListMutation from '../graphql/mutations/deleteList'
export class MyLists extends Component {
  constructor () {
    super()
    this.state = {filter: '', showDelete: false}
  }
  renderActions () {
    const actions = []
    if (this.props.data.user.lists.length) {
      actions.push(
        <Button
          key={1}
          color='white'
          title={this.state.showDelete ? 'Done' : '✎ Delete Lists'}
          onPress={() => this.setState({
            showDelete: !this.state.showDelete
          })} />)
    }
    return actions
  }
  render () {
    return (
      <Layout
        header='My Lists'
        extraActions={this.renderActions()}>
        <Content>
          <AddList
            onAdd={(name) => {
              this.props.createList(name)
            }}
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
                      <BaseButton danger onPress={() => {
                        this.props.deleteList(rowData.id)
                        if (this.props.data.user.lists.length === 1) {
                          this.setState({
                            showDelete: false
                          })
                        }
                      }}>
                        <Icon name='ios-trash-outline' color='red' />
                      </BaseButton>
                    </Left>
                  }
                  <Body><Text>{rowData.name}</Text></Body>
                  <Right />
                </ListItem>
              )} />
          ) : (
            <Text style={{fontSize: 30, marginBottom: 20}}>
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
  deleteList: PropTypes.func.isRequired,
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
export default compose(
  userWithListsGQL,
  deleteListMutation,
  createListMutation,
  requireAuth
)(MyLists)
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
