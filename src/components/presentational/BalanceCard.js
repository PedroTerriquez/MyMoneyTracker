import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import { PieChart } from 'react-native-svg-charts'
import TextAvatar from 'react-native-text-thumbnail';

class BalanceCard extends Component {
  render() {
    const { id, style, counterpart, total1, total2, percetage1, percetage2 } = this.props
    const data = [
      { key: 1, amount: total1 || 1, svg: { fill: '#2F66FF' }, },
			{ key: 2, amount: total2 || 1, svg: { fill: '#7ECC10'  }, },
		]

    return(
      <TouchableOpacity style={styles.item} onPress={ () => this.props.navigation.navigate('Balance',  { id: id} )}>
        <View style={styles.headerRow}>
          <TextAvatar size={20} type={'circle'}>
            { counterpart }
          </TextAvatar>
          <Text style={styles.name}>{ counterpart }</Text>
        </View>
        <PieChart
          style={{ height: 80 }}
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
    padding: 15,
    shadowRadius: 3,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 3 },
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
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
