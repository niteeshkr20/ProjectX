import React from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import JCImages from '../../../../assets/JCImages'
import styles from './Profile.styles'
import { renderJewel } from '../../../JCUtils/CommonUtils'
import colors from "../../../shared_styles/colors";
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon1 from 'react-native-vector-icons/MaterialIcons'

const scrollBarData = [
    {
        'image': <Icon name='wallet' size={35} color='white' />,
        'text': 'WALLET'
    },
    {
        'image': <Icon name='trophy' size={35} color='white' />,
        'text': 'LEADERBOARD'
    },
    {
        'image': <Icon name='gift' size={35} color='white' />,
        'text': 'GIFTS WON'
    },
    {
        'image': <Icon name='share-alt' size={35} color='white' />,
        'text': 'REFERRALS'
    },
    {
        'image': <Icon1 name='settings' size={35} color='white' />,
        'text': 'SETTINGS'
    }
   
]

scrollBarNaviagtion = (text, navigation, children) => {
    if (text === 'LEADERBOARD') {
        navigation.navigate("LeaderBoard")
    }
    if (text === 'WALLET') {
        navigation.navigate("Wallet")
    }
    if (text === 'SETTINGS') {
        navigation.navigate("UserProfile")
    }
    if (text === 'GIFTS WON') {
        navigation.navigate("GiftsWon")
    }
    if (text === 'REFERRALS') {
        navigation.navigate("ShareScreen", {children: children})
    }
}
const ProfileOptionsList = (props) => {
    return (
        <View style={{ paddingBottom: 20, alignItems: 'center' }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    scrollBarData.map((object, index) => (
                        <View style={styles.scrollBar} key={index}>
                            <TouchableOpacity style={styles.scrollBarItem} onPress={() => scrollBarNaviagtion(object.text, props.navigation, props.children)}>
                                {object.image}
                                <Text style={styles.itemText}>{object.text}</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    );
}

export default ProfileOptionsList;
