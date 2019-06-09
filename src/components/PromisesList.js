import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';

export default class PromisesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      myPromises: [],
      pendingPromises: []
    }
    this.getPromises = this.getPromises.bind(this);
    this.renderPromises = this.renderPromises.bind(this);
  }

  componentDidMount() {
    this.getPromises()
  }

  getPromises() {
    axios.get(`${global.API_URL}/payment_promises`, deviceStorage.loadToken())
      .then((response) => {
        this.setState({ myPromises: response.data, pendingPromises: response.data })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderPromises() {
    return this.state.myPromises.map( promise => (
      <View>
        <Text>{ promise.id }</Text>
        <Text>{ promise.title }</Text>
        <Text>--------------------------------</Text>
      </View>
    ))
  }

  render() {
    return(
      <ScrollView>
        { this.renderPromises() }
      </ScrollView>
    )
  }
}
