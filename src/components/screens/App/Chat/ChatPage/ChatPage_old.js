
import React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  InputAccessoryView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Animated,
  Alert,
  PanResponder,
  TouchableOpacity
} from 'react-native';
// import JCTextInput from "../../../../../utilities/JCTextInput/JCTextInput";
import styles from './ChatPage.styles'
import colors from "../../../../shared_styles/colors";
import J6 from '../../../../svg_components/J6';
import J3 from '../../../../svg_components/J6';
import { connect } from 'react-redux';
import { CheckBox, Item } from 'native-base'
import { sendReply, sendReadReceipt, sendSubscriptionRequest } from '../../../../../network/realtime'
import actions from '../../../../../actions'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import db from '../../../../../db/localdatabase'
import rest from '../../../../../network/rest';
import axios from 'axios'
import NetworkManager from '../../../../../network/NetworkManager'
import { getContacts, renderJewel } from '../../../../JCUtils/CommonUtils'
import { Snackbar } from 'react-native-paper';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('came to did mount')
    console.log(this.props.navigation.state.routes[this.props.navigation.state.index]);
    console.log(this.props.navigation.setParams({ otherParam: 'Updated!' }));
    this.props.sendReadReceipt(this.props.activeChat.JID)
    console.log(this.props);
    this.UpdateContact()
    if (this.props.activeChat.IS_PHONEBOOK_CONTACT == 0) {
      getContacts(this.getContactCallback)
    }
  }

  getContactCallback = () => {
    //************** update chatlist redux *******************/
    db.getChatList().then(results => {
      let chatList = []
      for (let i = 0; i < results.rows.length; i++) {
        chatList.push(results.rows.item(i))
      }
      this.props.setChatListData(chatList)
    })
      .catch(err => {
        console.log('FROM JEWELCHAT COMPONENT GETCHAT ERROR')
        console.log(err)
      })
  }
  //to update the contact data (Image, JEWELCHAT_ID etc)
  UpdateContact() {
    var data = {
      'phone': '918756463536',
    }
    NetworkManager.callAPI(rest.downloadContact_Phone, 'post', data).then((responseJson) => {
      console.log('responseJson')
      if (responseJson.error == false) {
        responseJson.contact['invited'] = 0
        responseJson.contact['regis'] = 1
        db.updateContact(responseJson.contact)
      }
      console.log(responseJson)
    })
      .catch((error) => {
        console.log(error)
      });
  }

  state = {
    replyTriggered: false,
    longPressMessage: false,
    visible: false,
    chatboxtext: '',
    selectedCount: 0,
    selectedParent: {},
    selectedMessages: {},
    chatboxempty: true,
    replybarshow: false,
    collectingJewel: false,
    longpressbarshow: false,
    collectionId: null,
    chatbarstyle: { width: '100%', height: 36, backgroundColor: colors.darkcolor3 },
    chattextboxstyle: { flexGrow: 1, maxWidth: '80%', height: 24, borderColor: colors.lightcolor1, borderWidth: 1, borderRadius: 10, color: 'white', fontSize: 14, backgroundColor: colors.darkcolor3, padding: 5, overflow: 'scroll', textAlignVertical: 'top', marginLeft: 4, marginRight: 4 }
  }

  repliesBar() {
    return (
      this.state.replyTriggered ?
        <View style={{ alignItems: 'center', paddingHorizontal: 10, flexDirection: 'row', textAlignVertical: 'top', width: '80%', justifyContent: 'space-between', borderRadius: 10, height: 50, backgroundColor: colors.lightcolor1, marginLeft: 12, marginRight: 4 }}>
          <View style={{ width: '90%', justifyContent: 'center' }}>
            <Text>{this.state.selectedParent.MSG_TEXT}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            this.setState({
              replyTriggered: false,
              selectedParent: {}
            })
          }} >
            <Icon1 name='cancel' size={25} color={'white'} />
          </TouchableOpacity>
        </View> : null
    )
  }

  selectedMessageBottomBar() {
    return (
      this.state.longPressMessage ?
        <View style={{ alignItems: 'center', paddingHorizontal: 20, flexDirection: 'row', textAlignVertical: 'top', width: '100%', justifyContent: 'space-between', borderRadius: 10, height: 50, backgroundColor: colors.darkcolor3 }}>
          <View>
            <Text style={{ fontSize: 16, color: 'white' }}>{this.state.selectedCount}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            this.setState({
              longPressMessage: false,
              selectedParent: {}
            })
          }} >
            <Icon1 name='share' size={25} color={'white'} />
          </TouchableOpacity>
          {Object.keys(this.state.selectedMessages).length < 2 ?
            <TouchableOpacity onPress={() => {
              this.setState({
                longPressMessage: false,
                selectedParent: {}
              })
            }} >
              <Icon2 name='reply' size={25} color={'white'} />
            </TouchableOpacity> : null}
          <TouchableOpacity onPress={() => {
            this.setState({
              longPressMessage: false,
              selectedParent: {}
            })
          }} >
            <Icon1 name='delete' size={25} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.setState({
              longPressMessage: false,
              selectedParent: {}
            })
          }} >
            <Icon1 name='content-copy' size={25} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('ForwardMessage', { messages: Object.values(this.state.selectedMessages) })
            this.setState({
              longPressMessage: false,
              selectedParent: {}
            })
          }} >
            <Icon2 name='mail-forward' size={25} color={'white'} />
          </TouchableOpacity>
        </View> : null
    )
  }

  longPressBar() {
    return;
  }

  sendButtonPress() {
    console.log('qwertyasdfghjkl');
    this.submitChatToChannel(this.state.chatboxtext)
  }


  submitChatToChannel(obj) {

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
    console.log(h);
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

  mainBar() {
    return (
      <View style={styles.mainBarConatiner}>
        <TouchableOpacity style={styles.firstItemMainBar}></TouchableOpacity>
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
          placeholder="Type here Android"
          placeholderTextColor="white"
          ref={ref => {
            this.textInput = ref;
          }}
          onContentCommitEvent={(event) => { this.submitChatToChannel(event.nativeEvent); console.log(event.nativeEvent); console.log('Content Commit'); }}
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
        {this.state.chatboxempty && <TouchableOpacity style={styles.secondItem}></TouchableOpacity>}
        {this.state.chatboxempty && <TouchableOpacity style={styles.thirdItem}></TouchableOpacity>}
        {!this.state.chatboxempty && <TouchableOpacity onPress={() => {
          this.textInput.clear();
          if (this.props.activeChat.IS_PHONEBOOK_CONTACT == 1 && this.props.chatroom.length == 0) {
            this.props.sendSubscriptionRequest(this.props.activeChat.JID)
          }
          console.log(this.state.replyTriggered, this.state.selectedParent)
          if (this.state.replyTriggered) {
            this.props.sendReply(this.state.chatboxtext, this.props.activeChat.JID, 'reply', this.state.selectedParent._ID)
            this.setState({
              replyTriggered: false
            })
          }
          else
            this.props.sendReply(this.state.chatboxtext, this.props.activeChat.JID)

        }} style={styles.fourthItem}><Icon1 name='send' size={25} color='white' /></TouchableOpacity>}
      </View>)
  }


  onJewelPress(item) {
    if (!this.state.collectingJewel) {
      if (this.jewelCount() >= 25) {
        this.setState({
          visible: true
        })
      }
      else {
        this.setState({
          collectingJewel: true,
          collectionId: item._ID
        })
        let data = {
          jeweltype: item.JEWEL_TYPE
        }
        NetworkManager.callAPI(rest.pickJewel, 'POST', data).then(response => {
          db.updatePickedJewel(item._ID).then(resutl => {
            db.getChats(item.CHAT_ROOM_JID, 0)
              .then(results => {
                console.log('FROM JEWELCHAT COMPONENT GETCHAT SUCCESS')
                console.log(results.rows.length)
                let chatroom = []
                for (let i = 0; i < results.rows.length; i++) {
                  chatroom.push(results.rows.item(i))
                }
                this.props.setChatData(chatroom)
              })
              .catch(err => {
                console.log('FROM JEWELCHAT COMPONENT GETCHAT ERROR')
                console.log(err)
              })
          })
          this.setState({
            collectingJewel: false,
            collectionId: null
          })
          this.props.game.jewels[item.JEWEL_TYPE].count = this.props.game.jewels[item.JEWEL_TYPE].count + 1
          this.props.loadGameState(this.props.game)
        }).catch(error => {

        })
      }

    }
  }

  onListEndReached() {
    db.getChats(this.props.activeChat.JID, this.props.chatroom.length)
      .then(results => {
        console.log('FROM JEWELCHAT COMPONENT GETCHAT SUCCESS')
        console.log(results.rows.length)
        if (results.rows.length > 0) {
          let chatroom = []
          for (let i = 0; i < results.rows.length; i++) {
            chatroom.push(results.rows.item(i))
          }
          var chatData = this.props.chatroom.concat(chatroom)
          this.props.setChatData(chatData)
        }
      })
      .catch(err => {
        console.log('FROM JEWELCHAT COMPONENT GETCHAT ERROR')
        console.log(err)
      })
  }
  jewelCount() {
    let jewelCount = 0
    for (let i = 3; i < this.props.game.jewels.length; i++) {
      jewelCount = jewelCount + this.props.game.jewels[i].count
    }
    return jewelCount
  }
  _onDismissSnackBar = () => this.setState({ visible: false });


  render() {

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={105}
        style={styles.mainContainer}>

        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.subContainer}>
            <View style={this.state.chatbarstyle}>
              {this.mainBar()}
            </View>
            {this.repliesBar()}
            {this.selectedMessageBottomBar()}
            <FlatList
              //   removeClippedSubviews={true}
              style={styles.chatroom}
              inverted
              onEndReachedThreshold={0.7}
              data={this.props.chatroom}
              renderItem={({ item, index }) => (
                <ChatItem item={item} index={index}
                  onReplyTriggered={() => {
                    this.setState({
                      replyTriggered: true,
                      selectedParent: item
                    })
                  }}
                  onLongPress={() => {
                    this.state.selectedMessages[item._ID] = { 'isSelected': true, 'data': item }
                    this.setState({
                      longPressMessage: true,
                      selectedParent: item,
                      selectedCount: 1,
                      selectedMessages: this.state.selectedMessages
                    })
                  }}
                  onPress={() => {
                    if (this.state.longPressMessage) {

                      if (!this.state.selectedMessages.hasOwnProperty(item._ID)) {
                        this.state.selectedMessages[item._ID] = { 'isSelected': true, 'data': item }
                        this.setState({
                          selectedCount: this.state.selectedCount + 1,
                          selectedMessages: this.state.selectedMessages
                        })
                      }
                      else {
                        delete this.state.selectedMessages[item._ID]
                        this.setState({
                          selectedCount: this.state.selectedCount - 1,
                          selectedMessages: this.state.selectedMessages
                        })
                      }
                      if (Object.keys(this.state.selectedMessages).length == 0) {
                        this.setState({
                          longPressMessage: false
                        })
                      }
                      console.log(this.state.selectedMessages)
                    }
                  }}
                  state={this.state}
                  allchats={this.props.chatroom}
                  onjewelpress={() => { this.onJewelPress(item) }} />
              )}
              onEndReached={() => {
                console.log('end reached')
                this.onListEndReached()
              }}
              keyExtractor={item => item._ID + ''}
            />
            <Snackbar
              duration={1000}
              style={{ backgroundColor: colors.lightcolor1, alignItems: 'center'}}
              visible={this.state.visible}
              onDismiss={this._onDismissSnackBar}>
              Jewel Store is FULL.
              </Snackbar>
          </View>

        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}


class ChatItem extends React.Component {
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY()
    this.myChat = props.item.CHAT_ROOM_JID !== props.item.CREATOR_JID ? true : false
    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => { return !(gestureState.dx === 0 && gestureState.dy === 0) },
      onPanResponderMove: (event, gesture) => {
        let triggerstate
        if (this.myChat) {
          triggerstate = 100
        }
        else
          triggerstate = 150
        if (gesture.dx > triggerstate) {
          Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: 0
          }).start()
        }
        else
          position.setValue({ x: gesture.dx, y: 0 })
      },
      onPanResponderRelease: (event, gesture) => {
        let triggerstate
        if (this.myChat) {
          triggerstate = 100
        }
        else
          triggerstate = 150
        console.log(triggerstate, this.myChat, gesture.dx)
        if (gesture.dx > triggerstate) {
          Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: 0
          }
          ).start(() => {
            props.onReplyTriggered()
          })
        }
        else {
          Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: 0
          }
          ).start()
        }
      }
    })
    this.state = { position, panResponder }
  }

  render() {
    const { item, index, allchats, onjewelpress, onReplyTriggered, onLongPress, onPress, state } = this.props
    let sectionheader = false, mychat = false;
    if (!allchats[index + 1] || item.CREATED_DATE !== allchats[index + 1].CREATED_DATE)
      sectionheader = true;

    if (item.CHAT_ROOM_JID !== item.CREATOR_JID)
      mychat = true
    else
      mychat = false;

    return (
      <View style={styles.chatItemContainer}>
        {
          sectionheader &&
          <Text style={styles.createdDateStyle}>
            {item.CREATED_DATE}
          </Text>
        }
        {!mychat &&
          <View style={styles.friendMsgContainer}>
            {state.longPressMessage ?
              <View style={{ marginBottom: 10, marginRight: 17 }}>
                <CheckBox onPress={() => onPress()} checked={state.selectedMessages.hasOwnProperty(item._ID) ? true : false} color='#4287f5' />
              </View>
              : null}
            {(item.MAX_SEQUENCE - item.SEQUENCE < 25 || item.SEQUENCE == -1) && !item.IS_JEWEL_PICKED ?
              <TouchableOpacity style={(state.collectingJewel && item._ID == state.collectionId) ? styles.collectingJewel : styles.jewelContainer} onPress={onjewelpress}>
                {renderJewel(item.JEWEL_TYPE, "75%", "75%", styles.jewelStyle)}
              </TouchableOpacity> : null}

            <Animated.View style={[styles.msgContainer, this.state.position.getLayout()]} {...this.state.panResponder.panHandlers}>
              <AnimatedTouchable style={styles.friendMsgTextContainer} onLongPress={() => onLongPress()} onPress={() => onPress()}>
                {item.IS_FORWARD == 1 ?
                  <View style={{ flexDirection: 'row', paddingLeft: 5, paddingTop: 5, alignItems: 'center' }}>
                    <Icon2 name='mail-forward' size={10} color={'white'} />
                    <Text style={{ color: 'white', paddingLeft: 5, fontSize: 10 }}>Forwarded</Text>
                  </View>
                  : null}
                {/* {item.IS_REPLY == 1 ?
                  <View style={{ flexDirection: 'row', paddingLeft: 5, paddingTop: 5, alignItems: 'center' }}>
                    <Icon2 name='mail-forward' size={10} color={'white'} />
                    <Text style={{ color: 'white', paddingLeft: 5, fontSize: 10 }}>Reply of {item.REPLY_PARENT}</Text>
                  </View>
                  : null} */}
                <Text style={styles.friendMsgText}>{item.MSG_TEXT}</Text>
              </AnimatedTouchable>
              <Text style={styles.msgTime}>{item.CREATED_TIME}</Text>
            </Animated.View>

          </View>
        }

        {mychat &&
          <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
            {state.longPressMessage ?
              <TouchableOpacity onPress={() => onPress()} style={{ marginBottom: 15 }}>
                <CheckBox onPress={() => onPress()} checked={state.selectedMessages.hasOwnProperty(item._ID) ? true : false} color='#4287f5' />
              </TouchableOpacity>
              : null}
            <View style={styles.myMsgContainer}>
              <Animated.View style={[styles.msgContainer, this.state.position.getLayout()]} {...this.state.panResponder.panHandlers}>
                <AnimatedTouchable style={styles.myMsgTextConatiner} onLongPress={() => onLongPress()} onPress={() => onPress()}>
                  {item.IS_FORWARD == 1 ?
                    <View style={{ flexDirection: 'row', paddingLeft: 5, paddingTop: 5, alignItems: 'center' }}>
                      <Icon2 name='mail-forward' size={10} color={'white'} />
                      <Text style={{ color: 'white', paddingLeft: 5, fontSize: 10 }}>Forwarded</Text>
                    </View>
                    : null}
                  {/* {item.IS_REPLY == 1 ?
                    <View style={{ flexDirection: 'row', paddingLeft: 5, paddingTop: 5, alignItems: 'center' }}>
                      <Icon2 name='mail-forward' size={10} color={'white'} />
                      <Text style={{ color: 'white', paddingLeft: 5, fontSize: 10 }}>Reply of {item.REPLY_PARENT}</Text>
                    </View>
                    : null} */}
                  <Text style={styles.myMsgText}>{item.MSG_TEXT}</Text>
                </AnimatedTouchable>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text style={styles.msgTime}>{item.CREATED_TIME}</Text>
                  {item.IS_READ || item.IS_DELIVERED ?
                    <Icon name='check-double' size={10} color={item.IS_READ ? colors.lightcolor1 : 'white'} /> :
                    item.IS_SUBMITTED ?
                      <Icon name='check' size={10} color={'white'} /> :
                      <Icon name='clock' size={10} color={'white'} />
                  }
                </View>
              </Animated.View>
            </View>
          </View>

        }

      </View>
    )
  }
}






function mapStateToProps(state) {
  return {
    chatroom: state.chatroom.chatroom,
    activeChat: state.chatslist.activeChat,
    game: state.game
  }
}


function mapDispatchToProps(dispatch) {
  return {
    sendReply: (message, JID, type = 'normal', parent = null) => dispatch(sendReply(message, JID, type, parent)),
    addChatMessage: (chatData) => dispatch(actions.addChatMessage(chatData)),
    sendReadReceipt: (JID) => dispatch(sendReadReceipt(JID)),
    setChatData: (id, offset) => dispatch(actions.setChatData(id, offset)),
    setChatListData: (chatlistData) => dispatch(actions.setChatListData(chatlistData)),
    sendSubscriptionRequest: (JID) => dispatch(sendSubscriptionRequest(JID)),
    loadGameState: (gamestate) => dispatch(actions.loadGameState(gamestate))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);