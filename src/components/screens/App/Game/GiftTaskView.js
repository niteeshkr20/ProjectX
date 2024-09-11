import React from 'react'
import styles from './Game.styles'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import Coin from '../../../svg_components/Coin';
import XP from '../../../svg_components/XP';
import color from '../../../shared_styles/colors'

const GiftTaskView = (props) => {
    const item = props.giftTask; 
    let done = props.userGiftTask.usergifttasks[item.id] ? props.userGiftTask.usergifttasks[item.id].done : 0;
    //console.log('GIFTS DONE', props.userGiftTask.usergifttasks[item.id].done );
    return (
        item.cash === 0 ?
            <TouchableOpacity style={{ width: '48%', borderRadius: 10, padding: 5, margin: 5, backgroundColor: color.darkcolor3 }}
              onPress={() => {
                console.log(item)
                if(done==0)
                  props.navigation.navigate('GiftTaskDetail', { giftTask: item })
              }}
            >
              <Image
                style={{ width: '100%', height: 180, borderTopRightRadius: 7, borderTopLeftRadius: 7 }}
                source={{ uri: item.product_pic }}
              />
              <View style={{ paddingVertical: 5 }}>
                <Text numberOfLines={1} style={{ color: 'white', fontWeight: '600', fontSize: 13, paddingBottom: 3 }}>{item.productname}</Text>
                { done==0 && <Text style={{ color: color.jcgray, fontSize: 11 }}>QTY: {item.current_qty}/{item.total_qty}</Text>}
                { done>=1 && <Text style={{ color: '#05B40C', fontSize: 11, fontWeight:'700' }}>You’ve Won.</Text>}
              </View>
            </TouchableOpacity>
            :
            <TouchableOpacity style={{ width: '48%', borderRadius: 10, padding: 5, margin: 5, backgroundColor: color.darkcolor3 }}
              onPress={ () => {
                if(done==0)
                  props.navigation.navigate('GiftTaskDetail', { giftTask: item }) 
              }}
            >
              <View style={{ backgroundColor: color.jcgray, width: '100%', height: 180, borderTopRightRadius: 7, borderTopLeftRadius: 7, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: color.darkcolor1, fontSize: 60, fontWeight: 'bold' }}>{'\u20B9'}</Text>
                <Text style={{ color: color.darkcolor1, fontSize: 30, fontWeight: 'bold' }}> {item.money}</Text>
              </View>
              <View style={{ paddingVertical: 5 }}>
                <Text numberOfLines={1} style={{ color: 'white', fontWeight: '600', fontSize: 13, paddingBottom: 3 }}>{item.productname}</Text>
                { done==0 && <Text style={{ color: color.jcgray, fontSize: 11 }}>QTY: {item.current_qty}/{item.total_qty}</Text>}
                { done>=1 && <Text style={{ color: '#05B40C', fontSize: 11, fontWeight:'700' }}>You’ve Won.</Text>}
              </View>
            </TouchableOpacity>
    )
}

export default GiftTaskView