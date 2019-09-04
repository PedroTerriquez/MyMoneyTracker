import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { withNavigation } from 'react-navigation';

class Payment extends Component {
  handleClick = (id, type) => {
    this.props.navigation.navigate(type,  { id: id})
  }

  render() {
    const { id, title, creator, creatorName, method, amount, date, paymentable_id, type, status, mine } = this.props
    return(
      <TouchableOpacity onPress={() => this.handleClick(paymentable_id, type)}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'https://picsum.photos/100/100.jpg'}} />
              <Body>
                {/*
                <Text>Payment id: { id }</Text>
                <Text>Creator id: { creator }</Text>
                <Text>Status: { status }</Text>
								*/}
                <Text>{creatorName}</Text>
                <Text note>{method}</Text>
              </Body>
            </Left>
            <Right>
              <Text note>{date}</Text>
              <Text>${amount}</Text>
              { (status == 'pending') && <Body><Icon style={{fontSize: 20, color: '#fab005'}} type='FontAwesome' name='warning' /><Text>Pending</Text></Body>}
              { (mine == true && status == 'pending') &&
              <Button small success onPress={()=> this.props.navigation.navigate('AddPayment', { props: this.props }) }>
                <Icon type='FontAwesome' name='edit' />
              </Button>
              }
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(Payment)
