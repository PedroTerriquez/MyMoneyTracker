import AsyncStorage from '@react-native-community/async-storage';

export const deviceStorage = {
  saveToken(value){
    global.JWT = value;
  },
  loadToken(){
    return { headers: { Authorization: "Bearer " + global.JWT } };
  }

  //async saveToken(value) {
  //try {
  //await AsyncStorage.setItem('token', value);
  //} catch (error) {
  //console.log('AsyncStorage Error: ' + error.message);
  //}
  //},
  //async loadJWT() {
  //try {
  //const value = await AsyncStorage.getItem('token');
  //if (value !== null) {
  //console.log(value);
  //return value;
  //} else {
  //console.log('AsyncStorage Error getting JWT');
  //}
  //} catch (error) {
  //console.log('AsyncStorage Error: ' + error.message);
  //}
  //}

};
