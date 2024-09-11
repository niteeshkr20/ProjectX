import React from "react";
import {
    ActivityIndicator,
    View,
    TouchableOpacity,
    Text,
    ImageBackground
} from "react-native";

import { connect } from 'react-redux';
import styles from './CustomHeader.styles'
import Logo from '../../svg_components/Logo';
import BackButton from "../../svg_components/BackButton";
import { realtimeConnect } from "../../../network/realtime";
import LevelPointsBar from "./LevelPointsBar";

class HeaderLevelOnePlus extends React.Component {


    componentDidMount() {

        if (this.props.network === 'XMPP_DISCONNECTED') {
            console.log('CALL Connect strophe xmpp')
            this.props.openRealtimeConnection()
        }

    }


    displayLogo() {

        return <View style={styles.jewelBox}><Logo height="100%" width="100%" /></View>

    }


    connectingSpinner() {

        if (this.props.network !== 'XMPP_CONNECTED') {
            let connectingspinner = <View style={{ height: 32, paddingLeft: 8, justifyContent: 'center' }}>
                <ActivityIndicator size="small" color="white" />
            </View>

            return connectingspinner;
        } else
            return null;

    }

    displayJewelBox() {
        return (
            <TouchableOpacity
                style={styles.jewelBox}
                onPress={() => this.props.navigation.navigate('MyModal', { modal_name: 'JStore' })}>

                <ImageBackground source={require('../../../assets/jewelbox.png')} style={{
                    width: '100%', height: '100%', justifyContent: 'center',
                    alignItems: 'center'
                }} />

            </TouchableOpacity>)
    }

    displayFactory() {

        return (this.props.route.name == 'JewelFactory'
            ? null
            : (<TouchableOpacity onPress={() => this.props.navigation.navigate('JewelFactory')} style={styles.jewelBox}>
                <ImageBackground source={require('../../../assets/factory.png')}
                    style={{
                        width: '100%', height: '100%', justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                </ImageBackground>
            </TouchableOpacity>))

    }

    displayBackButton() {

        return (<TouchableOpacity style={{ height: 32, width: 16, marginLeft: 8 }}
            onPress={() => { this.props.navigation.goBack() }} >
            <BackButton style={{ height: '100%', width: '100%' }} />
        </TouchableOpacity>)

    }

    displayTitle() {

        return <Text style={{ fontSize: 20, fontWeight: '500', color: 'white', textAlignVertical: 'center', paddingLeft: 16 }}>{this.props.title}</Text>

    }

    render() {
        return (

            <View style={styles.mainContainer}>
                <View style={styles.subContainer}>
                    <View style={styles.headerLeft}>
                        {this.displayBackButton()}
                        {this.displayLogo()}
                        {this.connectingSpinner()}
                        {this.displayTitle()}
                    </View>

                    <View style={styles.headerRight} >
                        {this.displayJewelBox()}
                        {this.displayFactory()}
                    </View>
                </View>
                <LevelPointsBar />
            </View>
        );

    }

}


function mapStateToProps(state) {

    return {
        network: state.network.xmppState
    }
}

function mapDispatchToProps(dispatch) {

    return {
        openRealtimeConnection: () => dispatch(realtimeConnect())
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderLevelOnePlus);


/*<Text style={{fontSize:10, color:'white'}}>1</Text>  */