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
import BackButton from "../../svg_components/BackButton";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { realtimeConnect} from "../../../network/realtime";
import LevelPointsBar from "./LevelPointsBar";
import {getConnectionObj} from '../../../network/realtime-utils/realtimeobj'
import rest from "../../../network/rest";

class HeaderChatPage extends React.Component {


    state = {
        profileimageerror: false
    }

    randomstring = '?'+Math.ceil(Math.random()*1000000);

    // componentDidUpdate(prevProps, prevState) {
        
    //     console.log('HEADER CHAT PAGE', this.props.getParam('JEWEL_TYPE'))
    // }

    componentDidMount() {
        console.log('HEADERCHATPAGE', this.props)    

        if (this.props.network === 'XMPP_DISCONNECTED') {
            console.log('CALL Connect strophe xmpp')
            this.props.openRealtimeConnection()
        }

        if(this.props.activeChat.IS_PHONEBOOK_CONTACT == 1){
            console.log('PRESENCE ROSTER ADD SUBSCRIBE')  

            try{
                getConnectionObj().roster.add(this.props.activeChat.CHAT_ROOM_JID, this.props.activeChat.CONTACT_NAME, [], ()=>{
                    getConnectionObj().roster.subscribe(this.props.activeChat.CHAT_ROOM_JID, 'Online' ,this.props.activeChat.CONTACT_NAME)
                    getConnectionObj().roster.authorize(this.props.activeChat.CHAT_ROOM_JID, 'Online' )
                })
            }catch(err){
                console.log('XMPP not connected yet')
            }   

        }

    }    


    componentWillUnmount() {
        console.log('Header Chat Page Unmount');              
    }

    displayLogo() {
        
        return (<TouchableOpacity style={styles.profilepic}>
                    {
                    this.props.activeChat.JEWELCHAT_ID == 1 && <Logo height="75%" width="75%" style={{margin: 10, width: '100%', height: '100%', alignItems: 'center', overflow: 'hidden'}} />
                    }
                    {
                    this.state.profileimageerror && this.props.activeChat.JEWELCHAT_ID != 1 && (this.props.activeChat.IS_GROUP_MSG == 0 || this.props.activeChat.IS_GROUP_MSG == null ) && <Icon  name='user' color={colors.jcgray} size={18} solid />
                    }
                    {
                    this.state.profileimageerror && this.props.activeChat.JEWELCHAT_ID != 1 && this.props.activeChat.IS_GROUP_MSG == 1 && <Icon  name='users' color={colors.jcgray} size={18} solid />
                    }

                    { this.props.activeChat.JEWELCHAT_ID != 1 && this.props.activeChat.CHAT_ROOM_JID &&
                        <Image
                            source={{ headers: { Pragma: 'no-cache' }, uri: rest.imageBaseURL + this.props.activeChat.CHAT_ROOM_JID.split('@')[0] + '?' + global.randstr}}
                            style={[{ position:'absolute', top:0, left:0 },{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}]}
                            onLoad={()=>{
                                //this.setState( { profileimageerror: false } ) 
                            }}
                            onError={(error) => { 
                                //console.log('Image')
                                this.setState( { profileimageerror: true } ) 
                            } 
                            }
                            ></Image>
                    }                

                    
                </TouchableOpacity>)
        
    }


    connectingSpinner(){

        if( this.props.network !== 'XMPP_CONNECTED'){
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

    displayBackButton() {

        return (<TouchableOpacity style={{ height: 32, width: 16, marginLeft: 8 }}
                    onPress={() => { this.props.navigation.goBack() }} >
                    <BackButton style={{ height: '100%', width: '100%' }} />
                </TouchableOpacity>)
        
    }

    displayTitle() {     
        
    return  <TouchableOpacity style={{ flexDirection: 'column', paddingLeft: 5, height: 32, justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('ChatRoomDetails', this.props.activeChat)}>
                <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>
                    {this.props.activeChat.PHONEBOOK_CONTACT_NAME ? this.props.activeChat.PHONEBOOK_CONTACT_NAME.substring(0, 35)
                    : (this.props.activeChat.JEWELCHAT_ID == 1 ? 'Team JewelChat' 
                    : (this.props.activeChat.IS_GROUP_MSG == 0 || this.props.activeChat.IS_GROUP_MSG == null && this.props.activeChat.CHAT_ROOM_JID ? '+' + this.props.activeChat.CHAT_ROOM_JID.split('@')[0]
                    : (this.props.activeChat.CONTACT_NAME ? this.props.activeChat.CONTACT_NAME.substring(0, 35) : 'Group Chat') ) )}</Text>
                { 
                    this.props.activeChat.IS_GROUP_MSG == 0 && this.props.presence[this.props.activeChat.JID]
                    && <Text style={{ fontSize: 11, color: 'white' }}>{ this.props.presence[this.props.activeChat.JID] }</Text>
                } 
                
            </TouchableOpacity>
        
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
                    </View>
                </View>

                <LevelPointsBar />
                
            </View>
        );

    }

}


function mapStateToProps(state) {

    return {        
        network: state.network.xmppState,        
        presence: state.presence,
        activeChat: state.activechat        
    }
}

function mapDispatchToProps(dispatch) {

    return {
        openRealtimeConnection: () => dispatch(realtimeConnect())        
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderChatPage);


/*<Text style={{fontSize:10, color:'white'}}>1</Text>  */