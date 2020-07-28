import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet } from 'react-native';
import { Container, Text, Thumbnail, Button } from 'native-base';
import { deviceStorage } from '../services/deviceStorage';
import { withNavigation } from 'react-navigation';
import I18n from "../translations/i18n";

class Profile extends Component {
  constructor(){
    super();
    this.state = {
      info: '',
      myProfile: false
    };
  }

  componentDidMount() {
    this.getProfileInfo(this.props.navigation.getParam('id') || global.id)
    this.setState({myProfile: !this.props.navigation.getParam('id')})
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

  logout(){
    deviceStorage.deleteJWT().then(res => {
      if (res == true) {
        this.props.navigation.navigate('Auth')
      }
    });
  }

  render() {
    return(
      <Container>
        <View style={styles.center}>
          <Thumbnail
            style={styles.thumbnail}
            source={{uri: 'https://picsum.photos/300/300.jpg'}} />
          <Text style={styles.font20bold}> {this.state.info.name} </Text>
          <Text style={styles.font24}>{I18n.t('member_since')} {this.state.info.created_at} </Text>
          {/*
          <Text style={styles.font20}>{this.state.info.percentage}%</Text>
          <Text style={styles.font24}>{I18n.t('member_status')}</Text>
          */}
          { this.state.myProfile && <Button onPress={()=> this.logout() }><Text>{I18n.t('logout')}</Text></Button>}
        </View>
      </Container>
    )}
}


const styles = StyleSheet.create({
  center:{alignItems: 'center'},
  thumbnail:{width: 200, height: 200, borderRadius: 100, margin: 20},
  font24:{ fontSize: 24 },
  font20:{ fontSize: 20 },
  font20bold: { fontSize: 20, fontWeight: 'bold' },
})

export default withNavigation(Profile)
