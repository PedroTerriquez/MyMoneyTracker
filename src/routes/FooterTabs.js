import React, {Component} from 'react'
import { Footer, FooterTab, Button, Icon, Text } from 'native-base'
import { createBottomTabNavigator, getActiveChildNavigationOptions, NavigationScreenProp } from 'react-navigation'
import Home from '../components/Home.js'
import Contacts from '../components/Contacts.js'
import PromisesList from '../components/PromisesList.js'
import BalancesList from '../components/BalancesList.js'
import I18n from "../translations/i18n";

const Tabs = createBottomTabNavigator({
  Home: { screen: Home, navigationOptions: { title: I18n.t("home") }},
  Contacts: { screen: Contacts, navigationOptions: { title: I18n.t("contacts") }},
  BalancesList: { screen: BalancesList, navigationOptions: { title: I18n.t("balances") }},
  PromisesList: { screen: PromisesList, navigationOptions: { title: I18n.t("promises")}},
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
            <Text>{I18n.t("home")}</Text>
          </Button>
          <Button
            active={props.navigation.state.index === 1}
            vertical
            onPress={() => props.navigation.navigate('Contacts')}>
            <Icon name="contacts" />
            <Text>{I18n.t("contacts")}</Text>
          </Button>
          <Button
            active={props.navigation.state.index === 2}
            vertical
            onPress={() => props.navigation.navigate('BalancesList')}>
            <Icon active type='FontAwesome' name="balance-scale" />
            <Text>{I18n.t("balances")}</Text>
          </Button>
          <Button
            active={props.navigation.state.index === 3}
            vertical
            onPress={() => props.navigation.navigate('PromisesList')}>
            <Icon type='FontAwesome' name="money" />
            <Text>{I18n.t("promises")}</Text>
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
