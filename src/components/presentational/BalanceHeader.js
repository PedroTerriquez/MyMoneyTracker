import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { PieChart } from 'react-native-svg-charts'
import { Circle, G, Image, Line } from 'react-native-svg'
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

		const Labels = ({ slices, height, width }) => {
			return slices.map((slice, index) => {
				const { labelCentroid, pieCentroid, data } = slice;
				return (
					<G
						key={index}
						x={labelCentroid[ 0 ]}
						y={labelCentroid[ 1 ]}
					>
						<Circle
							r={25}
							fill={'white'}
						/>
						<Image
							style={{ borderRadius: 25/2}}
							x={-25}
							y={-25}
							width={50}
							height={50}
							preserveAspectRatio="xMidYMid slice"
							opacity="1"
              href={'https://cdn2.iconfinder.com/data/icons/rcons-user/32/male-shadow-circle-512.png'}
						/>
					</G>
				)
			})
		}

    return(
      <View>
				<PieChart
					style={{ height: 300 }}
					valueAccessor={({ item }) => item.amount}
					data={data}
					spacing={0}
					outerRadius={'95%'} >
					<Labels/>
				</PieChart>
        <View style={{alignItems: 'center', justifyContent: 'center'}} >
          { debt > 0 && <Text style={{fontSize: 15}}>{debtorName} { I18n.t('balance_owe') } ${debt.toFixed(1)} { I18n.t('balance_text') }</Text> }
        </View>
      </View>
    )
  }
}
