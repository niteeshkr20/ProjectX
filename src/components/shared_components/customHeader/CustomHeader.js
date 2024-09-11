import React from "react";
import {
    ActivityIndicator,
    View,
    TouchableOpacity,
    Text,
    Image,
    ImageBackground
} from "react-native";

import { connect } from 'react-redux';
import colors from "../../shared_styles/colors";
import styles from './CustomHeader.styles'
import Logo from '../../svg_components/Logo';
import XP from '../../svg_components/XP';
import BackButton from "../../svg_components/BackButton";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { realtimeConnect, realtimeDisconnect } from "../../../network/realtime"
import actions from "../../../actions";
import LevelPointsBar from "./LevelPointsBar";

class CustomHeader extends React.Component {


    state = {
        profileimageerror: true
    }

    randomstring = '?'+Math.ceil(Math.random()*1000000);

    componentDidMount() {
        console.log('CUSTOM HEADER MOUNT', this.props.navigation.state.routeName)    

        if (this.props.mytoken.token && this.props.appstate.state === 'active' && this.props.network.xmppState === 'XMPP_DISCONNECTED') {
            console.log('CALL Connect strophe xmpp')
            this.props.openRealtimeConnection()
        }

    }    


    componentDidUpdate(prevProps, prevState){
        //console.log('CUSTOM HEADER STATE UPDATE')
        //console.log(this.props.navigation.state.params);
        if (this.props.mytoken.token && this.props.appstate.state === 'active' && this.props.network.xmppState === 'XMPP_DISCONNECTED') {
            console.log('CALL Connect strophe xmpp Component Update')
            this.props.openRealtimeConnection()
        }
    }

    

    displayLogo() {
        let logoView
        if (this.props.navigation.state.routeName == 'ChatPage')
            logoView =
                <TouchableOpacity style={styles.profilepic} onPress={() => this.props.navigation.navigate('FriendProfile')}>

                    {
                    this.props.activeChat.JEWELCHAT_ID == 1 && <Logo height="75%" width="75%" style={{margin: 10, width: '100%', height: '100%', alignItems: 'center', overflow: 'hidden'}} />
                    }
                    {
                    this.state.profileimageerror && this.props.activeChat.JEWELCHAT_ID != 1 && (this.props.activeChat.IS_GROUP_MSG == 0 || this.props.activeChat.IS_GROUP_MSG == null ) && <Icon  name='user' color={colors.jcgray} size={18} solid />
                    }
                    {
                    this.state.profileimageerror && this.props.activeChat.JEWELCHAT_ID != 1 && this.props.activeChat.IS_GROUP_MSG == 1 && <Icon  name='users' color={colors.jcgray} size={18} solid />
                    }

                    { this.props.activeChat.JEWELCHAT_ID != 1 &&
                        <Image
                            source={{ headers: { Pragma: 'no-cache' }, uri: 'https://kuchbhi.com/'+this.props.activeChat.CHAT_ROOM_JID.split('@')[0]+this.randomstring}}
                            style={[{ position:'absolute', top:0, left:0 },{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}]}
                            onLoad={()=>{
                                this.setState( { profileimageerror: false } ) 
                            }}
                            onError={(error) => { 
                                //console.log('Image')
                                this.setState( { profileimageerror: true } ) 
                            } 
                            }
                            ></Image>
                    }
                    

                    {/* {this.props.activeChat.SMALL_IMAGE && this.props.activeChat.JEWELCHAT_ID != 1 &&
                        <ImageBackground
                            source={{ uri: this.props.activeChat.SMALL_IMAGE }}
                            style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}></ImageBackground>
                    }
                    {
                        this.props.activeChat.JEWELCHAT_ID == 1 && <Logo height="75%" width="75%" style={{margin: 10, width: '100%', height: '100%', alignItems: 'center', overflow: 'hidden'}} />
                    }
                    {
                        !this.props.activeChat.SMALL_IMAGE && this.props.activeChat.JEWELCHAT_ID != 1 && this.props.activeChat.IS_GROUP_MSG == 0 && <Icon name='user' color={colors.jcgray} size={18} solid />
                    }
                    {
                        !this.props.activeChat.SMALL_IMAGE && this.props.activeChat.JEWELCHAT_ID != 1 && this.props.activeChat.IS_GROUP_MSG == 1 && <Icon  name='users' color={colors.jcgray} size={18} solid />
                    }    */}
                </TouchableOpacity>
        else if (this.props.navigation.state.routeName == 'FriendProfile') {
            logoView = null
        }
        else
            logoView = <View style={styles.jewelBox}>
                <Logo height="100%" width="100%" />
            </View>
        return logoView
    }


