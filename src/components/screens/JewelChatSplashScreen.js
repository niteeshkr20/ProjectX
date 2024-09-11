import React from 'react'
import {
  ActivityIndicator,
  //AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../shared_styles/colors';
import Logo from '../svg_components/Logo';
import * as realtime from '../../network/realtime'
import * as jcdb from '../../db/localdatabase'
import * as game from '../../db/localdatabase'
import axios from 'axios';
import Constants from '../../network/rest';
import { realtimeConnect} from "../../network/realtime" 

class JewelChatSplashScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  componentDidUpdate(prevProps, prevState) {

    if (!this.props.mytoken.isLoading && this.props.mytoken.token == null) {
      this.splashScreenDelay().then(() => this.props.navigation.navigate('AuthStack'))
    } else if (!this.props.mytoken.isLoading && this.props.mytoken.token !== null) {
      this.splashScreenDelay().then(() => this.props.navigation.navigate('App'))

        axios.post(Constants.baseURL + Constants.getAccessToken,
          { "refreshToken": this.props.mytoken.token }
        ).then(response => { 
            console.log('JEWELCHAT access token load successful')   
            let temptokens = {};
            temptokens.cookie = response.data.accessToken;                
            this.props.tokenLoad(temptokens);    
        }).catch(error => {              
            console.log('JEWELCHAT access token load FAILED')     
        }); 

    }

  }



  splashScreenDelay = () => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        100
      )
    )
  }


  _bootstrapAsync = () => {

      AsyncStorage.multiGet(['myid', 'myphone', 'token', 'cookie'])      
      .then(results => {
        
        myTokens = results.reduce((acc, curr) => {
          console.log('>>', curr[1])
          if (curr[0] === 'myid') acc.myid = curr[1]
          else if (curr[0] === 'myphone') acc.myphone = curr[1]
          else if (curr[0] === 'token') acc.token = curr[1]
          else if (curr[0] === 'cookie') acc.cookie = curr[1]

          return acc

        }, {});        

        myTokens.isLoading = false;
        this.props.tokenLoad(myTokens);        

      })


  };

  // Render any loading content that you like here
  render() {
    console.log('RENDER')
    console.log(this.props.mytoken);
    return (
      <View style={styles.container}>
        <Logo height="300" width="300" />
        
        <ActivityIndicator />
        <Text style={{color: colors.jcgray, fontSize:12, marginTop:50 }}>v1.1.2</Text>
        <StatusBar barStyle="default" />
      </View>
    );
  }

}

function mapStateToProps(state) {
  return {
    mytoken: state.mytoken
  }
}



function mapDispatchToProps(dispatch) {
  return {
    tokenLoad: (myTokens) => dispatch({ type: 'USER_TOKEN_LOADED', myTokens }),
    initDatabase: () => dispatch(jcdb.initLocalDatabase()),
    //openRealtimeConnection: () => dispatch(realtimeConnect())   
    //gameDataLoad: () => dispatch(game.gameDataLoad())
    //chatListDataLoad: () => dispatch(jcdb.chatListDataLoad()),
    //taskDataLoad: () => dispatch(jcdb.taskDataLoad()),
    //achievmentLoad: () => dispatch(jcdb.achievmentLoad()),
    //xmppConnect: () => dispatch(realtime.xmppConnect),
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(JewelChatSplashScreen);






const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkcolor1
  },
});
