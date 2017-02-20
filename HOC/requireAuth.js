import React, {PropTypes, Component} from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import Layout from '../components/layout'
import { graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import register from '../requests/register'
import login from '../requests/login'
const MyQuery = gql`
query getUser {
  user {
    username
  }
}
`
// route: React.Route, navigator: React.NavigatorStatic
export class RequireAuth extends Component {
  constructor () {
    super()
    this.state = {
      isLoading: false,
      username: '',
      password: ''
    }
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
  }
  register () {
    register(this.state.username, this.state.password)
    .then(this.login)
    .catch(e => alert('Error registering'))
  }
  login () {
    login(this.state.username, this.state.password)
    .catch(e => alert('Error logging in'))
    .then(() => this.props.data.refetch())
    .catch(e => alert(e.message))
  }
  render () {
    return !this.props.data.user ? (
      <Layout>
        <View style={styles.form}>
          <Text style={styles.registerTitle}>
            Register
          </Text>
          <TextInput
            style={styles.input}
            placeholder='User Name'
            value={this.state.username}
            autoCapitalize='none'
            onChangeText={(username) => this.setState({username})} />
          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry
            value={this.state.password}
            autoCapitalize='none'
            onChangeText={(password) => this.setState({password})} />
          <View style={styles.buttonWrapper}>
            <Button title='Login' onPress={this.login} />
            <Button title='Register' onPress={this.register} />
          </View>
        </View>
      </Layout>
    ) : (
      this.props.children
    )
  }
}

RequireAuth.propTypes = {
  children: React.PropTypes.element.isRequired,
  data: PropTypes.shape({
    refetch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string
    })
  }).isRequired
}
const RegisterWithData = withApollo(graphql(MyQuery)(RequireAuth))
export default (WrappedComponent) =>
  (props) => (
    <RegisterWithData>
      <WrappedComponent {...props} />
    </RegisterWithData>
  )

const styles = StyleSheet.create({
  form: {
    justifyContent: 'center',
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
