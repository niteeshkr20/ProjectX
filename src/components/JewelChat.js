import React from "react";

import { AppState, Text, Platform, PermissionsAndroid } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import Constants from '../network/rest';

import NetworkManager from '../network/NetworkManager';
import rest from '../network/rest';
import messaging from '@react-native-firebase/messaging';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    NavigationContainer
} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { connect } from 'react-redux';

import JewelChatSplashScreen from "./screens/JewelChatSplashScreen";
import IntroScreen from "./screens/Auth/IntroScreen";
import RegisterPhone from "./screens/Auth/RegisterPhone";
import EnterOTP from "./screens/Auth/EnterOTP";
import EnterDetails from "./screens/Auth/EnterDetails";

import ChatList from "./screens/App/Chat/ChatList/ChatList";
import Game from "./screens/App/Game/Game";
import TaskDetail from "./screens/App/Game/TaskDetail/TaskDetail"
import GiftTaskDetail from "./screens/App/Game/GiftTaskDetail/GiftTaskDetail"
import SuccessFullGiftRedeem from './screens/App/Game/SuccessFullGiftRedeem'

import Profile from "./screens/App/Profile/Profile";
import LeaderBoard from './screens/App/Profile/LeaderBoard/LeaderBoard'
import Wallet from './screens/App/Profile/Wallet/WalletScreen'
import ShareScreen from './screens/App/Profile/Share/ShareScreen'

import FriendProfile from './screens/App/FriendProfile/FriendProfile'
import UserProfile from './screens/App/Profile/UserProfile/UserProfile'
import ImageEdit from './screens/App/Profile/UserProfile/ImageEdit'
import GiftsWon from './screens/App/Profile/UserProfile/GiftsWon'

import ChatPage from "./screens/App/Chat/ChatPage/ChatPage";
import ChatMediaViewer from "./screens/App/Chat/ChatMediaViewer/ChatMediaViewer";
import ChatRoomDetails from './screens/App/Chat/ChatRoomDetails/ChatRoomDetails';
import ForwardMessage from './screens/App/Chat/ForwardMessage/ForwardMessage';
import NewGroup from "./screens/App/NewGroup";
import JewelFactory from "./screens/App/JewelFactory/jewelFactory";

import CustomHeader from "./shared_components/customHeader/CustomHeader";
import HeaderLevelZero from "./shared_components/customHeader/HeaderLevelZero";
import HeaderLevelOnePlus from "./shared_components/customHeader/HeaderLevelOnePlus";
import HeaderChatPage from "./shared_components/customHeader/HeaderChatPage";
import JCModal from "./shared_components/JCModal";

import colors from "./shared_styles/colors";
import TabIcon from "./svg_components/TabIcons";
import db from "../db/localdatabase";

import { realtimeConnect, realtimeDisconnect } from "../network/realtime"
import { downloadMessages } from "../network/realtime-utils/download-history"

import actions from '../actions'
import ContactsScreen from '../components/screens/App/Contacts/Contacts'

import CreateGroupScreen from '../components/screens/App/CreateGroup/CreateGroupScreen'
import NewGroupScreen from '../components/screens/App/CreateGroup/NewGroupScreen'
import Contacts from "../components/screens/App/Contacts/Contacts";


const MainTabs = () => {
    const Tab = createBottomTabNavigator();
    return <Tab.Navigator
        initialRouteName="Chats"
        screenOptions={{
            tabBarActiveTintColor: colors.lightcolor1,
            tabBarActiveBackgroundColor: colors.darkcolor3,
            tabBarInactiveTintColor: colors.jcgray,
            tabBarInactiveBackgroundColor: colors.darkcolor3,
            tabBarStyle: {
                backgroundColor: colors.darkcolor3
            },
            headerShown: false,
        }}>
        <Tab.Screen
            name="Chats"
            component={ChatList}
            options={{
                tabBarLabel: 'Chats',
                tabBarIcon: ({ tintColor }) => (
                    <TabIcon name="Chats" fill={tintColor} height="25" width="25" />
                ),
            }}
        />
        <Tab.Screen
            name="Game"
            component={Game}
            options={{
                tabBarLabel: "Game",
                tabBarIcon: ({ tintColor }) => (
                    <TabIcon name="Gifts" fill={tintColor} height="25" width="25" />
                )
            }}
        >
        </Tab.Screen>
        <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ tintColor }) => (
                    <TabIcon name="Profile" fill={tintColor} height="25" width="25" />
                )
            }}
        >
        </Tab.Screen>
    </Tab.Navigator>
}

