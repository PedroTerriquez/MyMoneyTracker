import React, { Component } from 'react';
import { Fragment } from 'react'
import { Root, Icon } from 'native-base';
import Login from './src/components/Login.js'
import Signup from './src/components/Signup.js'
import ContactRequests from './src/components/ContactRequests.js'
import AddContact from './src/components/AddContact.js'
import Notifications from './src/components/Notifications.js'
import Tabs from './src/routes/FooterTabs.js'
import Balance from './src/components/Balance.js'
import Promise from './src/components/Promise.js'
import Profile from './src/components/Profile.js'
import AddPayment from './src/components/AddPayment.js'
import AddPromise from './src/components/AddPromise.js'
import {createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import I18n from "./src/translations/i18n";

const AuthStack = createStackNavigator({
  Login: Login,
  Signup: Signup,
},{ headerMode: 'none'})

const AppStack = createStackNavigator({
  Tabs: Tabs,
  AddContact: { screen: AddContact, navigationOptions: { header: null } },
  ContactRequests: { screen: ContactRequests, navigationOptions: { title: I18n.t("requests") }},
  Notifications: { screen: Notifications, navigationOptions: { title: I18n.t("notifications") }},
  Balance: { screen: Balance, navigationOptions: { title:  I18n.t("balance")  }},
  Promise: { screen: Promise, navigationOptions: { title: I18n.t("promise") }},
  AddPayment: { screen: AddPayment, navigationOptions: { title: I18n.t("add_payment") }},
  AddPromise: { screen: AddPromise, navigationOptions: { title: I18n.t("promise_new") }},
  Profile: { screen: Profile, navigationOptions: { title: I18n.t("profile") }},
},{
  defaultNavigationOptions: ({ navigation }) => ({
    headerRight: (
      <Fragment>
        <Icon style={{padding: 8}} type='Ionicons' name="ios-notifications" onPress={() => navigation.navigate('Notifications')} />
        <Icon style={{padding: 8}} type='FontAwesome' name="user-circle-o" onPress={() => navigation.navigate('Profile')} />
      </Fragment>
    )
  })
});

const AppContainer =  createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    }
  )
);

const App = () => (
  <Root>
    <AppContainer />
  </Root>
);

export default App
//global.API_URL = 'https://a4e14275a0e5.ngrok.io/v1'
global.API_URL = 'http://localhost:3002/v1'
