import React, { Component, PropTypes } from 'react'
import { Dimensions, StyleSheet, View, Button, StatusBar } from 'react-native'
import Menu from '../components/Menu'
import Drawer from 'react-native-drawer'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
const connect = graphql(gql`
query UserName {
  user {
    username
  }
}
`)
class Layout extends Component {
  render () {
    const {height, width} = Dimensions.get('window')
    if (!this.props.data.user) {
      return <View style={{height, width}}>
        <StatusBar backgroundColor='blue' barStyle='light-content' />
        {this.props.children}
      </View>
    }
    return (
      <Drawer
        captureGestures
        acceptDoubleTap
        acceptTap
        acceptPan
        negotiatePan
        openDrawerOffset={0.6}
        // closedDrawerOffset={25}
        tapToClose
        side='right'
        // open
        type='overlay'
        styles={drawerStyles}
        // tweenHandler={Drawer.tweenPresets.parallax}
        ref={(ref) => { this._drawer = ref }}
        content={<Menu afterAction={() => this._drawer.close()} />}>
        <View style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          flex: 0,
          height: 50,
          paddingTop: 20,
          paddingRight: 10,
          // width: Dimensions.get('window').width,
          backgroundColor: '#FBFBFB'}}>
          <Button style={{
            fontSize: 40,
            width: 40,
            height: 40
          }} color='black' title='☰' onPress={() => this._drawer.open()} />
        </View>
        <View style={styles.container}>
          {this.props.children}
        </View>
      </Drawer>
    )
  }
}
export default connect(Layout)

const drawerStyles = {
  drawer: {
    paddingTop: 23,
    paddingLeft: 5,
    backgroundColor: 'rgb(40, 40, 40)',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 3
    }
  },
  main: {paddingLeft: 3}
}
Layout.propTypes = {
  children: PropTypes.element.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool,
    user: PropTypes.object
  })
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB'
  }
})
