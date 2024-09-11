import React from 'react';
import {  
  View,  
  TextInput,  
  Platform,  
  TouchableOpacity,
  Text
} from 'react-native';

import styles from './ChatPage.styles'
// import JCTextInput from "../../../../../utilities/JCTextInput/JCTextInput";
import { connect } from 'react-redux';
import colors from "../../../../shared_styles/colors";
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { sendOutgoingMessage, sendOutgoingActivityMessage } from '../../../../../network/realtime-utils/messages';
import { sendReply, sendSubscriptionRequest } from '../../../../../network/realtime'
import { dateToYMD } from '../../../../../network/realtime-utils/utilities'
import { updateChatPageRedux, updateChatlistRedux } from '../../../../../network/realtime-utils/messages';
import db from '../../../../../db/localdatabase';

class MainChatBar extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {    
    console.log('MAINBAR', this.props);

    setTimeout(() =>{
      this.setState({
        keyboardmsg:false
      })
    }, 5000)

    if(this.props.activeChat.IS_GROUP_MSG == 0){
          this.lastTick_textlength = 0;
          this.lastTickAction = 'none'; // none|active|composing
          let msg = {
            CHAT_ROOM_JID: this.props.activeChat.CHAT_ROOM_JID,
            IS_GROUP_MSG: this.props.activeChat.IS_GROUP_MSG,    
            CREATOR_JID: this.props.mytoken.myphone + '@jewelchat.net',
          }

          this.timerId = setInterval(()=>{

            if(this.lastTickAction === 'none'){

              if( (this.lastTick_textlength + 2) < this.state.chatboxtext.length ){ 
                //send composing
                msg.activity = 'composing';  
                if(this.props.presence[this.props.activeChat.CHAT_ROOM_JID] !== 'offline')        
                  sendOutgoingActivityMessage(msg);
                this.lastTickAction = 'composing';
              }

            }  
            else if(this.lastTickAction === 'composing') {
              
              if( this.lastTick_textlength == this.state.chatboxtext.length ){ 
                //send active
                msg.activity = 'active';
                if(this.props.presence[this.props.activeChat.CHAT_ROOM_JID] !== 'offline') 
                  sendOutgoingActivityMessage(msg);
                this.lastTickAction = 'active';
              } 

            }
            else if(this.lastTickAction === 'active') {
              
              if(  (this.lastTick_textlength + 2) < this.state.chatboxtext.length  ){ 
                //send composing
                msg.activity = 'composing';
                if(this.props.presence[this.props.activeChat.CHAT_ROOM_JID] !== 'offline') 
                  sendOutgoingActivityMessage(msg);
                this.lastTickAction = 'composing';
              } 

            }

            this.lastTick_textlength = this.state.chatboxtext.length
          }, 2000);
    }      

  }

  componentWillUnmount() {
    console.log('UNMOUNT MAINCHATBAR')
    if(this.props.activeChat.IS_GROUP_MSG == 0){
      
        clearInterval(this.timerId)
        let msg = {
          CHAT_ROOM_JID: this.props.activeChat.CHAT_ROOM_JID,            
          CREATOR_JID: this.props.mytoken.myphone + '@jewelchat.net',
          activity: 'active'
        }
        
        if(this.props.presence[this.props.activeChat.CHAT_ROOM_JID] !== 'offline') 
          sendOutgoingActivityMessage(msg);
          
    }      
    
  }

  state = {
    keyboardmsg: true,
    chatboxtext: '',
    chatboxempty: true,
    chatbarstyle: { width: '100%', height: 36, backgroundColor: colors.darkcolor3 },
    chattextboxstyle: { flexGrow: 1, maxWidth: '80%', height: 24, borderColor: colors.lightcolor1, borderWidth: 1, borderRadius: 10, color: 'white', fontSize: 14, backgroundColor: colors.darkcolor3, padding: 5, overflow: 'scroll', textAlignVertical: 'top', marginLeft: 4, marginRight: 4 }
  }


  processChatText(value) {

    this.state.chatboxtext = value;

    if (this.state.chatboxempty && value.length >= 1)
      this.setState({ chatboxempty: false });

    if (!this.state.chatboxempty && value.length < 1)
      this.setState({ chatboxempty: true });

  }

  updateChatTextboxHeight = (h) => {

    if (h > 100)
      h = 100;
    if (h < 30)
      h = 30;
    h = Math.floor(h);
    //console.log(h);
    this.setState(prevState => ({
      chatbarstyle: {
        ...prevState.chatbarstyle,
        height: (24 + h)
      },
      chattextboxstyle: {
        ...prevState.chattextboxstyle,
        height: h + 8
      }
    }));
    /*       
    this.setState({
      chatbarstyle: { width:'100%', height: (16+h), backgroundColor: colors.darkcolor3 },
      chattextboxstyle: {width: 200, height:h, borderColor: colors.lightcolor1, borderWidth: 1}
    });
    */
  }

  


  sendMessage(eventnative) {
    console.log('Keyboard',eventnative);
    let msgtype, msgtext, media_cloud, outgoingmsg;
    if (eventnative) {
      console.log(eventnative)
      if(eventnative.link === '##Not_Supported##')
        return;
        
      if (eventnative.link.search('stickers') != -1) {
        msgtype = 4; msgtext = 'Stickers'; media_cloud = eventnative.link;
      } else {
        msgtype = 3; msgtext = 'GIF'; media_cloud = eventnative.link;
      }
    } else {
      console.log(this.state.chatboxtext)
      msgtype = 0;
      msgtext = this.state.chatboxtext.trim();
      if(msgtext.length == 0) return;
    }

    this.processChatText('');
    this.lastTick_textlength = 0;
    this.lastTickAction = 'none';

    let createdDateTime = dateToYMD((new Date()).getTime() + global.TimeDelta);

    let outgoingMessage = {
      CHAT_ROOM_JID: this.props.activeChat.CHAT_ROOM_JID,
      IS_GROUP_MSG: this.props.activeChat.IS_GROUP_MSG,
      MSG_TEXT: msgtext,
      CREATOR_JID: this.props.mytoken.myphone + '@jewelchat.net',
      CREATED_DATE: createdDateTime.date,
      CREATED_TIME: createdDateTime.time,
      TIME_CREATED: createdDateTime.fulltime,
      SENDER_MSG_ID: null,
      MSG_TYPE: msgtype,
      MEDIA_CLOUD: media_cloud
    }

    //console.log('NEW MESSAGE', outgoingMessage);

    db.insertStropheChatData(outgoingMessage).then((_id) => {
      this.props.updateChatPageRedux();
      this.props.updateChatlistRedux();

      outgoingMessage['_ID'] = _id;
      outgoingMessage['SENDER_MSG_ID'] = _id;

      sendOutgoingMessage(outgoingMessage)
        .then(() => {
          db.updateDeliveryAndReadReceipt('Submit', _id, createdDateTime.fulltime).then(status => {
            console.log('status', status)
            this.props.updateChatPageRedux();
            this.props.updateChatlistRedux();
          })
        })
        .catch(err => {
          console.log('Error Sending message');
        })

    })

  }

  openImagePicker() {
    ImagePicker.openPicker({
       //  cropping: true,
        // width: 500,
        // height: 500,
        includeBase64: true,
        compressImageQuality: 0.5,
        mediaType: "any"
    }).then(image => {
      console.log(image)
   //   this.crop(image.path, image)
    })
}
  render() {

    return (
      <View style={this.state.chatbarstyle}>
        { this.props.game.scores.level == 1 && this.state.keyboardmsg && <View style={{width:'100%', height:16, marginBottom:2,backgroundColor:colors.jcgray}}>
          <Text style={{fontSize:12, paddingLeft:8 }}>Use Google Keyboard to send Gifs and Stickers</Text>
        </View>}
        <View style={styles.mainBarConatiner}>          
          {Platform.OS === 'ios' && <TextInput
            placeholder="Type here"
            placeholderTextColor="white"
            onChangeText={(value) => this.processChatText(value)}
            style={this.state.chattextboxstyle}
            //style={{overflow:'scroll'}}                 
            editable={true}
            ref={ref => {
              this.textInput = ref;
            }}
            multiline={true}
            autogrow={true}
            maxHeight={95}
            //value={value}                    
            onContentSizeChange={(e) => this.updateChatTextboxHeight(e.nativeEvent.contentSize.height)}
          />}

          {/* {Platform.OS !== 'ios' && <JCTextInput
            placeholder="Type here"
            placeholderTextColor="white"
            ref={ref => {
              this.textInput = ref;
            }}
            onContentCommitEvent={(event) => { this.sendMessage(event.nativeEvent); }}
            onChangeText={(value) => this.processChatText(value)}
            style={this.state.chattextboxstyle}
            //style={{overflow:'scroll'}}                 
            editable={true}
            multiline={true}
            autogrow={true}
            maxHeight={95}
            //value={value}                    
            onContentSizeChange={(e) => this.updateChatTextboxHeight(e.nativeEvent.contentSize.height)}
          />} */}
          {/* {this.state.chatboxempty && <TouchableOpacity style={styles.secondItem} onPress={()=>this.openImagePicker()}><Icon1 name="photo-camera" color={'white'} size={26} /></TouchableOpacity>} */}
          
          <TouchableOpacity onPress={() => {
            if(this.props.network.networkIsConnected && this.props.network.xmppState==='XMPP_CONNECTED'){
              this.sendMessage();
              this.textInput.clear();
            }
          }} style={styles.fourthItem}>
          { this.props.network.networkIsConnected && this.props.network.xmppState==='XMPP_CONNECTED' 
          ? <Icon1 name='send' size={25} color='white' /> 
          : <Icon1 name='send' size={25} color={colors.jcgray} /> }
          </TouchableOpacity>
        </View>
      </View>

    );

  }

}

function mapStateToProps(state) {
  return {
    chatroom: state.chatroom.chatroom,
    activeChat: state.activechat,
    game: state.game,
    mytoken: state.mytoken,
    network: state.network,
    presence: state.presence
  }
}


function mapDispatchToProps(dispatch) {
  return {
    sendReply: (message, JID, type = 'normal', parent = null) => dispatch(sendReply(message, JID, type, parent)),
    // sendOutgoingMessage: (message) => dispatch(sendOutgoingMessage(message)),
    sendSubscriptionRequest: (JID) => dispatch(sendSubscriptionRequest(JID)),
    updateChatPageRedux: () => dispatch(updateChatPageRedux()),
    updateChatlistRedux: () => dispatch(updateChatlistRedux())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainChatBar);