import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Container, Fab, Icon, List } from 'native-base';
import { deviceStorage } from '../services/deviceStorage';
import Contact from './presentational/Contact'
import axios from 'axios';

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
        email={friend.email}
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
          <List>
            { this.renderContacts() }
          </List>
          <NavigationEvents onWillFocus={() => this.getFriends()} />
        </ScrollView>
        <View>
          <Fab
            active={false}
            style={style.fab}
            onPress={ () => navigation.navigate('AddContact')}
            position="bottomRight" >
            <Icon type='Ionicons' name="md-person-add" />
          </Fab>
        </View>
      </Container>
    )
  }
}
const style = StyleSheet.create({
  fab: { backgroundColor: '#5067FF', flex: 1, zIndex: 999 },
  flex: { flex: 1 }
})
