import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import ListInfoFragment from '../fragments/listInfo'
export default graphql(gql`
  query userWithLists {
    user {
      id,
      username,
      lists {
       ... ListInfoFragment
      }
    }
  }
  ${ListInfoFragment}
`)