const AppStack = () => {
    const Stack = createNativeStackNavigator();
    return (<Stack.Navigator
        mode="modal"
        headerMode="none"
        transparentCard={true}
    >
        <Stack.Group>
            <Stack.Screen name="MainTabs" component={MainTabs}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelZero {...props} navigation={navigation} title='JewelChat' />
                })}>

            </Stack.Screen>
            <Stack.Screen name="ChatPage" component={MainTabs}
                options={({ navigation }) => ({
                    header: (props) => <HeaderChatPage {...props} navigation={navigation} title='Chat Page' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="ChatMediaViewer" component={ChatMediaViewer}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus {...props} navigation={navigation} title='Media' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="ChatRoomDetails" component={ChatRoomDetails}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus {...props} navigation={navigation} title='Media' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="NewGroup" component={NewGroup}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus {...props} navigation={navigation} title='Create New Group' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="JewelFactory" component={JewelFactory}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus  {...props} navigation={navigation} title='Jewel Factory' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="LeaderBoard" component={LeaderBoard}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus  {...props} navigation={navigation} title='Leaderboard' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="Wallet" component={Wallet}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus  {...props} navigation={navigation} title='Wallet' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="TaskDetail" component={TaskDetail}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus  {...props} navigation={navigation} title='Task Detail' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="GiftTaskDetail" component={GiftTaskDetail}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus  {...props} navigation={navigation} title='Gift Task Detail' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="SuccessFullGiftRedeem" component={SuccessFullGiftRedeem} />
            <Stack.Screen name="FriendProfile" component={FriendProfile}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus  {...props} navigation={navigation} title='Friend Profile' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="Contacts" component={Contacts}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus  {...props} navigation={navigation} title='Contacts' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="UserProfile" component={UserProfile}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus  {...props} navigation={navigation} title='User Profile' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="ForwardMessage" component={ForwardMessage}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus  {...props} navigation={navigation} title='Forward' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="ImageEdit" component={ImageEdit}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus  {...props} navigation={navigation} title='Image Edit' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="GiftsWon" component={GiftsWon}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus  {...props} navigation={navigation} title='Gifts Won' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="ShareScreen" component={ShareScreen}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus  {...props} navigation={navigation} title='Share Screen' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="CreateGroupScreen" component={CreateGroupScreen}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus  {...props} navigation={navigation} title='Mew Group' />
                })}
            ></Stack.Screen>
            <Stack.Screen name="NewGroupScreen" component={NewGroupScreen}
                options={({ navigation }) => ({
                    header: (props) => <HeaderLevelOnePlus  {...props} navigation={navigation} title='Mew Group' />
                })}
            ></Stack.Screen>
        </Stack.Group>
        <Stack.Screen name="MyModal" component={JCModal} options={{ presentation: 'modal',  headerShown: false }}/>
    </Stack.Navigator>)
}

const AuthStack = () => {
    const Stack = createNativeStackNavigator();
    return <Stack.Navigator
    screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="RegisterPhone" component={RegisterPhone} />
        <Stack.Screen name="EnterOTP" component={EnterOTP} />
        <Stack.Screen name="EnterDetails" component={EnterDetails} />
    </Stack.Navigator>
}


class JewelChat extends React.Component {

    componentDidUpdate(prevProps, prevState) {
        console.log('CURRENT STATE', this.props);
        //console.log(this.props)
    }


    state = {
        isLoggedIn: true,
        isLoadingComplete: false
    }
    componentDidMount() {
        console.log('MOUNT APP');
        AppState.addEventListener('change', this._handleAppStateChange);
        this.unsubscribe = NetInfo.addEventListener(this._handleNetworkChange);


        db.getChatList().then(chatList => {
            console.log('FROM JEWELCHAT COMPONENT GETCHAT SUCCESS');
            console.log(chatList);
            this.props.setChatListData(chatList);
        })
            .catch(err => {
                console.log('FROM JEWELCHAT COMPONENT GETCHAT ERROR')
                console.log(err)
            })

        //  if (!this.props.mytoken.isLoading && this.props.mytoken.token !== null && this.props.network.networkIsConnected){
        //     console.log('Came to real time connect')
        //     this.props.realtimeConnect();
        //     }

        // messaging().onTokenRefresh(async (fcmToken) => {

        //     let data = {
        //         token: fcmToken,
        //         push_service: Platform.OS === 'ios' ? 'ios' : 'android'
        //     }

        //     NetworkManager.callAPI(rest.updatePushNotificationToken, 'POST', data).then((responseJson) => {
        //         this.props.tokenLoad({ tokenrefresh: true, fcmToken })
        //     })
        //         .catch((error) => { });

        // });

        this.setState({ isLoadingComplete: true })
    }
    componentWillUnmount() {
        console.log('UNMOUNT APP')
        // AppState.removeEventListener('change', this._handleAppStateChange);
        this.unsubscribe();
    }

