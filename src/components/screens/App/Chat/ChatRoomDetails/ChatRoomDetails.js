import React from "react";
import {  
  View,
  Text,
  Image  
} from "react-native";


import colors from "../../../../shared_styles/colors";

import Logo from '../../../../svg_components/Logo';

import Icon from 'react-native-vector-icons/FontAwesome';

import rest from "../../../../../network/rest";




export default class ChatRoomDetails extends React.Component {
  constructor(props) {
    super(props)    
  }

  state = {
    profileimageerror: false
  }

  componentDidMount() { }  
  
  render() {

    console.log(this.props.navigation.getParam('JEWELCHAT_ID')) 

    return (
      <View style={{ width:'100%', height:'100%', backgroundColor: colors.darkcolor1 , justifyContent: 'center', alignItems: 'center'}}>
          {
          this.props.navigation.getParam('JEWELCHAT_ID') == 1 && <Logo height="75%" width="75%" style={{margin: 10, width: '100%', height: '100%', alignItems: 'center', overflow: 'hidden'}} />
          }
          {
          this.state.profileimageerror && this.props.navigation.getParam('JEWELCHAT_ID') != 1 && (this.props.navigation.getParam('IS_GROUP_MSG') == 0 || this.props.navigation.getParam('IS_GROUP_MSG') == null ) && <Icon  name='user' color={colors.jcgray} size={300} solid />
          }
          {
          this.state.profileimageerror && this.props.navigation.getParam('JEWELCHAT_ID') != 1 && this.props.navigation.getParam('IS_GROUP_MSG') == 1 && <Icon  name='users' color={colors.jcgray} size={300} solid />
          }

          { this.props.navigation.getParam('JEWELCHAT_ID') != 1 && this.props.navigation.getParam('CHAT_ROOM_JID') &&
            <View style={{ width:'100%', height:'100%' }}>
              <Image
                  source={{ headers: { Pragma: 'no-cache' }, uri: rest.imageBaseURL + this.props.navigation.getParam('CHAT_ROOM_JID').split('@')[0] + '?' + global.randstr}}
                  style={{flex:1}}
                  resizeMode="contain"
                  onLoad={()=>{
                      //this.setState( { profileimageerror: false } ) 
                  }}
                  onError={(error) => { 
                      //console.log('Image')
                      this.setState( { profileimageerror: true } ) 
                    }}
              >
              </Image>
            </View>      
          }   
      </View>
    );
  }


}


