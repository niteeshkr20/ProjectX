import React from "react";
import {
    ActivityIndicator,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    FlatList,
    View,
    Text,
    SafeAreaView
} from "react-native";
import J6 from '../../../svg_components/J6';
import styles from './CreateGroupScreen.styles'
import { connect } from 'react-redux';
import colors from "../../../shared_styles/colors";
import Logo from '../../../svg_components/Logo';
import { Searchbar } from 'react-native-paper'
import NetworkManager from "../../../../network/NetworkManager";
import rest from "../../../../network/rest";
import db from "../../../../db/localdatabase";
import actions from '../../../../actions/index'
import { CheckBox } from 'native-base'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import { sendReply, sendReadReceipt, sendSubscriptionRequest } from '../../../../network/realtime'
import Icon from 'react-native-vector-icons/FontAwesome5'


class CreateGroupScreen extends React.Component {
    /*static navigationOptions = ({ navigation }) => {
      
      console.log('HERE');
      return {
        header: <CustomHeader levelbar="show" />
      };
  };*/
    constructor(props) {
        super(props)
        this.state = {
            searchQuery: '',
            longPressMessage: false,
            displayContactData: [],
            contactData: [],
            selectedCount: 0,
            selectedContacts: {}
        }
    }
    componentDidMount() {
        this.getContactsCallback()
    }
    getContactsCallback = () => {
        db.getContactList('random').then(results => {
            let chatList = []
            for (let i = 0; i < results.rows.length; i++) {
                chatList.push(results.rows.item(i))
            }
            this.setState({
                contactData: chatList,
                displayContactData: chatList
            })
        }).catch(err => {
            console.log(err)
        })
    }

    _onChangeSearch = (query) => {
        this.setState({ searchQuery: query })
        if (query.length > 0) {
            var filteredContacts = this.state.contactData.filter(item => {
                if (item.IS_PHONEBOOK_CONTACT)
                    return item.PHONEBOOK_CONTACT_NAME.toLowerCase().includes(query.toLowerCase())
                else
                    return (item.CONTACT_NUMBER).toString().includes(query.toLowerCase())
            })
            this.setState({
                displayContactData: filteredContacts
            })
        }
        else {
            this.setState({
                displayContactData: this.state.contactData
            })
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.rootContainer}>
                <Searchbar
                    placeholder="Search Contacts"
                    onChangeText={this._onChangeSearch}
                    value={this.state.searchQuery}
                    style={{ backgroundColor: colors.darkcolor3, color: 'white' }}
                    inputStyle={{ color: 'white', fontSize: 14 }}
                    placeholderTextColor='white'
                    iconColor='white'
                    theme='dark'
                />
                <FlatList
                    data={this.state.displayContactData}
                    renderItem={({ item }) => (
                        <Item item={item}
                            onpressitem={(item) => {
                                if (this.state.longPressMessage) {

                                    if (!this.state.selectedContacts.hasOwnProperty(item._ID)) {
                                        this.state.selectedContacts[item._ID] = { 'isSelected': true, 'data': item }
                                        this.setState({
                                            selectedCount: this.state.selectedCount + 1,
                                            selectedContacts: this.state.selectedContacts
                                        })
                                    }
                                    else {
                                        delete this.state.selectedContacts[item._ID]
                                        this.setState({
                                            selectedCount: this.state.selectedCount - 1,
                                            selectedContacts: this.state.selectedContacts
                                        })
                                    }
                                    if (Object.keys(this.state.selectedContacts).length == 0) {
                                        this.setState({
                                            longPressMessage: false
                                        })
                                    }
                                    console.log(this.state.selectedContacts)
                                }
                            }}
                            onLongPress={() => {
                                this.state.selectedContacts[item._ID] = { 'isSelected': true, 'data': item }
                                this.setState({
                                    longPressMessage: true,
                                    selectedCount: 1,
                                    selectedContacts: this.state.selectedContacts
                                })
                            }}
                            state={this.state}
                        />
                    )}
                    keyExtractor={item => item._ID + ''}
                />
                {this.state.selectedCount > 0 ?
                    <View style={{ paddingHorizontal: 10, justifyContent: 'space-between', borderTopWidth: 0.5, borderTopColor: colors.jcgray, flexDirection: 'row' }}>
                        <ScrollView horizontal={true} contentContainerStyle={{ paddingBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            {Object.values(this.state.selectedContacts).map((item, index) =>
                                <View>
                                    {item.data.IMAGE_PATH ?
                                        <View style={{ flexDirection: 'column' }}>
                                            <Image source={{ uri: item.data.IMAGE_PATH }} />
                                            <Text maxLength={10} style={{ color: 'white' }}>{item.data.PHONEBOOK_CONTACT_NAME ? item.data.PHONEBOOK_CONTACT_NAME.length > 8 ? item.data.PHONEBOOK_CONTACT_NAME.substring(0, 8) + '...' : item.data.PHONEBOOK_CONTACT_NAME : '+' + item.data.CONTACT_NUMBER}</Text>
                                        </View>
                                        :
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={styles.chatBox}>
                                                <Icon name='user' color={colors.jcgray} size={24} solid />
                                            </View>
                                            <Text style={{ color: 'white', fontSize: 10 }}>{item.data.PHONEBOOK_CONTACT_NAME ? item.data.PHONEBOOK_CONTACT_NAME.length > 8 ? item.data.PHONEBOOK_CONTACT_NAME.substring(0, 8) + '...' : item.data.PHONEBOOK_CONTACT_NAME : '+' + item.data.CONTACT_NUMBER}</Text>
                                        </View>
                                    }
                                </View>
                            )
                            }
                        </ScrollView>

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('NewGroupScreen', { members: this.state.selectedContacts })
                        }} style={{ alignItems: 'center', justifyContent: 'center' }}><Icon style={{ paddingLeft: 10 }} name='arrow-circle-right' size={35} color={colors.lightcolor1} /></TouchableOpacity>
                    </View>
                    : null}
                <StatusBar barStyle="light-content" hidden={false} translucent={true} />
            </SafeAreaView>
        );
    }
}

