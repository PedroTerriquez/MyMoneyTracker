import AsyncStorage from '@react-native-community/async-storage';

export const deviceStorage = {
  loadToken(){
    return { headers: { Authorization: "Bearer " + global.JWT } };
  },
  async saveToken(jwt, id) {
    try {
      global.JWT = jwt;
      global.id = id;
      await AsyncStorage.setItem('token', jwt);
      await AsyncStorage.setItem('id', id);
    } catch (error) {
    }
  },
  async firstLoadToken() {
    try {
      let id =  await AsyncStorage.getItem('id');
      let jwt = await AsyncStorage.getItem('token');
      if (jwt !== null) {
        global.id = id
        global.JWT = jwt;
        return { headers: { Authorization: "Bearer " + jwt } };
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
    return { headers: { Authorization: "Bearer " + jwt } };
  },
  async deleteJWT() {
    try{
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('id')
      return true
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
};
