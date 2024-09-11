import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import FastImage from 'react-native-fast-image'

import colors from "../../shared_styles/colors";

export default class IntroScreen extends React.Component {  
  

  render() {
    return (
      <View style={styles.container}>
        <View style={{width:'100%', height: 420 }}>
          <ScrollView horizontal={true} style={{ width: '100%'}} >
            <View style={{width:300, height:400,  margin:10, borderColor:'white', borderWidth:2}}>
                <FastImage
                          style={{width: '100%', height: '100%', borderRadius: 5, backgroundColor: 'transparent' }}
                          source={{
                              uri: 'https://s3.ap-south-1.amazonaws.com/jewelchat.net/IntroImages/jcpic1.jpg'
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                      />
            </View>
            <View style={{width:300, height:400,  margin:10, borderColor:'white', borderWidth:2}}>
                  <FastImage
                          style={{width: '100%', height: '100%', borderRadius: 5, backgroundColor: 'transparent' }}
                          source={{
                              uri: 'https://s3.ap-south-1.amazonaws.com/jewelchat.net/IntroImages/jcpic2.jpg'
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                      />
            </View>
            <View style={{width:300, height:400,  margin:10, borderColor:'white', borderWidth:2}}>
                  <FastImage
                          style={{width: '100%', height: '100%', borderRadius: 5, backgroundColor: 'transparent' }}
                          source={{
                              uri: 'https://s3.ap-south-1.amazonaws.com/jewelchat.net/IntroImages/jcpic3.jpg'
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                      />
            </View>
            <View style={{width:300, height:400,  margin:10, borderColor:'white', borderWidth:2}}>
                  <FastImage
                          style={{width: '100%', height: '100%', borderRadius: 5, backgroundColor: 'transparent' }}
                          source={{
                              uri: 'https://s3.ap-south-1.amazonaws.com/jewelchat.net/IntroImages/jcpic4.jpg'
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                      />          
            </View>            
            <View style={{width:300, height:400,  margin:10, borderColor:'white', borderWidth:2}}>
                  <FastImage
                          style={{width: '100%', height: '100%', borderRadius: 5, backgroundColor: 'transparent' }}
                          source={{
                              uri: 'https://s3.ap-south-1.amazonaws.com/jewelchat.net/IntroImages/jcpic6.jpg'
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                      />          
            </View>
          </ScrollView>  
        </View>
        <TouchableOpacity style={styles.button} onPress = {() => this.props.navigation.navigate('RegisterPhone', {name: 'Jane'})} >
            <ImageBackground source={require('../../../assets/ColorGrad.jpg')} style={{width: '100%', height: '100%', justifyContent: 'center',
                            alignItems: 'center', overflow:'hidden'}}>
                <Text style= {styles.buttontext}> Start Chatting </Text>
            </ImageBackground> 
        </TouchableOpacity>     
        


      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
    backgroundColor: colors.darkcolor1
  },
  button: {
    height: 50,
    width: 250,
    alignItems: "center",    
    marginRight:40,
    marginLeft:40,
    marginTop:75,
    /*
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    */
    backgroundColor: colors.lightcolor1,
    borderRadius:10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#00000000',
    overflow:'hidden'    
  },
  buttontext: {
    color: 'white',
    textAlign:'center',
    fontSize: 18,
    fontWeight: "600"
  }
});
