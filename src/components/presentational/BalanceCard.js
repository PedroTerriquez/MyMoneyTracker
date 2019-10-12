import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { ListItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import { withNavigation } from 'react-navigation';
import { PieChart } from 'react-native-svg-charts'

class BalanceCard extends Component {
  render() {
    const { id, style, counterpart, total1, total2, percetage1, percetage2 } = this.props
    const data = [
      { key: 1, amount: total1 || 1, svg: { fill: 'green' }, },
			{ key: 2, amount: total2 || 1, svg: { fill: 'blue'  }, },
		]

    return(
      <TouchableOpacity style={styles.item} onPress={ () => this.props.navigation.navigate('Balance',  { id: id} )}>
        <View style={styles.headerRow}>
          <Thumbnail small source={{uri: 'https://picsum.photos/10/10.jpg'}} />
          <Text style={styles.name}>{ counterpart }</Text>
        </View>
        <PieChart
          style={{ height: 100 }}
          valueAccessor={({ item }) => item.amount}
          data={data}
          spacing={0}
          outerRadius={'95%'} >
        </PieChart>
      </TouchableOpacity>
    )
  }
}
export default withNavigation(BalanceCard)

const styles = StyleSheet.create({
  item: {
    width: '45%',
    margin: 8,
    shadowRadius: 3,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 3 },
    borderRadius: 5,
    backgroundColor: '#F5F4F0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    marginLeft: 10,
  }
})
