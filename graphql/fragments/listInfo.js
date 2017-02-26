import gql from 'graphql-tag'
export default gql`
fragment ListInfoFragment on ShoppingList {
  id,
  name,
  items {
    name,
    id
  }
}
`
