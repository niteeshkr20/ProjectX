import React from 'react'
import { TouchableOpacity, View, Text, SafeAreaView, BackHandler,  } from 'react-native'
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import colors from '../../../shared_styles/colors';

export default class SuccessFullGiftRedeem extends React.Component {

  constructor(props) {
    super(props)
    this.params = this.props.navigation.state.params
    
  }

  componentDidMount() {
    console.log("Came to lottie", this.params)
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    //this.animation.play(25, 50);

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    
    return true;
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkcolor3 }}>
        <TouchableOpacity style={{ margin: 20, alignItems: 'flex-end' }} onPress={() => this.props.navigation.navigate('MainTabs')}>
          <Icon name='close' color={colors.lightcolor1} size={30} />
        </TouchableOpacity>
        <View style={{ width: '100%', height: '70%', alignItems: 'center' }}>
          { this.params.tasktype === 'gametask' && !this.params.newlevel && <LottieView
            ref={animation => {
              this.animation = animation;
            }}
             source={require('../../../../LottieSamples/thumbsup.json')}           
          />}
          { this.params.tasktype === 'gametask' && this.params.newlevel && <LottieView
            ref={animation => {
              this.animation = animation;
            }}
             source={require('../../../../LottieSamples/trophy.json')}           
          />}
          { this.params.tasktype === 'gifttask' && this.params.cash && <LottieView
            ref={animation => {
              this.animation = animation;
            }}
             source={require('../../../../LottieSamples/cash.json')}           
          />}
          { this.params.tasktype === 'gifttask' && !this.params.cash && <LottieView
            ref={animation => {
              this.animation = animation;
            }}
             source={require('../../../../LottieSamples/gift.json')}           
          />}
        </View>
        <View style={{ alignItems: 'center' }}>          
          { this.params.tasktype === 'gametask' && !this.params.newlevel && <Text style={{ fontSize: 30, color: colors.lightcolor1, textAlign: 'center', fontWeight: '500' }}>Congratulations!!! {'\n'} Task Completed</Text>}
          { this.params.tasktype === 'gametask' && this.params.newlevel && <Text style={{ fontSize: 30, color: colors.lightcolor1, textAlign: 'center', fontWeight: '500' }}>Congratulations!!! {'\n'} New Level</Text>}
          { this.params.tasktype === 'gifttask' && this.params.cash && <Text style={{ fontSize: 30, color: colors.lightcolor1, textAlign: 'center', fontWeight: '500' }}>Congratulations!!!</Text>}
          { this.params.tasktype === 'gifttask' && !this.params.cash && <Text style={{ fontSize: 30, color: colors.lightcolor1, textAlign: 'center', fontWeight: '500' }}>Congratulations!!!</Text>}
        </View>

        <TouchableOpacity style={{ alignItems: 'center', marginBottom:25 }} onPress={() => this.props.navigation.navigate('MainTabs')}>
          <Text style={{ fontSize: 16, color: colors.lightcolor2, textAlign: 'center', fontWeight: '500' }}>Close</Text>
        </TouchableOpacity>

      </SafeAreaView>
    );
  }
}