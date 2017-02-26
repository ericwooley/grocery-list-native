import React, {PropTypes} from 'react'
import { ListItem, Text, Left, Icon, Body, Right, Button as BaseButton } from 'native-base'
function ListRowItem (props: {onDelete: Function, onPress: Function, showDelete: boolean, list: {id: number, name: string}}) {
  return (
    <ListItem
      onPress={() => {
        console.log('showDelete', props.showDelete)
        if (!props.showDelete) {
          props.onPress()
        }
      }}
      key={props.list.id}
      style={{flex: 1}}
      icon={props.showDelete}>
      {props.showDelete &&
        <Left>
          <BaseButton danger onPress={props.onDelete}>
            <Icon name='ios-trash-outline' color='red' />
          </BaseButton>
        </Left>
      }
      <Body><Text>{props.list.name}</Text></Body>
      <Right />
    </ListItem>
  )
}
ListRowItem.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  showDelete: PropTypes.bool,
  list: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }).isRequired
}
export default ListRowItem
