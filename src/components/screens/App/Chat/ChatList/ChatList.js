import React from "react";
import {  
  View,
  Image,
  TouchableOpacity,  
  FlatList,
  Text
} from "react-native";
import { connect } from 'react-redux';
import { FABGroup, FAB, Portal, Provider, StyleSheet } from 'react-native-paper';
import styles from './ChatList.styles'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Logo from '../../../../svg_components/Logo';
import colors from "../../../../shared_styles/colors";
import db from '../../../../../db/localdatabase'
import actions from '../../../../../actions'
import { setActiveChat } from '../../../../../actions/chatListActions'
import { updateChatPageRedux, updateChatlistRedux } from '../../../../../network/realtime-utils/messages';
import rest from "../../../../../network/rest";

// { _ID, 
// MSG_TEXT, 
// MSG_TYPE, 
// UNREAD_COUNT, 
// LAST_MSG_CREATED_TIME, 
// CHAT_ROOM_JID,
// IS_GROUP_MSG, 
// JID, 
// SMALL_IMAGE, 
// PHONEBOOK_CONTACT_NAME, 
// CONTACT_NAME,
// JEWELCHAT_ID' }
//import JCImages from "../../../../../assets/JCImages";
//import Icon from 'react-native-vector-icons/FontAwesome'


class Item extends React.Component {

  constructor(props) {
    super(props);        
  }

  state = {
    profileimageerror: false
  }

  randomstring = '?'+Math.ceil(Math.random()*1000000);

  //({ item, onpressitem, onlongpressitem })

  

  render(){
    //console.log('CHATLIST ITEM', this.props.item.CHAT_ROOM_JID);
    return (
      <TouchableOpacity
        onPress={() => this.props.onpressitem(this.props.item)}
        //onLongPress={() => this.props.onlongpressitem(item._ID)}
        style={styles.mainConatiner}
      >
        <View style={styles.subContainer}>
          <View style={styles.marginstyle} />
          <View style={styles.chatBox}>
            { this.props.item.JEWELCHAT_ID != 1 &&
              <Image
                source={{ headers: { Pragma: 'no-cache' }, uri:rest.imageBaseURL + this.props.item.CHAT_ROOM_JID.split('@')[0] + '?' + global.randstr }}
                style={[{ position:'absolute', top:0, left:0 },styles.imgBackground]}
                onLoad={()=>{
                  //this.setState( { profileimageerror: false } ) 
                }}
                onError={(error) => {                    
                    //console.log('https://kuchbhi.com/'+this.props.item.CHAT_ROOM_JID.split('@')[0]+'?'+Math.ceil(Math.random()*1000000));
                    this.setState( { profileimageerror: true } ) 
                  } 
                }
                ></Image>
            }
            {
              this.props.item.JEWELCHAT_ID == 1 && <Logo height="75%" width="75%" style={styles.jewelStyle} />
            }
            {
              this.state.profileimageerror && this.props.item.JEWELCHAT_ID != 1 && (this.props.item.IS_GROUP_MSG == 0 || this.props.item.IS_GROUP_MSG == null ) && <Icon  name='user' color={colors.jcgray} size={24} solid />
            }
            {
              this.state.profileimageerror && this.props.item.JEWELCHAT_ID != 1 && this.props.item.IS_GROUP_MSG == 1 && <Icon  name='users' color={colors.jcgray} size={24} solid />
            }
          </View>
          <View style={styles.chatboxLeftContainer} >
            <Text style={styles.name}>{this.props.item.PHONEBOOK_CONTACT_NAME ? this.props.item.PHONEBOOK_CONTACT_NAME 
            : (this.props.item.JEWELCHAT_ID == 1 ? 'Team JewelChat' 
            : (this.props.item.IS_GROUP_MSG == 0 || this.props.item.IS_GROUP_MSG == null ? '+' + this.props.item.CHAT_ROOM_JID.split('@')[0]
            : (this.props.item.CONTACT_NAME ? this.props.item.CONTACT_NAME : 'Group Chat') ) )}</Text>
            <Text style={styles.msgText}>{this.props.item.MSG_TEXT != null ? this.props.item.MSG_TEXT.substring(0, 25) + (this.props.item.MSG_TEXT.length > 25 ? '...' : '') : ''}</Text>
          </View>
        </View>
        <View style={styles.itemLeftConatiner} >
          <View style={styles.itemLeftSubContainer}>
            <Text style={styles.msgCreateTime}>{relativeDateSting(this.props.item.LAST_MSG_CREATED_TIME)}</Text>
            {this.props.item.UNREAD_COUNT > 0 &&
              <View style={styles.unreadCount}>
                <Text
                  style={styles.countText} >
                  {this.props.item.UNREAD_COUNT}
                </Text>
              </View>
            }
          </View>
          <View style={styles.marginStyleLeft} />
        </View>
      </TouchableOpacity>
    );

  }


}


