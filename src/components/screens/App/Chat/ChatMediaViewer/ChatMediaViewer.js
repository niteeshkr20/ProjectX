import React from "react";
import {  
  View,
  Text  
} from "react-native";

import FastImage from 'react-native-fast-image'
import colors from "../../../../shared_styles/colors";

export default class ChatMediaViewer extends React.Component {
  constructor(props) {
    super(props)    
  }

  componentDidMount() { }  
  
  render() {

    console.log(this.props.navigation.getParam('CHAT_ROOM_JID')) 

    return (
      <View style={{ width:'100%', height:'100%', backgroundColor: colors.darkcolor1 }}>
          <FastImage 
                      style={{                
                        flex: 1,
                      }}                         
                      source={{
                          uri: this.props.navigation.getParam('MEDIA_CLOUD')
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
      </View>
    );
  }


}


