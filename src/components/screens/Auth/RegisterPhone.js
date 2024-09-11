import React from 'react';
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  KeyboardAvoidingView,
  Keyboard,
  Linking
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';
import { Container, Content, Form, Item, Input, Label, Icon, Box, Center } from 'native-base';
import colors from "../../shared_styles/colors";

import TabIcon from "../../svg_components/TabIcons";
import CustomLoader from '../../shared_components/CustomLoader';
import axios from 'axios'


export default class RegisterPhone extends React.Component {

  state = {
    networkloading: false,
    phone: '',
    snackbar: {
      visible: false,
      text: ''
    },
    buttonDisabled: false
  }



  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    //this.goBack(); // works best when the goBack is async
    return true;
  }

  onContinue() {
    console.log('Continue', this.state.phone);

    if (this.state.buttonDisabled)
      return;

    this.setState({ buttonDisabled: true });
    Keyboard.dismiss();
    console.log('Here', this.state.phone.length)
    if (this.state.phone.length !== 10 || !(/^\d+$/.test(this.state.phone))) {
      let s = { visible: true, text: 'Enter valid 10 digit phone number.' }
      this.setState({ snackbar: s });
      this.setState({ buttonDisabled: false });
    } else {
      // Loader modal
      //network call
      this.setState({ networkloading: true })

      axios({
        method: 'post',
        url: 'http://test2-env.eba-kfp6if7d.ap-south-1.elasticbeanstalk.com/registerPhoneNumber',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          phone: '91' + this.state.phone
        },
      })
        .then((responseJson) => {
          console.log(responseJson)
          this.setState({ networkloading: false })
          if (!responseJson.data.error) {
            AsyncStorage.setItem('name', responseJson.data.name);
            responseJson.data.phone = '91' + this.state.phone;
            this.props.navigation.navigate('EnterOTP', responseJson.data);
          } else
            throw (new Error(responseJson.data.message))
        })
        .catch((error) => {
          console.log(error)
          this.setState({ networkloading: false })
          let s = { visible: true, text: error.message }
          this.setState({ snackbar: s });
          this.setState({ buttonDisabled: false });
        });


    }

    //this.setState({ buttonDisabled: false });
    //this.props.navigation.navigate('EnterOTP', {phone: this.state.phone})

    ///*onPress = {() => this.props.navigation.navigate('EnterOTP')} >*/
  }

  render() {
    return (

      <View style={{ backgroundColor: colors.darkcolor1, width: '100%', height: '100%', paddingLeft: 40, paddingRight: 40, alignItems: 'center' }}>
        <CustomLoader loading={this.state.networkloading} />
        <View style={styles.headingview}>
          <Text style={styles.heading}>Enter phone number</Text>
        </View>
        <Box
          width={250}
          marginRight={25}
          borderColor={colors.darkcolor1}
          borderWidth={1}
          padding={2}
          alignItems="center"
        >
          <Box
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
              placeholder='10 digit mobile number'
              placeholderTextColor={colors.jcgray}
              keyboardType='phone-pad'
              numberOfLines={1}
              maxLength={10}
              onChangeText={(val) => { this.state.phone = val }}
              style={{ color: colors.lightcolor1, textAlign: 'center' }} />
          </Box>
        </Box>



        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 12, color: '#777777', width: '100%', textAlign: "center" }}>By clicking continue you agree to JewelChat</Text>
        </View>
        <View>
          <Text style={{ fontSize: 12, color: colors.lightcolor1, width: '100%', textAlign: "center" }} onPress={() => Linking.openURL('http://jewelchat.net/termsandconditions.pdf')} >
            Terms &amp; Conditions
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => this.onContinue()} >

          <ImageBackground source={require('../../../assets/ColorGrad.jpg')} style={{
            width: '100%', height: '100%', justifyContent: 'center',
            alignItems: 'center', overflow: 'hidden'
          }}>
            <Text style={styles.buttontext}> Continue </Text>
          </ImageBackground>
        </TouchableOpacity>

        <Snackbar
          visible={this.state.snackbar.visible}
          onDismiss={() => this.setState({ snackbar: { visible: false, text: '' } })}
        >
          {this.state.snackbar.text}
        </Snackbar>

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
  headingview: {
    marginTop: 100,
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