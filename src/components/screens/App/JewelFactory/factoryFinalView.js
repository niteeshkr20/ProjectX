import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { renderJewel } from '../../../JCUtils/CommonUtils'
import styles from './jewelFactory.styles'
import colors from '../../../shared_styles/colors'
import JCImages from '../../../../assets/JCImages'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import NetworkManager from "../../../../network/NetworkManager";
import rest from '../../../../network/rest';
import { Snackbar } from 'react-native-paper';
import actions from '../../../../actions';

class factoryFinalView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            isLoadingFlush: false,
            visible: false
        }
    }

    jewelCount() {
        let jewelCount = 0
        for (let i = 3; i < this.props.game.jewels.length; i++) {
            jewelCount = jewelCount + this.props.game.jewels[i].count
        }
        return jewelCount
    }

    transferJewelFromFactory = (factory) => {
        if (this.props.factory.count > (25 - this.jewelCount())) {
            this.setState({
                visible: true
            })
        }
        else {
            this.setState({
                isLoading: true
            })
            let factoryID = { factory_id: factory.factory_id }
            NetworkManager.callAPI(rest.transferJewelsFromFactory, 'POST', factoryID).then(result => {
                this.props.getUserFactory()
                this.props.loadGameState()
                this.setState({
                    isLoading: false
                })
            }).catch(error => {

            })
        }
    }
    _onDismissSnackBar = () => this.setState({ visible: false });

    flushFactory = (factory) => {
        this.setState({
            isLoadingFlush: true
        })
        let factoryID = { factory_id: factory.factory_id }
        NetworkManager.callAPI(rest.flushFactory, 'POST', factoryID).then(result => {
            this.props.getUserFactory()
            this.props.loadGameState()
            this.setState({
                isLoadingFlush: false
            })
        }).catch(error => {

        })
    }

    render() {
        return (
            <SafeAreaView key={this.props.factory.factory_id+''} style={{ marginHorizontal: 10, marginVertical: 5, height: 250, backgroundColor: colors.darkcolor3 }}>
                <View style={{ marginHorizontal: 5, alignItems: 'center', justifyContent: 'center', marginVertical: 5, height: 120, backgroundColor: colors.darkcolor1 }}>
                    {renderJewel(this.props.factory.jeweltype_id, 75, 75, styles.jewelStyle)}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{this.props.factory.count} x</Text>
                    {renderJewel(this.props.factory.jeweltype_id, 35, 35, styles.jewelStyle)}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <TouchableOpacity
                        //add consition for store overflow
                        disabled={this.state.isLoading}
                        style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}
                        onPress={() => this.transferJewelFromFactory(this.props.factory)}
                    >
                        <View style={{ width: 200, height: 40, zIndex: 1, backgroundColor: colors.darkcolor3, borderColor: colors.darkcolor3, borderRadius: 8, borderWidth: StyleSheet.hairlineWidth, overflow: 'hidden' }}>
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
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Transfer to Store </Text>
                                    <Image style={{ width: 25, height: 25 }} source={require('../../../../assets/jewelbox.png')} />
                                </View>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={this.state.isLoading}
                        style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}
                        onPress={() => this.flushFactory(this.props.factory)}
                    >
                        <View style={{ width: 100, height: 40, zIndex: 1, backgroundColor: colors.darkcolor3, borderColor: colors.darkcolor3, borderRadius: 8, borderWidth: StyleSheet.hairlineWidth, overflow: 'hidden' }}>
                            <View style={{ width: "100%", height: '100%' }}>
                                <ImageBackground source={JCImages.colorGrad} style={{
                                    width: '100%', height: '100%', justifyContent: 'center',
                                    alignItems: 'center', overflow: 'hidden'
                                }}></ImageBackground>
                            </View>
                        </View>
                        <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 2, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {this.state.isLoadingFlush ? <ActivityIndicator color={'white'} />
                                : <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Flush</Text>}

                        </View>
                    </TouchableOpacity>
                </View>
                <Snackbar
                    duration={1000}
                    style={{ backgroundColor: colors.darkcolor1, alignItems: 'center' }}
                    visible={this.state.visible}
                    onDismiss={this._onDismissSnackBar}>
                    Not enough Space in Jewel Store.
              </Snackbar>
            </SafeAreaView>
        )
    }
}
function mapStateToProps(state) {
    return {
        game: state.game,
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


export default connect(mapStateToProps, mapDispatchToProps)(factoryFinalView)

