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
