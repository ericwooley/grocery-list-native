import React, {PropTypes, Component} from 'react'
import { Text, ActivityIndicator, Dimensions, StyleSheet, View, TextInput, Button, Image } from 'react-native'
import Layout from '../components/layout'
import { withApollo } from 'react-apollo'
import register from '../requests/register'
import login from '../requests/login'
// route: React.Route, navigator: React.NavigatorStatic
export class RequireAuth extends Component {
  constructor () {
    super()
    this.state = this.defaultState
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
  }
  defaultState = {
    isLoading: false,
    username: '',
    password: ''
  }
  register () {
    register(this.state.username, this.state.password)
    .then(this.login)
    .catch(e => alert('Error registering'))
  }
  login () {
    login(this.state.username, this.state.password)
    .catch(e => alert('Error logging in'))
    .then(() => this.setState(this.defaultState))
    .then(() => this.props.data.refetch())
    .catch(e => alert(e.message))
  }
  render () {
    if (this.props.data.loading && !this.props.data.user) {
      return (
        <View style={{flex: 1}}>

          <ActivityIndicator
            animating={this.state.animating}
            style={[styles.centering, {height: 80}]}
            size='large' />
          <Text>Loading account information</Text>
        </View>
      )
    }
    return !this.props.data.user ? (
      <Layout>
        <Image style={styles.backgroundImage} source={require('../images/fuzzy.jpeg')}>
          <View style={styles.form}>
            <TextInput
              placeholderTextColor='rgba(200, 200, 200, .8)'
              style={styles.input}
              placeholder='User Name'
              value={this.state.username}
              autoCapitalize='none'
              onChangeText={(username) => this.setState({username})} />
            <TextInput
              placeholderTextColor='rgba(200, 200, 200, .8)'
              style={styles.input}
              placeholder='Password'
              secureTextEntry
              value={this.state.password}
              autoCapitalize='none'
              onChangeText={(password) => this.setState({password})} />
            <View style={styles.buttonWrapper}>
              <Button color='white' title='Login' onPress={this.login} />
              <Button color='white' title='Register' onPress={this.register} />
            </View>
          </View>
        </Image>
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
const RegisterWithData = withApollo(RequireAuth)
export default (WrappedComponent) => {
  const HIC = (props) => (
    <RegisterWithData {...props}>
      <WrappedComponent {...props} />
    </RegisterWithData>
  )
  HIC.propTypes = {
    data: PropTypes.object.isRequired
  }
  return HIC
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width
  },
  form: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column'
  },
  input: {
    backgroundColor: 'rgba(40, 40, 40, .4)',
    alignSelf: 'stretch',
    height: 80,
    textAlign: 'center',
    color: 'white'
  },
  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200
  },
  button: {
    color: 'white'
  }
})
