import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Container, Button, Segment, Content, Text } from 'native-base';
import axios from 'axios';
import { deviceStorage } from '../services/deviceStorage';
import PromiseCard from './presentational/PromiseCard'

export default class PromisesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      myPromises: [],
      pendingPromises: [],
			tab: 0,
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
        this.setState({ myPromises: response.data.my_promises, pendingPromises: response.data.owe_promises })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  renderPromises(promises) {
    if (promises.length == 0) {
      return <Text>No promises yet.</Text>
    }
    return promises.map( promise => (
      <PromiseCard
         id={promise.id}
         key={promise.id}
         title={promise.title}
         paid={promise.paid_amount}
         total={promise.total}
         adminName={promise.administrator_name}
      />
    ))
  }

  render() {
		promises = this.state.tab == 0 ? this.renderPromises(this.state.myPromises) : this.renderPromises(this.state.pendingPromises)
    return(
			<Container>
				<Segment>
					<Button first active={this.state.tab == 0} onPress={ ()=> this.setState({tab: 0}) }>
						<Text>My Promises</Text>
					</Button>
					<Button last active={this.state.tab == 1} onPress={ ()=> this.setState({tab: 1}) }>
						<Text>Owe Promises</Text>
					</Button>
				</Segment>
				<Content padder>
					{promises}
				</Content>
			</Container>
    )
  }
}
