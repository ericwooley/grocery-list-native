import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import ListInfoFragment from '../fragments/listInfo'
export default graphql(gql`
mutation deletList ($listId: Int!) {
  deleteShoppingList(listId: $listId) {
    ...ListInfoFragment
  }
}
${ListInfoFragment}
`,
  {
    props: (props) => ({
      ...props,
      deleteList: (listId) => {
        return props.mutate({
          variables: {listId},
          forceRefresh: true,
          optimisticResponse: {
            __typename: 'Mutation',
            deleteList: {
              __typename: 'ShoppingList',
              ...props.ownProps.data.user.lists.find(list => list.id === listId)
            }
          },
          updateQueries: {
            userWithLists: (prev) => {
              const filteredList = prev.user.lists.filter(list => list.id !== listId)
              const updatedQuery = {
                ...prev,
                user: {
                  __typename: 'User',
                  ...prev.user,
                  lists: filteredList
                }
              }
              return updatedQuery
            }
          }
        })
        .then(props.ownProps.data.refetch)
      }
    })
  })