    _handleAppStateChange = (nextAppState) => {

        console.log('APP STATE CHANGE', nextAppState);
        this.props.appstateChange(nextAppState);
        if (nextAppState == 'inactive' || nextAppState == 'background') {

            console.log('LOGOUT TIME/ DOWNLOAD COMPLETE', global.dowloadMessagesComplete, global.TimeDelta);

            if (global.TimeDelta && global.dowloadMessagesComplete) {

                try {
                    AsyncStorage.setItem(
                        'logOutTime',
                        (new Date().getTime() + global.TimeDelta).toString()  //'1609707334068'
                    ).then(val => {
                        console.log('LOGOUT TIME SAVED');
                    });
                } catch (error) {
                    // Error saving data
                }

            }

            //this.props.setActiveChat({})
            //this.props.closeRealtimeDisconnect();

        } else if (nextAppState == 'active') {
            console.log("testing app state is active")
            axios.post(Constants.baseURL + Constants.getAccessToken,
                { "refreshToken": this.props.mytoken.token }
            ).then(response => {
                console.log('JEWELCHAT access token load successful return from background/inactive')
                let temptokens = this.props.mytoken;
                temptokens.cookie = response.data.accessToken;
                this.props.tokenLoad(temptokens);
                this.setState({ isLoggedIn: true })
            }).catch(error => {
                //handle logout flow
                console.log(error)
            });

            global.dowloadMessagesComplete = false;

            global.randstr = 'time=' + new Date().getTime();
            console.log('RANDSTR ', global.randstr);

            if (this.props.network.xmppState === 'XMPP_CONNECTED') {

                AsyncStorage.getItem('logOutTime')
                    .then((lastlogouttime) => {
                        console.log('LOGOUT TIME', lastlogouttime);

                        if (lastlogouttime) {

                            let current_servertime = new Date().getTime() + global.TimeDelta
                            lastlogouttime = current_servertime - parseInt(lastlogouttime) > 604800000 ? (current_servertime - 604800000) : (parseInt(lastlogouttime) - 1200000);
                            this.props.downloadMessages(lastlogouttime);

                        } else
                            global.dowloadMessagesComplete = true;

                    });

            }

        }

    };

    _handleNetworkChange = (state) => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        this.props.networkstateChange(state);

        if (!this.props.mytoken.isLoading && this.props.mytoken.token !== null && this.props.network.networkIsConnected)
            this.props.openRealtimeConnect();
    }


    render() {
        const Stack = createNativeStackNavigator();
        console.log("test", this.state.isLoadingComplete,this.state.isLoggedIn  )
        return (
            <NavigationContainer>
                {this.state.isLoadingComplete ? (
                    this.state.isLoggedIn ? (
                        <AppStack />
                    ) : (
                        <AuthStack />
                    )
                ) : (
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }} >
                    <Stack.Screen name="JewelChatSplashScreen" component={JewelChatSplashScreen} />
                </Stack.Navigator>
             )} 
                {/* <AppStack /> */}
                {/* <MainTabs/> */}
            </NavigationContainer>

            // <AppContainer />

        );
    }

}


function mapStateToProps(state) {
    return {
        mytoken: state.mytoken,
        appstate: state.appstate,
        network: state.network,
        // activeChat: state.activechat,
        // chatslist: state.chatslist,
        // tasks: state.tasks,
        // taskdetails: state.taskdetails,
        // gifttasks: state.gifttasks,
        // gifttaskdetails: state.gifttaskdetails,
        // usergifttasks: state.usergifttasks,
        game: state.game,
        // presence: state.presence
    }
}


function mapDispatchToProps(dispatch) {
    return {
        tokenLoad: (myTokens) => dispatch({ type: 'USER_TOKEN_LOADED', myTokens }),
        appstateChange: (appstate) => dispatch({ type: 'APP_STATE_CHANGE', payload: appstate }),
        networkstateChange: (network) => dispatch({ type: 'NETWORK_STATE_CHANGE', payload: network }),
        openRealtimeConnect: () => dispatch(realtimeConnect()),
        //closeRealtimeDisconnect: () => dispatch(realtimeDisconnect()),
        setChatListData: (chatList) => dispatch(actions.setChatListData(chatList)),
        setChatData: (chatData) => dispatch(actions.setChatData(chatData)),
        setActiveChat: (activeChat) => dispatch(actions.setActiveChat(activeChat)),
        downloadMessages: (lastlogouttime) => dispatch(downloadMessages(lastlogouttime))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(JewelChat);
