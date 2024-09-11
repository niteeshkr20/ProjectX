import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ActivityIndicator, Animated, Easing } from 'react-native'
import { renderJewel } from '../../../JCUtils/CommonUtils'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './jewelFactory.styles'
import colors from '../../../shared_styles/colors'
import JCImages from '../../../../assets/JCImages'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import NetworkManager from "../../../../network/NetworkManager";
import rest from '../../../../network/rest';
import actions from '../../../../actions';

class factoryRunningview extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            curTime: '',
            isLoading: false
        }
        this.animation = new Animated.Value(0);
    }

    componentDidMount() {

        let dateParams = this.props.userFactory[this.props.index].start_time.split(/[\s-:]/);
        dateParams[1] = (parseInt(dateParams[1], 10) - 1).toString();
        let startTime = new Date(Date.UTC(...dateParams)).getTime();
        let now = new Date().getTime();
        let secondsLeft = this.props.factory[this.props.index].duration - ((now - startTime + global.TimeDelta)/1000);

        this.setState({
            curTime: secondsLeft
        }, () => {
            if (this.state.curTime < 0) {
                this.props.makeJewelReady()
            }
        })

        Animated.loop(
            Animated.timing(this.animation, { toValue: 1, duration: 4000, easing: Easing.linear, useNativeDriver: true })
        ).start();

        this.timer = setInterval(() => {      
            
            
            now = new Date().getTime();
            secondsLeft = this.props.factory[this.props.index].duration - ((now - startTime + global.TimeDelta)/1000);

            console.log(secondsLeft)

            this.setState({
                curTime: secondsLeft
            }, () => {
                if (this.state.curTime < 0) {
                    clearInterval(this.timer);  
                    this.props.makeJewelReady()
                }
            })



        }, 1000)

    }

    componentWillUnmount() {
        clearInterval(this.timer); 
    }

    msToTime = (secs) => {
        let sec_num = parseInt(secs, 10)
        let hours = Math.floor(sec_num / 3600)
        let minutes = Math.floor(sec_num / 60) % 60
        let seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }

    stopFactory = (factory) => {
        if (this.props.game.jewels[0].count >= this.props.factory[this.props.index].diamond) {
            this.setState({
                isLoading: true
            })
            let factoryID = { factory_id: factory.factory_id }
            NetworkManager.callAPI(rest.stopFactory, 'POST', factoryID).then(result => {
                this.props.getUserFactory()
                this.props.loadGameState()
                this.setState({
                    isLoading: false
                })
            }).catch(error => {
                this.setState({
                    isLoading: false
                })
                console.log('Factory Stop error', error);
            })
        }
    }

    render() {
        const rotation = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        return (
            <SafeAreaView key={this.props.factory.factory_id+''} style={{ marginHorizontal: 10, marginVertical: 5, height: 250, backgroundColor: colors.darkcolor3 }}>
                <View style={{ marginHorizontal: 5, alignItems: 'center', justifyContent: 'center', marginVertical: 5, height: 150, backgroundColor: colors.darkcolor1 }}>
                    <Animated.View style={{
                        transform: [{ rotate: rotation, },
                        {
                            translateX: this.animation.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [0, 1.5, 0]
                            })
                        },
                        {
                            translateY: this.animation.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [0, 1.5, 0]
                            })
                        },
                        {
                            scaleX: this.animation.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [1, 1.5, 1]
                            })
                        },
                        {
                            scaleY: this.animation.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [1, 1.5, 1]
                            })
                        }
                        ]
                    }}>
                        {renderJewel(this.props.factory[this.props.index].jeweltype_id, 75, 75, styles.jewelStyle)}
                    </Animated.View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='clock-o' color='white' size={25} /><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', paddingLeft: 7 }}>{this.state.curTime!=''?this.msToTime(this.state.curTime):''}</Text>
                </View>
                <TouchableOpacity
                    disabled={this.state.isLoading || this.props.factory[this.props.index].diamond > this.props.game.jewels[0].count}
                    style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}
                    onPress={() => this.stopFactory(this.props.factory[this.props.index])}
                >
                    <View style={{ width: 150, height: 40, zIndex: 1, backgroundColor: colors.darkcolor3, borderColor: colors.darkcolor3, borderRadius: 8, borderWidth: StyleSheet.hairlineWidth, overflow: 'hidden' }}>
                        <View style={{ width: "100%", height: '100%' }}>
                            <ImageBackground source={JCImages.colorGrad} style={{
                                width: '100%', height: '100%', justifyContent: 'center',
                                alignItems: 'center', overflow: 'hidden'
                            }}></ImageBackground>
                        </View>
                    </View>
                    <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 2, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {this.state.isLoading ? <ActivityIndicator color={'white'} />
                            : <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>STOP </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>({this.props.factory[this.props.index].diamond} X </Text>
                                    {renderJewel(0, 25, 25, styles.jewelStyle)}
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}> )</Text>
                                </View>
                            </View>}
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}
function mapStateToProps(state) {
    return {
        game: state.game,
        factory: state.factory.factory,
        material: state.factory.materials,
        userFactory: state.userfactory.factoryuser
    };
}


function mapDispatchToProps(dispatch) {
    return {
        setTaskDetails: (payload) => (dispatch(actions.setTaskDetails(payload))),
        setTaskData: (payload) => dispatch(actions.setTaskData(payload)),
        loadGameState: () => dispatch(actions.loadGameState()),
        getUserFactory: () => dispatch(actions.getUserFactory())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(factoryRunningview)

