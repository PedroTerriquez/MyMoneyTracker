import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Header, Item, Input, Icon, Text, Card, CardItem, Button, Right, Body, Left, Thumbnail } from 'native-base';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';
import ToastService from '../services/ToastService.js';
import I18n from "../translations/i18n";

export default class AddContact extends Component {
  constructor(props){
    super(props);
    this.state = {
      people: [],
      text: '' }
    this.getPeople = this.getPeople.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.renderPeople = this.renderPeople.bind(this);
  }

  getPeople(text) {
    this.setState({text: text});
    if (text.length > 2 ) {
      axios.post(`${global.API_URL}/user/find`, { search: text}, deviceStorage.loadToken() )
        .then((response) => {
          this.setState({ people: response.data })
        })
        .catch((error)=>{
          ToastService.showToast(error.response.data.errors);
        })
    }
  }

  addFriend(id) {
    axios.post(`${global.API_URL}/friendships`, { user2_id: id }, deviceStorage.loadToken() )
      .then((response) => {
        this.removeButton(id)
      })
      .catch((error)=>{
        ToastService.showToast(error.response.data.errors);
      })
  }

  removeButton(id) {
    clone = this.state.people.slice()
    let index = clone.findIndex(el => el.id == id);
    clone[index].id = null
    this.setState({people: clone})
  }

  handleCancel() {
    if(this.state.text.length == 0) {
      this.props.navigation.goBack()
    } else {
      this.setState({text: ''})
    }
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
                  style={{height: 40,width: 40, borderRadius:30, justifyContent: 'center'}}
                  onPress={ () => this.addFriend(person.id) }>
                  <Icon type='FontAwesome' name="check" style={{fontSize: 21, width: 20}} />
                </Button>}
              </Right>
          </CardItem>
        </Card>
    ))
  }

  render() {
    return(
      <View>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder={I18n.t('search')} value={this.state.text} onChangeText={ (text) => this.getPeople(text) } autoFocus={ true }/>
            <Icon name="ios-people" />
          </Item>
          <Button transparent onPress={()=> this.handleCancel() }>
            <Text>{I18n.t('cancel')}</Text>
          </Button>
        </Header>
        <ScrollView>
          { this.renderPeople() }
        </ScrollView>
      </View>
    )
  }
}
