import React, { Component } from 'react';
import { Text, TextInput, Button, View } from 'react-native';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';

export default class Balance extends Component {
  constructor(props){
    super(props);
    this.state = { payments : [] }
    this.getPayments = this.getPayments.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.renderPeople = this.renderPeople.bind(this);
  }

  getPayments(text) {
    axios.post(`${global.API_URL}/user/find`, { search: text}, deviceStorage.loadToken() )
      .then((response) => {
        this.setState({ people: response.data })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  addFriend(id){
    axios.post(`${global.API_URL}/friendships`, { user2_id: id }, deviceStorage.loadToken() )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderPeople() {
    return this.state.people.map( person => (
      <View>
        <Text> { `${person.first_name} ${person.last_name} - ${person.email}` } </Text>
        <Button
          title='Add'
          onPress={ () => this.addFriend(person.id) }
        />
      </View>
    ))
  }

  render() {
    return(
      <View>
        <Text>Search: </Text>
        <TextInput
          autoFocus={ true }
          placeholder='Name or email'
          onChangeText={ (text) => this.getPeople(text) }
          keyboardType={ 'email-address' }
        />
        <Text>Results: </Text>
        { this.renderPeople() }
      </View>
    )
  }
}
