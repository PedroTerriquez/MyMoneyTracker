import React, {Component} from 'react';
import { Root } from 'native-base';
import Login from './src/components/Login.js'
import Signup from './src/components/Signup.js'
import Home from './src/components/Home.js'
import Contacts from './src/components/Contacts.js'
import ContactRequests from './src/components/ContactRequests.js'
import AddContact from './src/components/AddContact.js'
import Notifications from './src/components/Notifications.js'
import Links from './src/components/Links.js'
import Balance from './src/components/Balance.js'
import Promise from './src/components/Promise.js'
import Profile from './src/components/Profile.js'
import AddPayment from './src/components/AddPayment.js'
import AddPromise from './src/components/AddPromise.js'
import PromisesList from './src/components/PromisesList.js'
import BalancesList from './src/components/BalancesList.js'
import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation';

const MainNavigator = createStackNavigator(
  {
    Login: Login,
    Signup: Signup,
    Home: Home,
    Contacts: Contacts,
    AddContact: AddContact,
    Notifications: Notifications,
    Balance: Balance,
    Promise: Promise,
    AddPayment: AddPayment,
    AddPromise: AddPromise,
    BalancesList: BalancesList,
    PromisesList: PromisesList,
  }
);

const Menu = createDrawerNavigator(
  {
    MainNavigator: MainNavigator,
    Home: Home,
    Contacts: Contacts,
    ContactRequests: ContactRequests,
    AddContact: AddContact,
    Notifications: Notifications,
    BalancesList: BalancesList,
    PromisesList: PromisesList,
    Profile: Profile,
  },
  {
    contentComponent: Links
  }
);

const AppContainer =  createAppContainer(Menu);

const App = () => (
  <Root>
    <AppContainer />
  </Root>
);

export default App
//global.API_URL = 'https://presta-mesta.herokuapp.com/v1'
global.API_URL = 'http://localhost:3002/v1'
global.JWT = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMH0.pp2olRlNc7zAOfIWWxl7e_dxazTtdu8p6i3XGGJEOIE"
