
import ApolloClient, { createNetworkInterface } from 'apollo-client'

// By default, this client will send queries to the
//  `/graphql` endpoint on the same host
export default new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://127.0.0.1:8090/graphql' })
})
