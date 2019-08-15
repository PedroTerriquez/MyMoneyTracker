import React, { Component } from 'react';
import { Picker, Container, Content, Form, Item, Input, Label, Button, Text, Icon } from 'native-base';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';

export default class AddPromise extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      amount_payments: 10,
      period: 1,
      title: '',
      interest: 0,
      total: 0,
    }
    this.newPromise = this.newPromise.bind(this);
  }

  componentDidMount() {
    this.setState({ ...this.props.navigation.getParam('props') })
  }

  promiseValues() {
    return values = {
      amount_payments: this.state.amount_payments,
      payment_period: this.state.period,
      title: this.state.title,
      interest: this.state.interest,
      total: this.state.total,
      debtor_id: this.props.navigation.getParam('id')
    }
  }

  handleSave() {
    var props = this.props.navigation.getParam('props')
    if(!!props && props.id) {
      this.updatePromise(props.id)
    } else {
      this.newPromise()
    }
  }

  updatePromise(id) {
    axios.patch(`${global.API_URL}/promises/${id}`, this.promiseValues(), deviceStorage.loadToken() )
      .then((response) => {
        this.props.navigation.goBack()
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  newPromise() {
    axios.post(`${global.API_URL}/promises/`, this.promiseValues() , deviceStorage.loadToken() )
      .then((response) => {
        this.props.navigation.goBack()
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  render() {
    const {amount_payments, title, interest, period, total} = this.state
    return(
      <Container>
        <Content>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: 10 }}
                placeholder="Select a period"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                placeholder="Select a period"
                selectedValue={period}
                onValueChange={(itemValue, itemIndex) => this.setState({period: itemValue})} >
                <Picker.Item label="Daily" value="day" />
                <Picker.Item label="Weekly" value="week" />
                <Picker.Item label="Monthly" value="month" />
              </Picker>
            </Item>
            <Item floatingLabel>
              <Label>Money per payment</Label>
              <Input
                value={ amount_payments.toString() }
                onChangeText={ (text) => this.setState({amount_payments: text}) }
                keyboardType={ 'numeric' } />
            </Item>
            <Item floatingLabel>
              <Label>Concept</Label>
              <Input
                value={ title }
                onChangeText={ (text) => this.setState({title: text}) } />
            </Item>
            <Item floatingLabel>
              <Label>Interest</Label>
              <Input
                value={ interest.toString() }
                onChangeText={ (text) => this.setState({interest: text}) }
                keyboardType={ 'numeric' } />
            </Item>
            <Item floatingLabel>
              <Label>Total finance</Label>
              <Input
                value={ total.toString() }
                onChangeText={ (text) => this.setState({total: text}) }
                keyboardType={ 'numeric' } />
            </Item>
            <Item floatingLabel disabled>
              <Label>Total amount of payments</Label>
              <Input
                value={ parseInt((total*((100+parseInt(interest))/100))/amount_payments).toString() } />
            </Item>
            <Item style={{borderColor: 'transparent', alignSelf: 'center', padding: '10%'}}>
              <Button
                rounded
                success
                onPress={ () => this.handleSave() }>
                <Text>Save</Text>
              </Button>
              <Button
                rounded
                light
                onPress={ () => this.props.navigation.goBack() }>
                <Text>Cancel</Text>
              </Button>
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}
