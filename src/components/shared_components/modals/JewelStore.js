import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    SafeAreaView,
    ActivityIndicator,
    Text,
    Button,
    TouchableOpacity,
    ImageBackground,
    FlatList
} from 'react-native';

import colors from "../../shared_styles/colors";
import { connect } from 'react-redux';
import { renderJewel } from '../../JCUtils/CommonUtils'
import styles from './Modal.styles'
import JCImages from '../../../assets/JCImages';
import actions from '../../../actions';
// import { InterstitialAd, RewardedAd, RewardedAdEventType, BannerAdSize, BannerAd, TestIds } from '@react-native-firebase/admob';

// const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
//     requestNonPersonalizedAdsOnly: true,
//     keywords: ['fashion', 'clothing'],
// });

class JewelStore extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // rewarded.load();
        // let eventListener = rewarded.onAdEvent((type, error, reward) => {
            // if (type === RewardedAdEventType.LOADED) {
            //    console.log('loaded')
            // }

            // if (type === RewardedAdEventType.EARNED_REWARD) {
            //     console.log('User earned reward of ', reward);
            // }
        // });
        console.log('test mount')
      //  if (!(Object.keys(this.props.game.scores).length > 0))
            this.props.loadGameState()
    }

    jewelCount() {
        let jewelCount = 0
        for (let i = 3; i < this.props.game.jewels.length; i++) {
            jewelCount = jewelCount + this.props.game.jewels[i].count
        }
        return jewelCount
    }
    render() {
        return (
            <SafeAreaView
            backgroundColor="transparent"
                style={{
                    flex: 1,
                    justifyContent: 'flex-end'
                }}
            >

                <TouchableOpacity style={{
                    flex: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '25%',
                    backgroundColor: colors.darkcolor1,
                    opacity: 0.5
                }}
                    onPress={() => { console.log('Herex'); this.props.modalprops.navigation.goBack() }}
                >
                </TouchableOpacity>

                <View style={{
                    flex: 0,
                    //justifyContent: 'center',
                    alignItems: 'center',
                    height: '75%',
                    backgroundColor: colors.darkcolor2,
                    borderTopWidth: 1,
                    borderTopColor: 'white'
                }}
                >
                    <View style={{
                        position: 'absolute',
                        top: -40,
                        height: 80,
                        width: 80,
                        backgroundColor: colors.darkcolor1,
                        borderColor: 'white',
                        borderWidth: 2,
                        borderRadius: 40,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 15
                    }}
                    >
                        <ImageBackground source={require('../../../assets/jewelbox.png')} style={{ width: '100%', height: '100%' }} resizeMode='center' />
                    </View>
                    <View style={{ marginTop: 35, marginBottom: 10, width: '100%', alignItems: 'center' }}>
                        <View style={{ height: 50, paddingTop: 15, paddingBottom: 0 }}>
                            {this.jewelCount() >= 25 
                                ? <Text style={{ fontSize: 24, fontWeight: '500', color: 'white' }}>Jewel Store is FULL.</Text> 
                                : <Text style={{ fontSize: 24, fontWeight: '500', color: 'white' }}>Jewel Store</Text> }
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:10, marginBottom:10 }}>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: 'white', paddingRight: 10 }}>0</Text>
                            <View style={{ width: '75%', height: 8, zIndex: 1, backgroundColor: colors.darkcolor3, borderColor: colors.darkcolor3, borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, overflow: 'hidden' }}>
                                <View style={{ width: "" + this.jewelCount() * 100 / 25 + "%", height: '100%' }}>
                                    <ImageBackground source={JCImages.colorGrad} style={{
                                        width: '100%', height: '100%', justifyContent: 'center',
                                        alignItems: 'center', overflow: 'hidden'
                                    }}></ImageBackground>
                                </View>
                            </View>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: 'white', paddingLeft: 10 }}>25</Text>
                        </View>
                        
                        <FlatList style={{ margin: 5, width: '100%'}}
                            numColumns={3}
                            scrollEnabled={false}               // set number of columns 
                            columnWrapperStyle={{ flex: 1 }}  // space them out evenly
                            data={this.props.game.jewels.slice(3).sort((j1,j2)=>{return j2.count - j1.count})}//filter( j => j.count>0 )}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item }) => {

                                if(item.count <=0 )
                                    return (
                                        <View style={{ paddingTop: 20, flexDirection: 'row', width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{width:35, height:35, backgroundColor:colors.darkcolor1}}></View>                                            
                                        </View>)
                                else
                                    return (
                                        <View style={{ paddingTop: 20, flexDirection: 'row', width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                                            <View>
                                                {renderJewel(item.jeweltype_id, 35, 35, styles.jewelStyle)}
                                            </View>
                                            <Text style={{ fontSize: 16, fontWeight: '400', color: 'white' }}>{item.count < 10 ? '0' + item.count : item.count}</Text>
                                        </View>)
                                }
                            }
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <View >
                            {/* <BannerAd
                                unitId="ca-app-pub-9160946093285023/6427793859"
                                size={BannerAdSize.SMART_BANNER}
                                onAdFailedToLoad={error =>console.log('Ad error',error)}
                                // requestOptions={{
                                //     requestNonPersonalizedAdsOnly: true,
                                // }} 
                                /> */}
                        </View>
                    </View>
                    {/* <Button
                        title="Show Rewarded Ad"
                        onPress={() => {
                            rewarded.show();
                        }}
                    /> */}
                </View>
            </SafeAreaView>
        );
    }

}


function mapStateToProps(state) {
    return {
        game: state.game
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadGameState: () => dispatch(actions.loadGameState())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(JewelStore);


