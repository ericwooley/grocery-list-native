import React, {PropTypes, Component} from 'react'
import { Content, InputGroup, Input, Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
export default class AddList extends Component {
  constructor () {
    super()
    this.state = {
      title: ''
    }
  }
  render () {
    return (
      <Content>
        <InputGroup borderType='underline' >
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            placeholder='New List Title' />
          <Button
            style={{margin: 5}}
            success
            disabled={!this.state.title}
            onPress={() => {
              this.props.onAdd(this.state.title)
              this.setState({title: ''})
            }}>
            <Icon
              name='plus'
              style={{color: 'white'}}
               />
          </Button>
        </InputGroup>
        <InputGroup borderType='underline' >
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(filter) => {
              this.setState({filter})
              this.props.onFilterChange && this.props.onFilterChange(filter)
            }}
            value={this.state.filter}
            placeholder='Search Your Lists' />
          <Icon
            name='search'
            style={{color: 'black', margin: 20}}
              />
        </InputGroup>
      </Content>
    )
  }
}

AddList.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func
}