class ChatList extends React.Component {


  state = {
    open: false
  }


  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.props.setActiveChat({})
      console.log('ChatList Mount');
      this.props.updateChatlistRedux();
    });
    
    
  }

  componentWillUnmount() {
    console.log('ChatList UnMount');
   // this.focusListener.remove()
  }

  render() {
    return (
      <View style={styles.rootContainer}>

        <Provider>
          <Portal>
            <FlatList
              data={this.props.chatslist}
              extraData={this.props}
              renderItem={({ item }) => (
                <Item item={item}
                  onpressitem={(item) => {
                    this.props.setActiveChat(item);
                    //this.props.updateChatPageRedux();
                    this.props.navigation.navigate('ChatPage', item);
                  }}                  
                />
              )}
              keyExtractor={item => item._ID + ''}
            />

            <FAB.Group
              style={{ paddingBottom: 30 }}
              fabStyle={{ backgroundColor: colors.lightcolor2 }}
              color={'white'}
              open={this.state.open}
              icon={this.state.open ? 'calendar-today' : 'plus'}
              actions={[
                { icon: 'group', label: 'New Group (coming soon)', color: 'white', style: { backgroundColor: colors.lightcolor2 } , onPress: () => {}},
                { icon: 'phone', label: 'Contacts', color: 'white', style: { backgroundColor: colors.lightcolor2 }, onPress: () => this.props.navigation.navigate('Contacts') },
              ]}
              onStateChange={({ open }) => this.setState({ open })}
              onPress={() => {
                if (this.state.open) {
                  // do something if the speed dial is open
                }
              }}
            />

          </Portal>
        </Provider>



      </View>
    );
  }
}




function relativeDateSting(last_msg_time) {

  let date = new Date(Number(last_msg_time));

  let delta = Math.round((+new Date - date) / 1000);

  let minute = 60,
    hour = minute * 60,
    day = hour * 24;

  let fuzzy;

  if (delta < 30) {
    fuzzy = 'just now';
  } else if (delta < minute) {
    fuzzy = delta + ' seconds ago';
  } else if (delta < 2 * minute) {
    fuzzy = 'a minute ago'
  } else if (delta < hour) {
    fuzzy = Math.floor(delta / minute) + ' minutes ago';
  } else if (Math.floor(delta / hour) == 1) {
    fuzzy = '1 hour ago.'
  } else if (delta < day) {
    fuzzy = Math.floor(delta / hour) + ' hours ago.';
  } else if (delta < day * 2) {
    fuzzy = 'yesterday';
  } else {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    fuzzy = dd + '/' + mm + '/' + yyyy;
  }

  return fuzzy;

}

function mapStateToProps(state) {
  return {
    chatslist: state.chatslist
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveChat: (activeChat) => dispatch(setActiveChat(activeChat)),
    setChatData: (chatData) => dispatch(actions.setChatData(chatData)),
    updateChatPageRedux: () => dispatch(updateChatPageRedux()),
    updateChatlistRedux: () => dispatch(updateChatlistRedux())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
