import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Container, Button, Segment, Content, Text, Spinner } from 'native-base';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';
import PromiseCard from './presentational/PromiseCard'
import I18n from "../translations/i18n";

export default class PromisesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      myPromises: [],
      pendingPromises: [],
      tab: 0,
      spinner: true
    }
    this.getPromises = this.getPromises.bind(this);
    this.renderPromises = this.renderPromises.bind(this);
  }

  componentDidMount() {
    this.getPromises()
  }

  getPromises() {
    axios.get(`${global.API_URL}/promises`, deviceStorage.loadToken())
      .then((response) => {
        this.setState({ myPromises: response.data.my_promises, pendingPromises: response.data.owe_promises, spinner: false })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderSpinner(){
    if (this.state.spinner) { return <Spinner color='green' />}
  }

  renderPromises(promises, type) {
    if (!this.state.spinner && promises.length == 0) {
      return <Text>{I18n.t("promise_empty")}</Text>
    }
    return promises.map( promise => (
      <PromiseCard
        id={promise.id}
        key={promise.id}
        title={promise.title}
        paid={promise.paid_amount}
        total={promise.total}
        percentage={promise.percentage}
        user={promise.user}
      />
    ))
  }

  render() {
    promises = this.state.tab == 0 ? this.renderPromises(this.state.myPromises, 'mine') : this.renderPromises(this.state.pendingPromises, 'owe')
    return(
      <Container>
        <Segment>
          <Button first active={this.state.tab == 0} onPress={ ()=> this.setState({tab: 0}) }>
            <Text>{I18n.t("accepted_promises")}</Text>
          </Button>
          <Button last active={this.state.tab == 1} onPress={ ()=> this.setState({tab: 1}) }>
            <Text>{I18n.t("my_promises")}</Text>
          </Button>
        </Segment>
        <Content padder>
          { this.renderSpinner() }
          {promises}
        </Content>
      </Container>
    )
  }
}
