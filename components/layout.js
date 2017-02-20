import React, { Component, PropTypes } from 'react'
import { StyleSheet, View } from 'react-native'
import Menu from '../components/Menu'
import Drawer from 'react-native-drawer'
export default class Layout extends Component {
  render () {
    return (
      <Drawer
        captureGestures
        acceptDoubleTap
        acceptTap
        acceptPan
        negotiatePan
        openDrawerOffset={0.6}
        closedDrawerOffset={43}
        tapToClose
        side='right'
        // open
        type='overlay'
        styles={drawerStyles}
        // tweenHandler={Drawer.tweenPresets.parallax}
        ref={(ref) => { this._drawer = ref }}
        content={<Menu />}>
        <View style={styles.container}>
          {this.props.children}
        </View>
      </Drawer>
    )
  }
}

const drawerStyles = {
  drawer: {
    paddingTop: 20,
    paddingLeft: 5,
    backgroundColor: 'rgb(200, 200, 200)',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3
  },
  main: {paddingLeft: 3}
}
Layout.propTypes = {
  children: PropTypes.element.isRequired
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBFB'
  }
})
