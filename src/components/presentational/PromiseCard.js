import React, { Component } from 'react';
import { TouchableOpacity, View} from 'react-native';
import { Card, CardItem, Text, Left, Body } from 'native-base';
import { withNavigation } from 'react-navigation';
import TextAvatar from 'react-native-text-thumbnail';

class PromiseCard extends Component {
  render() {
    const { id, title, percentage, paid, total, user} = this.props
    return(
      <TouchableOpacity onPress={ () => this.props.navigation.navigate('Promise',  { id: id} )}>
        <Card>
          <CardItem>
            <Left>
              <TextAvatar size={40} type={'circle'}>
                { user }
              </TextAvatar>
              <Body>
                <Text>{ user }</Text>
                <Text note>{ title }</Text>
                <Text note>{percentage}</Text>
              </Body>
            </Left>
            <ProgressBar percentage={parseInt(percentage)} />
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
}

const ProgressBar = ({percentage}) => {
  //140 should be change for a value in percentage
  //because it represents the width in iphones screen
  let paid = ((percentage < 100 ? percentage : 100) * 140) / 100
  let debt = 140 - paid
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{ width: paid, height: 20, backgroundColor: 'green' }}></View>
      <View style={{ width: debt, height: 20, backgroundColor: 'red' }}></View>
    </View>
  );
};

export default withNavigation(PromiseCard)
