import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Item, Input, Icon, Text, Card, CardItem, Button, Right, Body, Left, Thumbnail } from 'native-base';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';

export default class AddContact extends Component {
  constructor(props){
    super(props);
    this.state = { people : [] }
    this.getPeople = this.getPeople.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.renderPeople = this.renderPeople.bind(this);
  }

  getPeople(text) {
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
        this.removeButton(id)
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  removeButton(id){
    clone = this.state.people.slice()
    let index = clone.findIndex(el => el.id == id);
    clone[index].id = null
    this.setState({people: clone})
  }

  renderPeople() {
    return this.state.people.map( person => (
        <Card key={person.id}>
          <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://picsum.photos/100/100.jpg'}} />
                <Body>
                  <Text>{person.first_name} {person.last_name}</Text>
                  <Text note>{person.email}</Text>
                </Body>
              </Left>
              <Right>
                { person.id && <Button
                  success
                  small
                  rounded
                  onPress={ () => this.addFriend(person.id) }>
                  <Text>Add</Text>
                  <Icon type='FontAwesome' name='check' />
                </Button>}
              </Right>
          </CardItem>
        </Card>
    ))
  }

  render() {
    return(
      <View>
        <Item rounded>
          <Input
            placeholder='Search by name or email'
            autoFocus={ true }
            onChangeText={ (text) => this.getPeople(text) }
            ref={(ref) => this.SearchInput = ref }
            keyboardType={ 'email-address' } />
          <Icon type='AntDesign' name='close' onPress={ ()=> this.SearchInput._root.clear() } />
        </Item>
        <ScrollView>
          { this.renderPeople() }
        </ScrollView>
      </View>
    )
  }
}
