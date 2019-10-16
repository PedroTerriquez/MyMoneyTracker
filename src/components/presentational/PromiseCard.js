import React, { Component } from 'react';
import { TouchableOpacity, View} from 'react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';
import { withNavigation } from 'react-navigation';

class PromiseCard extends Component {
  render() {
    const { id, title, percentage, paid, total, user} = this.props
    return(
      <TouchableOpacity onPress={ () => this.props.navigation.navigate('Promise',  { id: id} )}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'https://picsum.photos/50/50.jpg'}} />
              {/*<Text>{ id }</Text>*/}
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
  let paid = ((percentage) * 140) / 100
  let debt = 140 - paid
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{ width: paid, height: 20, backgroundColor: 'red' }}></View>
      <View style={{ width: debt, height: 20, backgroundColor: 'lightgrey' }}></View>
    </View>
  );
};

export default withNavigation(PromiseCard)
