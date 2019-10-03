import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation';
import { ScrollView, View, Text } from 'react-native';
import { Container, Fab, Icon } from 'native-base';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';
import Contact from './presentational/Contact'

export default class Contacts extends Component {
  constructor(props){
    super(props);
    this.state = {
      friends: [],
    }
    this.getFriends = this.getFriends.bind(this);
    this.renderContacts = this.renderContacts.bind(this);
  }

  componentDidMount(){
    this.getFriends()
  }

  getFriends() {
    axios.get(`${global.API_URL}/friendships`, deviceStorage.loadToken())
      .then((response) => {
        this.setState({ friends: response.data })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderContacts() {
    if (this.state.friends.length == 0) {
      return <Text>You don't have contacts yet. Add a new friend to start to save money.</Text>
    }
    return this.state.friends.map( friend => (
      <Contact
        id={friend.id}
        key={friend.id}
        name={friend.first_name}
        type='normal'
      />
    ))
  }

  render() {
    const { navigation } = this.props
    return(
      <Container>
        <ScrollView>
          { this.renderContacts() }
          <NavigationEvents onWillFocus={() => this.getFriends()} />
        </ScrollView>
        <View style={{ flex: 1 }}>
          <Fab
            active={false}
            style={{ backgroundColor: '#5067FF', flex: 1, zIndex: 999 }}
            onPress={ () => navigation.navigate('AddContact')}
            position="bottomRight" >
            <Icon type='Ionicons' name="md-person-add" />
          </Fab>
        </View>
      </Container>
    )
  }
}
