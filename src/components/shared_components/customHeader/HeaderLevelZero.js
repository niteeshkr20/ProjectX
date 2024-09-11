import React from "react";
import {
    ActivityIndicator,
    View,
    TouchableOpacity,
    Text,    
    ImageBackground,
    SafeAreaView
} from "react-native";

import { connect } from 'react-redux';
import styles from './CustomHeader.styles'
import Logo from '../../svg_components/Logo';
import { realtimeConnect} from "../../../network/realtime"
import LevelPointsBar from "./LevelPointsBar";

class HeaderLevelZero extends React.PureComponent {    

    componentDidMount() {
      //  console.log('CUSTOM HEADER MOUNT', this.props.navigation.state.routeName)    

        

        this.focusListener = this.props.navigation.addListener("focus", () => {
            console.log('FOCUS CALL Connect strophe xmpp')
            if (this.props.network === 'XMPP_DISCONNECTED') {
                console.log('CALL Connect strophe xmpp')
                this.props.openRealtimeConnection()
            }
        });

    }


    componentWillUnmount() {
        console.log('UNMOUNT HEADER LEVEL ZERO')    
       // this.focusListener.remove();       
    }
    

    

    displayLogo() {      
        
        return <View style={styles.jewelBox}><Logo height="100%" width="100%" /></View>
         
    }


    connectingSpinner(){
        console.log('SPINNER')
        if( this.props.network !== 'XMPP_CONNECTED'){
            let connectingspinner = <View style={{height:32, paddingLeft:8, justifyContent:'center'}}>
                                        <ActivityIndicator size="small" color="white" animating={true} />
                                    </View>

            return connectingspinner;  
        }else
            return null;           

    }

    displayJewelBox() {
        return (
            <TouchableOpacity
                style={styles.jewelBox}
                onPress={() => this.props.navigation.navigate('MyModal', { modal_name: 'JStore' })}>

                <ImageBackground source={require('../../../assets/jewelbox.png')} style={{
                    width: '100%', height: '100%', justifyContent: 'center',
                    alignItems: 'center' }} />

            </TouchableOpacity>)
    }

    displayFactory() {     
                
        return  <TouchableOpacity onPress={() => this.props.navigation.navigate('JewelFactory')} style={styles.jewelBox}>
                    <ImageBackground source={require('../../../assets/factory.png')} 
                        style={{
                            width: '100%', height: '100%', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                    </ImageBackground>
                </TouchableOpacity>
        
    }    

    displayTitle() {
        
        return <Text style={{ fontSize: 20, fontWeight: '500', color: 'white', textAlignVertical: 'center', paddingLeft: 16 }}>JewelChat</Text>
        
    }


    render() {

        

        return (

            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.subContainer}>
                    <View style={styles.headerLeft}> 
                        <View style={{ height: 32, width: 8, marginLeft: 4 }} />                       
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
                
            </SafeAreaView>
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


export default connect(mapStateToProps, mapDispatchToProps)(HeaderLevelZero);


/*<Text style={{fontSize:10, color:'white'}}>1</Text>  */