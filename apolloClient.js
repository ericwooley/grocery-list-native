
import ApolloClient, { createNetworkInterface } from 'apollo-client'

// By default, this client will send queries to the
//  `/graphql` endpoint on the same host
const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://127.0.0.1:8090/graphql' }),
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      console.log(result.__typename + result.id)
      return result.__typename + result.id
    }

    // Make sure to return null if this object doesn't have an ID
    return null
  },
  addTypename: true
})
export default client
