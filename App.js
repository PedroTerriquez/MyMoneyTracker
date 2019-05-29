import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Login from './src/components/Login.js'
import Home from './src/components/Home.js'
import Contacts from './src/components/Contacts.js'
import AddContact from './src/components/AddContact.js'
import Notifications from './src/components/Notification.js'
import Links from './src/components/Links.js'
import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation';

const MainNavigator = createStackNavigator(
  {
    Login: Login,
    Home: Home,
    Contacts: Contacts,
    AddContact: AddContact,
    Notifications: Notifications,
  }
);

const Menu = createDrawerNavigator(
  {
    MainNavigator: MainNavigator,
    Login: Login,
    Home: Home,
    Contacts: Contacts,
    AddContact: AddContact,
    Notifications: Notifications,
  },
  {
    contentComponent: Links
  }
);

export default createAppContainer(Menu);

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  }
});

global.API_URL = 'https://presta-mesta.herokuapp.com/v1'
global.JWT = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.s43ukN-Jmoj3VIzlvRl8qRseIAldMiL4-Xj5gcQ437k"
