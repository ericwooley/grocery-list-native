import React, { Component, PropTypes } from 'react'
import { Dimensions, View, StatusBar } from 'react-native'
import Menu from '../components/Menu'
import Drawer from 'react-native-drawer'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Container, Header, Title, Button, Icon, Right, Body, Left } from 'native-base'
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
        content={<Menu extraActions={this.props.extraActions} afterAction={() => this._drawer.close()} />}>
        <Container style={{flex: 1}}>
          <Header>
            <Left />
            <Body><Title>{this.props.header}</Title></Body>
            <Right>
              <Button transparent onPress={() => this._drawer.open()}>
                <Icon name='ios-menu' style={{color: 'black'}} />
              </Button>
            </Right>
          </Header>
          {this.props.children}
        </Container>
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
  header: PropTypes.any,
  children: PropTypes.element.isRequired,
  extraActions: PropTypes.arrayOf(PropTypes.any),
  data: PropTypes.shape({
    loading: PropTypes.bool,
    user: PropTypes.object
  })
}
