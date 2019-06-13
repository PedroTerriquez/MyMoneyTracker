import React, { Component } from 'react';
import { Text, TextInput, Button, View, Picker } from 'react-native';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';

export default class AddPromise extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      period_quantity: 10,
      period: 1,
      title: '',
      interest: '',
      total: '',
    }
    this.newPromise = this.newPromise.bind(this);
  }

  componentDidMount() {
    this.setState({ ...this.props.navigation.getParam('props') })
  }

  promiseValues() {
    return values = {
      payment_period_quantity: this.state.period_quantity,
      payment_period: this.state.period,
      title: this.state.title,
      interest: this.state.interest,
      total: this.state.total,
      recipient_id: this.props.navigation.getParam('id')
    }
  }

  handleSave() {
    var id = this.props.navigation.getParam('props').id
    if( id != null) {
      this.updatePromise(id)
    } else {
      this.newPromise()
    }
  }

  updatePromise(id) {
    axios.patch(`${global.API_URL}/payment_promises/${id}`, this.promiseValues(), deviceStorage.loadToken() )
      .then((response) => {
        this.props.navigation.goBack()
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  newPromise() {
    axios.post(`${global.API_URL}/payment_promises/`, this.promiseValues() , deviceStorage.loadToken() )
      .then((response) => {
        this.props.navigation.goBack()
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  render() {
    return(
      <View>
        <Text>Period: </Text>
        <Picker
          placeholder="Select a period"
          selectedValue={this.state.period}
          onValueChange={(itemValue, itemIndex) => this.setState({period: itemValue})
          }>
          <Picker.Item label="Daily" value="day" />
          <Picker.Item label="Weekly" value="week" />
          <Picker.Item label="Monthly" value="month" />
      </Picker>
      <Text>Money per payment</Text>
      <TextInput
        placeholder='Money per payment'
        value={ this.state.period_quantity.toString() }
        onChangeText={ (text) => this.setState({period_quantity: text}) }
        keyboardType={ 'numeric' }
      />
      <Text>Concept</Text>
      <TextInput
        placeholder='Concept'
        value={ this.state.title }
        onChangeText={ (text) => this.setState({title: text}) }
      />
      <Text>Interest</Text>
      <TextInput
        placeholder='Interest'
        value={ this.state.interest }
        onChangeText={ (text) => this.setState({interest: text}) }
        keyboardType={ 'numeric' }
      />
      <Text>Total finance</Text>
      <TextInput
        placeholder='Total finance'
        value={ this.state.total }
        onChangeText={ (text) => this.setState({total: text}) }
        keyboardType={ 'numeric' }
      />
      <Text>Payment Period Quantity</Text>
      <Text value={ this.state.total/this.state.period_quantity }/>
      <Button
        title='Save'
        onPress={ () => this.handleSave() }
      />
      </View>
    )
  }
}