function Item({ item, onpressitem, onLongPress, state }) {


    return (
        <TouchableOpacity
            onPress={() => onpressitem(item)}
            onLongPress={() => onLongPress(item)}
            style={styles.mainConatiner}
        >
            <View style={styles.subContainer}>
                <View style={styles.marginstyle} />
                <View style={styles.chatBox}>
                    {item.SMALL_IMAGE && item.JEWELCHAT_ID != 1 &&
                        <ImageBackground
                            source={{ uri: item.SMALL_IMAGE }}
                            style={styles.imgBackground}></ImageBackground>
                    }
                    {
                        item.JEWELCHAT_ID == 1 && <Logo height="75%" width="75%" style={styles.jewelStyle} />
                    }
                    {
                        !item.SMALL_IMAGE && item.JEWELCHAT_ID != 1 && <J6 height="75%" width="75%" style={styles.jewelStyle} />
                    }
                </View>
                <View style={styles.chatboxLeftContainer} >
                    <Text style={styles.name}>{item.PHONEBOOK_CONTACT_NAME ? item.PHONEBOOK_CONTACT_NAME : (item.JEWELCHAT_ID == 1 ? 'Team JewelChat' : '+' + item.CONTACT_NUMBER)}</Text>
                    <Text style={styles.msgText}>{item.STATUS_MSG != null ? item.STATUS_MSG.substring(0, 25) + (item.STATUS_MSG.length > 25 ? '...' : '') : ''}</Text>
                </View>
            </View>
            {state.selectedContacts.hasOwnProperty(item._ID) ?
                <View style={styles.itemLeftConatiner} >
                    <View style={styles.itemLeftSubContainer}>
                        <CheckBox onPress={() => onpressitem(item)} checked={state.selectedContacts.hasOwnProperty(item._ID) ? true : false} color='#4287f5' />
                    </View>
                    <View style={styles.marginStyleLeft} />
                </View> : null}
        </TouchableOpacity>
    );
}

function mapStateToProps(state) {
    return {
        chatslist: state.chatslist.chatList
    }
}


function mapDispatchToProps(dispatch) {
    return {
        sendReply: (message, JID, type = 'normal', parent = null) => dispatch(sendReply(message, JID, type, parent)),
        setActiveChat: (activeChat) => dispatch(actions.setActiveChat(activeChat)),
        setChatListData: (chatList) => dispatch(actions.setChatListData(chatList)),
        setChatData: (chatdata) => dispatch(actions.setChatData(chatdata))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupScreen);