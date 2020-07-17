import React, {Component} from 'react'
import { Footer, FooterTab, Button, Icon, Text } from 'native-base'
import { createBottomTabNavigator, getActiveChildNavigationOptions, NavigationScreenProp } from 'react-navigation'
import Home from '../components/Home.js'
import Contacts from '../components/Contacts.js'
import PromisesList from '../components/PromisesList.js'
import BalancesList from '../components/BalancesList.js'

const Tabs = createBottomTabNavigator({
  Home: { screen: Home, navigationOptions: { title: 'Last payments received' } },
  Contacts: { screen: Contacts, navigationOptions: { title: 'Contacts' } },
  BalancesList: { screen: BalancesList, navigationOptions: { title: 'Balances' } },
  PromisesList: { screen: PromisesList, navigationOptions: { title: 'Promises' } },
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarComponent: props => {
    return (
      <Footer>
        <FooterTab>
          <Button
            active={props.navigation.state.index === 0}
            vertical
            onPress={ () => props.navigation.navigate('Home') }>
            <Icon name="home" />
            <Text>Home</Text>
          </Button>
          <Button
            active={props.navigation.state.index === 1}
            vertical
            onPress={() => props.navigation.navigate('Contacts')}>
            <Icon name="contacts" />
            <Text>Contacts</Text>
          </Button>
          <Button
            active={props.navigation.state.index === 2}
            vertical
            onPress={() => props.navigation.navigate('BalancesList')}>
            <Icon active type='FontAwesome' name="balance-scale" />
            <Text>Balances</Text>
          </Button>
          <Button
            active={props.navigation.state.index === 3}
            vertical
            onPress={() => props.navigation.navigate('PromisesList')}>
            <Icon type='FontAwesome' name="money" />
            <Text>Promises</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
})

Tabs.navigationOptions = ({
  navigation,
  screenProps,
}: {
  navigation: NavigationScreenProp<NavigationState>;
  screenProps: { [key: string]: any };
}) => {
  const childOptions = getActiveChildNavigationOptions(navigation, screenProps);
  return {
    title: childOptions.title,
  };
};

export default Tabs
