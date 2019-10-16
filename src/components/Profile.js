import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet } from 'react-native';
import { Container, Text, Thumbnail } from 'native-base';
import { deviceStorage } from '../services/deviceStorage';

export default class Profile extends Component {
  constructor(){
    super();
    this.state = {
      info: ''
    };
  }

  componentDidMount() {
    this.getProfileInfo(this.props.navigation.getParam('id'))
  }

  getProfileInfo(id){
    axios.get(`${global.API_URL}/user/${id}`, deviceStorage.loadToken() )
      .then((response) => {
        this.setState({ info: response.data })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  render() {
    return(
      <Container>
        <View style={styles.center}>
          <Thumbnail
            style={styles.thumbnail}
            source={{uri: 'https://picsum.photos/300/300.jpg'}} />
          <Text style={styles.font20bold}> {this.state.info.name} </Text>
          <Text style={styles.font14}> Miembro desde {this.state.info.created_at} </Text>
          <Text style={styles.font20}>{this.state.info.percentage}%</Text>
          <Text style={styles.font14}>Prestamos pagados a tiempo.</Text>
        </View>
      </Container>
    )}
}


const styles = StyleSheet.create({
  center:{alignItems: 'center'},
  thumbnail:{width: 200, height: 200, borderRadius: 100, margin: 20},
  font14:{ fontSize: 24 },
  font20:{ fontSize: 20 },
  font20bold: { fontSize: 20, fontWeight: 'bold' },
})
