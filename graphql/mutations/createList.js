import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import ListInfoFragment from '../fragments/listInfo'
export default graphql(
  gql`
    mutation createList ($name: String!) {
      createList(name: $name ) {
        ... ListInfoFragment
      }
    }
    ${ListInfoFragment}
  `,
  {
    props: (props) => {
      return ({
        ...props,
        createList: (name) => {
          return props.mutate({
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
          .then(props.ownProps.data.refetch)
          .catch(e => alert('Error creating a list: ' + e.message))
        }
      })
    }
  })
