import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ListItem, Right, Left, Body } from 'native-base';
import { PieChart } from 'react-native-svg-charts'
import { Circle, G, Image, Line } from 'react-native-svg'
import TextAvatar from 'react-native-text-thumbnail';
import I18n from "../../translations/i18n";

export default class BalanceHeader extends Component {
  render() {
    const { user1, user2, name1, name2, total1, total2 } = this.props
    let major       = total1 > total2 ? 1 : 2
    let debtorName  = major == 1 ? name2 : name1
    let debt        = major == 1 ? total1-total2 : total2-total1

		const data = [
			{
				key: 1,
				amount: total1 || 1,
				svg: { fill: 'green' },
			},
			{
				key: 2,
				amount: total2 || 1,
				svg: { fill: 'blue' }
			},
		]

    const text = debt > 0 && <Text style={{fontSize: 15}}>{debtorName} { I18n.t('balance_owe') } ${debt.toFixed(1)} { I18n.t('balance_text') }</Text>

    return(
      <View>
        <View style={ style.inline }>
          <View>
            <TextAvatar size={50} type={'circle'}>
              { name2 }
            </TextAvatar>
          </View>
          <View style={style.marginLeftRight}>
            <Text>
              <Text style={ major == 1 ? style.green : style.red }>${debt}</Text>
              <Text>      |     </Text>
              <Text style={ major == 2 ? style.green : style.red }>${debt}</Text>
            </Text>
          </View>
          <View>
            <TextAvatar size={50} type={'circle'}>
              { name1 }
            </TextAvatar>
          </View>
        </View>
        <View style={style.center} >
          { text }
        </View>
				<PieChart
					style={{ height: 300 }}
					valueAccessor={({ item }) => item.amount}
					data={data}
					spacing={0}
					outerRadius={'95%'} >
				</PieChart>
      </View>
    )
  }
}

const style = StyleSheet.create({
  green: { fontWeight: 'bold', color: 'green'},
  red: { fontWeight: 'bold', color: 'red'},
  center: {alignItems: 'center', justifyContent: 'center', padding: 15, borderBottomWidth:1, borderRadius: 5 },
  marginLeftRight: {marginLeft: 20, marginRight: 20 },
  inline: { flexDirection:'row', flexWrap:'wrap', justifyContent: 'center', alignItems: 'center'},
})
