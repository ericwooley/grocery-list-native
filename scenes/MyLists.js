import React, {PropTypes, Component} from 'react'
import { Button } from 'react-native'
import AddList from '../components/addList'
import { compose } from 'react-apollo'
import requireAuth from '../HOC/requireAuth'
import { Content, Text, List } from 'native-base'
import fuzzysearch from 'fuzzysearch'
import Layout from '../components/layout'
import userWithListsGQL from '../graphql/queries/userWithLists'
import createListMutation from '../graphql/mutations/createList'
import deleteListMutation from '../graphql/mutations/deleteList'
import ListRow from '../components/listRow'
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
        route={this.props.route}
        onBack={this.props.onBack}
        header={this.props.route.title}
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
                <ListRow
                  key={rowData.id}
                  onPress={() => this.props.openList(rowData)}
                  showDelete={this.state.showDelete}
                  onDelete={() => {
                    this.props.deleteList(rowData.id)
                    if (this.props.data.user.lists.length === 1) {
                      this.setState({
                        showDelete: false
                      })
                    }
                  }}
                  list={rowData}
                   />
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
  onBack: PropTypes.func.isRequired,
  route: PropTypes.shape({title: PropTypes.string, index: PropTypes.number}).isRequired,
  openList: PropTypes.func.isRequired,
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
