import React from "react";
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  ActivityIndicator,
} from "react-native";

import styles from './Profile.styles'
import color from '../../../shared_styles/colors'
import JCImages from '../../../../assets/JCImages'
import { connect } from 'react-redux';
import Diamond from '../../../svg_components/Diamond'
import rest from "../../../../network/rest";
import NetworkManager from "../../../../network/NetworkManager";
import { renderJewel } from "../../../JCUtils/CommonUtils";
import actions from "../../../../actions";
import colors from "../../../shared_styles/colors";
import ProfileOptionsList from './ProfileOptionsList'
import ProfilePhotoSection from './ProfilePhotoSection'
import CustomLoader from "../../../shared_components/CustomLoader";
const levelArray = [5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      referrals: [],
      invitees: 0,
      levelJson: {},      
      children: [],
      isLoading: false,
      processedlist: [],
      networkloading: false
    }
  }
  componentDidMount() {
    //this.getAchievements()
    console.log('PROFILE STATE')
    console.log(this.props)
    //console.log(this.processAllAchievementData());

    if (this.props.userachievements.length == 0 || this.props.achievements.length == 0)
      this.getAchievements()

    this.setState({ processedlist: this.processAllAchievementData() }); 

  }


  componentDidUpdate(prevProps, prevState) {
    //console.log('PROFILE STATE')
    //console.log(this.props)

    if(this.props.userachievements != prevProps.userachievements ||
      this.props.achievements  != prevProps.achievements ||
      this.props.referralAchievement  != prevProps.referralAchievement ||
      this.props.game  != prevProps.game ){

        this.setState({ processedlist: this.processAllAchievementData() });

    }

    
  }


  getAchievements = () => {    

    this.setState({ isLoading: true })

    NetworkManager.callAPI(rest.getUsersAchievement, 'POST', null)    
    .then(resultb => {   
      console.log('LOAD USER ACHIEVEMENT', resultb.userachievements)     
      this.props.setUserAchievement(resultb.userachievements)

      return NetworkManager.callAPI(rest.getAchievements, 'POST', null)    
      
    })
    .then(resulta => {     

      console.log('LOAD ACHIEVEMENT', resulta.achievements)      
      this.props.setAchievements(resulta.achievements)

      this.setState({ isLoading: false   })
      

    })      
    .catch( error => { 
      this.setState({ isLoading: false   })
    })



    

  }

  processAllAchievementData(){

    let p = [];

    if(this.props.userachievements.length == 0 || this.props.achievements.length == 0)
      return p;

    for(let i=0; i< this.props.achievements.length; i++){

      let t = {}; let c = 0;
      if( this.props.achievements[i].achievement_id !== this.props.userachievements[i].achievement_id )
        break;

      t.achievement_id = this.props.achievements[i].achievement_id
      t.id = this.props.userachievements[i].id
      t.diamond = this.props.achievements[i].diamond
      t.buttonstate = this.props.game.scores.level>=this.props.userachievements[i].level ? 1 : 0
      t.buttontext = this.props.game.scores.level>=this.props.userachievements[i].level ? 'WIN' : 'Level '+this.props.userachievements[i].level
      if(t.achievement_id < 3 || t.achievement_id > 17){

        t.max = this.props.userachievements[i].level
        t.curr_val = this.props.referralAchievement[t.achievement_id] ? this.props.referralAchievement[t.achievement_id].total_count : 0
        c = t.max - t.curr_val
        t.jeweltype = -1
        if(t.achievement_id == 1){          
          t.text = c > 0  ? 'Invite '+ c + ' users' : 'Press button to Win'   
          t.percent = c > 0 ? (t.curr_val/t.max) * 100 : 100       
        }else if(t.achievement_id == 2){          
          t.text = c > 0  ? 'Refer '+ c + ' users successfully' : 'Press button to Win'   
          t.percent = c > 0 ? (t.curr_val/t.max) * 100 : 100      
        }else{          
          t.text = c > 0  
                  ? ( c == 1 ? c + ' more referred user to reach level '+ (5*(t.achievement_id-17)) 
                  : c + ' more referred users to reach level '+ (5*(t.achievement_id-17)) )
                  : 'Press button to Win' 
          t.percent = c > 0 ? (t.curr_val/t.max) * 100 : 100     
        }

      }
      else{
        t.max = this.props.userachievements[i].level * 10
        t.curr_val = this.props.game.jewels[t.achievement_id].total_count
        let c = t.max - t.curr_val
        t.text = c > 0  ? 'Collect '+ c : 'Press button to Win'
        t.jeweltype = t.achievement_id
        t.percent = c > 0 ? (t.curr_val/t.max) * 100 : 100
      }

      p.push(t);

    }

    return p;  

  }

  

  // processReferrals(result) {
  //   let levelJson = {}
  //   if (result.children.length > 0) {
  //     levelArray.map(item => {
  //       levelJson[item] = result.children.filter((user) => {
  //         return user.level >= item
  //       })
  //     })
  //   }
  //   this.setState({
  //     referrals: result.children,
  //     invitees: result.invitees,
  //     levelJson: levelJson
  //   })
  // }

  // getPercentage(item, index) {
  //   let percent = null
  //   if (item.text.includes('img')) {
  //     let jewel = parseInt(item.text.replace(/\D/g, ''))
  //     percent = (this.props.game.jewels[jewel].total_count) / (this.props.userachievements[index].level * 10)
  //   }
  //   else if (item.text.includes('successfully')) {
  //     percent = (this.props.game.jewels[2].total_count) / (this.props.userachievements[index].level * 5)
  //   }
  //   else if (item.text.includes('reached level')) {
  //     if (this.state.referrals.length > 0 && Object.keys(this.state.levelJson).length > 0) {
  //       percent = (this.state.levelJson[levelArray[index - 17]].length) / (this.props.userachievements[index].level * 5)
  //     }
  //   }
  //   else if (item.text.includes('Invite')) {
  //     if (this.state.referrals.length > 0) {
  //       percent = this.state.invitees / (this.props.userachievements[index].level * 5)
  //     }
  //   }

  //   if (percent > 1) {
  //     return 100
  //   }
  //   else {
  //     return percent * 100
  //   }

  // }

  redeemAchievements = (item) => {
    
      this.setState({
        isLoading: true
      })

      let data = {
        id: item.id
      }

      NetworkManager.callAPI(rest.redeemAchievement, 'POST', data).then(result => {
        this.getAchievements()
        this.props.loadGameState()
        this.setState({
          isLoading: false
        })
        //this.props.navigation.navigate('SuccessFullGiftRedeem', {tasktype: 'gifttask', cash })
      }).catch(error => {})
  
  }


  _renderSectionHeader = () => {
    return (
      <View>
        <ProfilePhotoSection navigation={this.props.navigation} />
        <ProfileOptionsList children={this.state.referrals} navigation={this.props.navigation} />
        <View style={styles.diamondContainer} >
          <Text style={styles.buyText}>WIN GAME DIAMONDS</Text>
          {this.state.isLoading && <ActivityIndicator size="small" color="white" animating={true} style={{ width:14, height:14, marginLeft:10 }} />}
        </View>
      </View>
    )
  }


  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>   
          <CustomLoader loading={this.state.isLoading} />  
          <FlatList
            ListHeaderComponent={this._renderSectionHeader}
            data={this.state.processedlist}
            renderItem={({ item, index }) =>
              <View>
                <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ width: '75%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ padding: 5, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text style={{ color: 'white', paddingRight: 10, fontSize:12 }}>{item.text}</Text>
                          {item.jeweltype != -1 && item.percent != 100 && renderJewel(item.jeweltype, 25, 25, styles.jewelStyle, item.jeweltype)}
                        </View>
                    </View>
                    <View style={{ width: '100%', height: 5, zIndex: 1, backgroundColor: color.darkcolor3, borderColor: color.darkcolor3, borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, overflow: 'hidden' }}>
                      <View style={{ width: "" + item.percent + "%", height: '100%' }}>
                        <ImageBackground source={JCImages.colorGrad} style={{
                          width: '100%', height: '100%', justifyContent: 'center',
                          alignItems: 'center', overflow: 'hidden'
                        }}></ImageBackground>
                      </View>
                    </View>
                    
                  </View>
                  <View>
                    {item.buttonstate == 1 ?
                      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 5 }}>
                        <Text style={{ color: 'white', paddingRight: 5, fontSize: 16 }}>{item.diamond}</Text>
                        <Diamond height='20' width='20' />
                      </View>
                      : null
                    }
                    {
                      item.buttonstate == 1 ?
                        <TouchableOpacity onPress={() => this.redeemAchievements(item, index)} 
                          disabled={item.percent == 100 ? false : true} 
                          style={{ backgroundColor: item.percent == 100 ? color.lightcolor2 : colors.darkcolor1, borderColor: colors.lightcolor1, borderWidth: 1, height: 22, width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                          <Text style={{ color: 'white', fontSize: 12 }}>{item.buttontext}</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity disabled={true}  style={{ backgroundColor: color.darkcolor1, height: 44, width: 70, alignItems: 'center', borderColor: color.lightcolor1, justifyContent: 'center', borderWidth: 1.5, borderRadius: 5 }}>
                          <Text style={{ color: color.jcgray, fontSize: 12 }}>{item.buttontext}</Text>
                        </TouchableOpacity>
                    }
                  </View>
                </View>
                <View style={{ backgroundColor: color.darkcolor3, height: 0.4, width: '100%' }}></View>
              </View>
            }
            keyExtractor={item => item.id+''}
          /> 
        <StatusBar barStyle="light-content" hidden={false} translucent={true} />
      </SafeAreaView >
    );
  }
}

function mapStateToProps(state) {
  return {
    userachievements: state.userachievements.userachivements,
    achievements: state.achievements.achievements,
    referralAchievement: state.referralAchievement,
    game: state.game,
    mytoken: state.mytoken
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAchievements: (payload) => dispatch(actions.setAchievements(payload)),
    setUserAchievement: (payload) => dispatch(actions.setUserAchievement(payload)),
    loadGameState: () => dispatch(actions.loadGameState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
