import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  BackHandler,  
  Keyboard,
  Platform,
  Alert
} from 'react-native';

import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Snackbar } from 'react-native-paper';
import { Form, Item, Input, Icon, Box } from 'native-base';
import colors from "../../shared_styles/colors";
import CustomLoader from '../../shared_components/CustomLoader';
import TabIcon from "../../svg_components/TabIcons";
import actions from '../../../actions';
import db from '../../../db/localdatabase'
import NetworkManager from '../../../network/NetworkManager';
import rest from '../../../network/rest';
import { dateToYMD } from '../../../network/realtime-utils/utilities';
import {insertIncomingMessage } from '../../../network/realtime-utils/messages'
import messaging from '@react-native-firebase/messaging';
import { realtimeConnect, realtimeDisconnect } from "../../../network/realtime"


class EnterDetails extends React.Component {

  state = {
    networkloading: false,
    buttonpressed: false,
    refphone: '',
    name: '',
    snackbar: {
      visible: false,
      text: ''
    },
    buttonDisabled: false
  }

  componentDidMount() {   

    this.props.openRealtimeConnect();
    
    db.deleteAllData().then(result => {
      

      let teamjc = {
        JEWELCHAT_ID: 1,
      	JID: '910000000000@jewelchat.net',
      	CONTACT_NUMBER: 910000000000,
      	CONTACT_NAME: 'Team JewelChat',
      	IS_PHONEBOOK_CONTACT: 0,
      	PHONEBOOK_CONTACT_NAME: null,
      	IS_REGIS: 1,
        IS_GROUP: 0,
        STATUS_MSG: 'Keep Collecting...'
      };     

      db.insertTeamJC(teamjc).then(val => {
        console.log('Team JC inserted')
      })

        let currdate = new Date().getTime() + global.TimeDelta;
        let createdDateTime = dateToYMD(currdate);

        let idd = (Math.floor( Math.random() * 9999) + 1)*1000000000;

        let msg1 = {
          _ID: idd,
          CHAT_ROOM_JID: '910000000000@jewelchat.net',
          IS_GROUP_MSG: 0,
          MSG_TEXT: 'Welcome to JewelChat',
          CREATOR_JID: '910000000000@jewelchat.net',		
          JEWEL_TYPE: 3,
          CREATED_DATE: createdDateTime.date,
          CREATED_TIME: createdDateTime.time,
          TIME_CREATED: createdDateTime.fulltime,
          SENDER_MSG_ID: '1',
          MSG_TYPE: 0,
          MEDIA_CLOUD: null,
          MEDIA_CLOUD_THUMBNAIL: null,
          SEQUENCE: -1,
          IS_DELIVERED: 1,
          TIME_DELIVERED: createdDateTime.fulltime
        };

        
    

      
        createdDateTime = dateToYMD(currdate+500); 
        idd++;
        let msg2 = {
          _ID: idd,
          CHAT_ROOM_JID: '910000000000@jewelchat.net',
          IS_GROUP_MSG: 0,
          MSG_TEXT: 'Collect Jewels from received chat messages. Click on the green triangle beside this message to collect it.',
          CREATOR_JID: '910000000000@jewelchat.net',		
          JEWEL_TYPE: 6,
          CREATED_DATE: createdDateTime.date,
          CREATED_TIME: createdDateTime.time,
          TIME_CREATED: createdDateTime.fulltime,
          SENDER_MSG_ID: '2',
          MSG_TYPE: 0,
          MEDIA_CLOUD: null,
          MEDIA_CLOUD_THUMBNAIL: null,
          SEQUENCE: -1,
          IS_DELIVERED: 1,
          TIME_DELIVERED: createdDateTime.fulltime
        };
        //this.props.insertmsg(msg2);
    

    
        createdDateTime = dateToYMD(currdate+1000); 
        idd++;       
        let msg3 = {
          CHAT_ROOM_JID: '910000000000@jewelchat.net',
          IS_GROUP_MSG: 0,
          MSG_TEXT: 'Image',
          CREATOR_JID: '910000000000@jewelchat.net',		
          JEWEL_TYPE: 9,
          CREATED_DATE: createdDateTime.date,
          CREATED_TIME: createdDateTime.time,
          TIME_CREATED: createdDateTime.fulltime,
          SENDER_MSG_ID: '3',
          MSG_TYPE: 1,
          MEDIA_CLOUD: 'https://s3.ap-south-1.amazonaws.com/jewelchat.net/IntroImages/jcpic6.jpg',
          MEDIA_CLOUD_THUMBNAIL: null,
          SEQUENCE: -1,
          IS_DELIVERED: 1,
          TIME_DELIVERED: createdDateTime.fulltime
        };
        //this.props.insertmsg(msg3);
    

     
        createdDateTime = dateToYMD(currdate+1500); 
        idd++; 
        let msg4 = {
          CHAT_ROOM_JID: '910000000000@jewelchat.net',
          IS_GROUP_MSG: 0,
          MSG_TEXT: 'Image',
          CREATOR_JID: '910000000000@jewelchat.net',		
          JEWEL_TYPE: 12,
          CREATED_DATE: createdDateTime.date,
          CREATED_TIME: createdDateTime.time,
          TIME_CREATED: createdDateTime.fulltime,
          SENDER_MSG_ID: '4',
          MSG_TYPE: 1,
          MEDIA_CLOUD: 'https://s3.ap-south-1.amazonaws.com/jewelchat.net/IntroImages/jcpic5.jpg',
          MEDIA_CLOUD_THUMBNAIL: null,
          SEQUENCE: -1,
          IS_DELIVERED: 1,
          TIME_DELIVERED: createdDateTime.fulltime
        };        
        //this.props.insertmsg(msg4);
      

      
        createdDateTime = dateToYMD(currdate+2000); 
        idd++; 
        let msg5 = {
          CHAT_ROOM_JID: '910000000000@jewelchat.net',
          IS_GROUP_MSG: 0,
          MSG_TEXT: 'Image',
          CREATOR_JID: '910000000000@jewelchat.net',		
          JEWEL_TYPE: 12,
          CREATED_DATE: createdDateTime.date,
          CREATED_TIME: createdDateTime.time,
          TIME_CREATED: createdDateTime.fulltime,
          SENDER_MSG_ID: '5',
          MSG_TYPE: 1,
          MEDIA_CLOUD: 'https://s3.ap-south-1.amazonaws.com/jewelchat.net/IntroImages/jcpic4.jpg',
          MEDIA_CLOUD_THUMBNAIL: null,
          SEQUENCE: -1,
          IS_DELIVERED: 1,
          TIME_DELIVERED: createdDateTime.fulltime
        };        
        //this.props.insertmsg(msg5);
      

      
        createdDateTime = dateToYMD(currdate+2500); 
        idd++; 
        let msg6 = {
          CHAT_ROOM_JID: '910000000000@jewelchat.net',
          IS_GROUP_MSG: 0,
          MSG_TEXT: 'Image',
          CREATOR_JID: '910000000000@jewelchat.net',		
          JEWEL_TYPE: 6,
          CREATED_DATE: createdDateTime.date,
          CREATED_TIME: createdDateTime.time,
          TIME_CREATED: createdDateTime.fulltime,
          SENDER_MSG_ID: '6',
          MSG_TYPE: 1,
          MEDIA_CLOUD: 'https://s3.ap-south-1.amazonaws.com/jewelchat.net/IntroImages/jcpic3.jpg',
          MEDIA_CLOUD_THUMBNAIL: null,
          SEQUENCE: -1,
          IS_DELIVERED: 1,
          TIME_DELIVERED: createdDateTime.fulltime
        };        
        //this.props.insertmsg(msg6);
      

      
        createdDateTime = dateToYMD(currdate+3000); 
        idd++; 
        let msg7 = {
          CHAT_ROOM_JID: '910000000000@jewelchat.net',
          IS_GROUP_MSG: 0,
          MSG_TEXT: 'Chat karo Cash jeeto.',
          CREATOR_JID: '910000000000@jewelchat.net',		
          JEWEL_TYPE: 15,
          CREATED_DATE: createdDateTime.date,
          CREATED_TIME: createdDateTime.time,
          TIME_CREATED: createdDateTime.fulltime,
          SENDER_MSG_ID: '7',
          MSG_TYPE: 0,
          MEDIA_CLOUD: 'https://s3.ap-south-1.amazonaws.com/jewelchat.net/IntroImages/jcpic3.jpg',
          MEDIA_CLOUD_THUMBNAIL: null,
          SEQUENCE: -1,
          IS_DELIVERED: 1,
          TIME_DELIVERED: createdDateTime.fulltime
        };
        //this.props.insertmsg(msg7);
      
        
        db.insertStropheChatData(msg1)
        .then(id => {
          console.log(id)
          return db.insertStropheChatData(msg2)
        })
        .then(id => {
          console.log(id)
          return db.insertStropheChatData(msg3)
        })
        .then(id => {
          console.log(id)
          return db.insertStropheChatData(msg4)
        })
        .then(id => {
          console.log(id)
          return db.insertStropheChatData(msg5)
        })
        .then(id => {
          console.log(id)
          return db.insertStropheChatData(msg6)
        })
        .then(id => {
          console.log(id)
          return db.insertStropheChatData(msg7)
        })
        .then( id => {
          console.log(id)
        })
        .catch(err =>{})
      

    }).catch(err => {})
    
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    // console.log('Token', this.props.mytoken)

    this.getFCMToken();

    AsyncStorage.getItem('name').then(val => {            
        this.setState({'name': val})
    })
    
  }


  getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token', token)    

      if (token) return token;
      
    } catch (error) {
      console.log(error);
    }
  };

  getFCMToken = async () => {

    try {
      const authorized = await messaging().hasPermission();
      const fcmToken = await this.getToken();

      if (authorized){
        let data = {
          token: fcmToken,
          push_service: Platform.OS === 'ios' ? 'ios' : 'android'
        }      
  
        NetworkManager.callAPI(rest.updatePushNotificationToken, 'POST', data).then((responseJson) => {
               this.props.tokenLoad({tokenrefresh: true, fcmToken })
        })
        .catch((error) => {});

      }


      messaging().requestPermission().then(() => {
        //Alert.alert("User Now Has Permission")
      })
      .catch(error => {
        Alert.alert("Error", error)
        // User has rejected permissions  
      });
      
    } catch (error) {
      console.log(error);
    }

  }; 

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    //this.goBack(); // works best when the goBack is async
    return true;
  }

  onContinue() {

    if (this.state.buttonDisabled)
      return;

    this.setState({ buttonDisabled: true });
    Keyboard.dismiss();

    if(this.state.refphone.length !== 10 || !(/^\d+$/.test(this.state.refphone)) ){
      let s = {visible: true, text: 'Enter valid 10 digit phone number of the referrer.'} 
      this.setState( { snackbar: s } );  
      this.setState(  { buttonDisabled: false } );
      return
    }

    

    if (this.state.name.length == 0){
      let s = {visible: true, text: 'Please enter name.'} 
      this.setState( { snackbar: s } );  
      this.setState(  { buttonDisabled: false } );
      return
    }   
      
    let fullrefphone = '91' + this.state.refphone;
    if (fullrefphone === this.props.mytoken.myphone){
      let s = {visible: true, text: 'Referrer phone number should be different from users phone number.'} 
      this.setState( { snackbar: s } );  
      this.setState(  { buttonDisabled: false } );
      return
    }        
    

    console.log(this.props.mytoken.cookie);
    console.log('Name:' + this.state.name);
    console.log('RefPhone:' + this.state.refphone);
    this.setState({ networkloading: true });
    let data =  {
      name: this.state.name,
      reference: fullrefphone
    }
    NetworkManager.callAPI(rest.initialDetails, 'POST', data).then((responseJson) => {
      this.setState({ networkloading: false })
      console.log(responseJson);      
      this.props.loadGameData();
      AsyncStorage.setItem('name', this.state.name );
      this.props.navigation.navigate('App')      
    })
    .catch((error) => {
      console.log(error)
      this.setState({ networkloading: false })
      let s = { visible: true, text: error.message }
      this.setState({ snackbar: s });
      this.setState({ buttonDisabled: false });
    });  


  }

  render() {
    return (

      

      <View style={{ backgroundColor: colors.darkcolor1, width: '100%', height: '100%', paddingLeft: 40, paddingRight: 40, alignItems: 'center' }} >
        <CustomLoader loading={this.state.networkloading} />
        <TouchableOpacity onPress={() => { this.props.loadGameData(); this.props.navigation.navigate('AppStack')}}>
          <Text style={{ marginTop: 50, fontSize: 16, color: colors.lightcolor1, width: '100%', textAlign: "center" }}>Skip this step</Text>
        </TouchableOpacity>
        <View style={styles.headingview}>
          <Text style={styles.heading}>Who referred you?</Text>
        </View>
        {/* <Form style={{ width: 250, marginBottom: 30, marginRight: 20 }}>
          <Item style={{ borderColor: colors.lightcolor2 }}>
            <Input
              placeholder='name'
              placeholderTextColor={colors.jcgray}
              getRef={(input) => this.otp = input}
              numberOfLines={1}
              maxLength={20}
              onChangeText={(val) => { this.state.name = val }}
              style={{ color: colors.lightcolor1, textAlign: 'center' }} />
          </Item>
        </Form> */}

        <Box
          width={250}
          marginRight={25}
          marginBottom={40}
          > <Box
          flexDirection="row"
          alignItems="center"
        >
            <TabIcon
              name="NineOne"
              fill={colors.lightcolor1}
              height="30"
              width="30"
            />
            <Input
              placeholder='referrer mobile number'
              placeholderTextColor={colors.jcgray}
              keyboardType='phone-pad'
              numberOfLines={1}
              maxLength={10}
              onChangeText={(val) => { this.state.refphone = val }}
              style={{ color: colors.lightcolor1, textAlign: 'center' }} />
         </Box>
         </Box>

        <View style = {{marginTop:20, alignItems: 'center'}}> 
              <Text style={{fontSize:12, color: '#777777', textAlign: "center"}}>Enter a valid 10 digit referrer number and win a DIAMOND.The referrer number should be a registered and active JewelChat user. To report any issues chat with Team JewelChat.</Text>
              {/* <Text style={{fontSize:12, color: '#777777', width: '100%', textAlign: "center"}}>The referrer number should be a registered and active</Text>
              <Text style={{fontSize:12, color: '#777777', width: '100%', textAlign: "center"}}>JewelChat user. To report any issues chat with</Text>
              <Text style={{fontSize:12, color: '#777777', width: '100%', textAlign: "center"}}>Team JewelChat.</Text> */}
        </View>

        <TouchableOpacity style={styles.button} onPress={() => this.onContinue()} >
          <ImageBackground source={require('../../../assets/ColorGrad.jpg')} style={{
            width: '100%', height: '100%', justifyContent: 'center',
            alignItems: 'center', overflow: 'hidden'
          }}>
            <Text style={styles.buttontext}> Save </Text>
          </ImageBackground>
        </TouchableOpacity>  

        <TouchableOpacity onPress={() => { this.props.loadGameData(); this.props.navigation.navigate('AppStack')}}>
          <Text style={{ marginTop: 50, fontSize: 16, color: colors.lightcolor1, width: '100%', textAlign: "center" }}>Skip this step</Text>
        </TouchableOpacity>      

        <Snackbar visible={this.state.snackbar.visible} onDismiss={() => this.setState( { snackbar: { visible: false, text: '' }} )}>
            {this.state.snackbar.text}
        </Snackbar>

      </View>       

    );
  }

}


function mapStateToProps(state) {
  return {
    mytoken: state.mytoken,
    network: state.network    
  }
}



function mapDispatchToProps(dispatch) {
  return {
    tokenLoad: (myTokens) => dispatch({ type: 'USER_TOKEN_LOADED', myTokens }),
    loadGameData: () => dispatch(actions.loadGameState()),
    setChatListData: (chatList) => dispatch(actions.setChatListData(chatList)),
    insertmsg: (msg) => dispatch(insertIncomingMessage(msg)),
    openRealtimeConnect: () => dispatch(realtimeConnect())
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(EnterDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
    backgroundColor: colors.darkcolor1
  },
  headingview: {
    marginTop: 20,
    marginBottom: 35,
    width: '100%',
    alignItems: "center"
  },
  heading: {
    color: 'white',
    fontSize: 24,
    fontWeight: "600"
  },
  textview: {
    flexDirection: 'row',
    marginTop: 40,
    width: '60%',
    height: 20
  },
  button: {
    height: 50,
    width: 250,
    alignItems: "center",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 60,
    backgroundColor: colors.lightcolor1,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#00000000',
    overflow: 'hidden'
  },
  buttontext: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: "600"
  }
});