    connectingSpinner(){

        if( this.props.network.xmppState !== 'XMPP_CONNECTED'){
            let connectingspinner = <View style={{height:32, paddingLeft:8, justifyContent:'center'}}>
                                        <ActivityIndicator size="small" color="white" />
                                    </View>

            return connectingspinner;  
        }else
            return null;           

    }

    displayJewelBox() {
        return (
            <TouchableOpacity
                style={styles.jewelBox}
                onPress={() => this.props.navigation.navigate('MyModal', { modal_name: 'JStore' })}
            >
                <ImageBackground source={require('../../../assets/jewelbox.png')} style={{
                    width: '100%', height: '100%', justifyContent: 'center',
                    alignItems: 'center'
                }}>

                </ImageBackground>

            </TouchableOpacity>)
    }

    displayFactory() {
        let factoryView
        this.props.navigation.state.routeName == 'JewelFactory' ? factoryView = null :
            this.props.navigation.state.routeName == 'ChatPage' ?
                factoryView =
                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyModal', { modal_name: 'ChatPageOptions' })} style={styles.jewelBox}>
                    <ImageBackground source={require('../../../assets/dots.png')} style={{
                        width: '100%', height: '100%', justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    </ImageBackground>
                </TouchableOpacity>
                :
                factoryView =
                <TouchableOpacity onPress={() => this.props.navigation.navigate('JewelFactory')} style={styles.jewelBox}>
                    <ImageBackground source={require('../../../assets/factory.png')} style={{
                        width: '100%', height: '100%', justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    </ImageBackground>
                </TouchableOpacity>
        return factoryView
    }

    displayBackButton() {
        //console.log('test')
        //console.log(this.props.navigation.state.routeName)
        //console.log(this.props.navigation.dangerouslyGetParent().state)

        if (this.props.navigation.dangerouslyGetParent().state.index > 0 && this.props.navigation.state.routeName != 'MainTabs')
            return (<TouchableOpacity style={{ height: 32, width: 16, marginLeft: 8 }}
                onPress={() => { this.props.navigation.goBack() }} >
                <BackButton style={{ height: '100%', width: '100%' }} />
            </TouchableOpacity>)
        else
            return <View style={{ height: 32, width: 8, marginLeft: 4 }} />
    }

    displayTitle() {
        let titleView
        if (this.props.navigation.state.routeName == 'ChatPage')
            titleView = <TouchableOpacity onPress={() => this.props.navigation.navigate('FriendProfile')} style={{ flexDirection: 'column', paddingLeft: 5, height: 32, justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>{this.props.activeChat.PHONEBOOK_CONTACT_NAME ? this.props.activeChat.PHONEBOOK_CONTACT_NAME.substring(0, 35)+'...'
                    : (this.props.activeChat.JEWELCHAT_ID == 1 ? 'Team JewelChat' 
                    : (this.props.activeChat.IS_GROUP_MSG == 0 || this.props.activeChat.IS_GROUP_MSG == null ? '+' + this.props.activeChat.CHAT_ROOM_JID.split('@')[0]
                    : (this.props.activeChat.CONTACT_NAME ? this.props.activeChat.CONTACT_NAME.substring(0, 35)+'...' : 'Group Chat') ) )}</Text>
                { 
                    this.props.activeChat.IS_GROUP_MSG == 0 && this.props.presence.hasOwnProperty(this.props.activeChat.JID) 
                    && <Text style={{ fontSize: 11, color: 'white' }}>{ this.props.presence[this.props.activeChat.JID] ? this.props.presence[this.props.activeChat.JID] : 'offline' }</Text>
                } 
                
            </TouchableOpacity>
        else if (this.props.navigation.state.routeName == 'FriendProfile') {
            titleView = <Text style={{ fontSize: 16, color: 'white', paddingLeft: 10, fontWeight: 'bold' }}>{this.props.activeChat.PHONEBOOK_CONTACT_NAME}</Text>
        }
        else
    titleView = <Text style={{ fontSize: 20, fontWeight: '500', color: 'white', textAlignVertical: 'center', paddingLeft: 16 }}>{this.props.title}</Text>
        return titleView
    }


    render() {
        global.customheaderrender++;
        console.log('rendercount', global.customheaderrender);

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
        mytoken: state.mytoken,
        appstate: state.appstate,
        network: state.network,        
        presence: state.chatslist.presence,
        activeChat: state.chatslist.activeChat,     
        chatslist: state.chatslist.chatList
    }
}

function mapDispatchToProps(dispatch) {

    return {
        openRealtimeConnection: () => dispatch(realtimeConnect()),
        closeRealtimeConnection: () => dispatch(realtimeDisconnect())
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);


/*<Text style={{fontSize:10, color:'white'}}>1</Text>  */