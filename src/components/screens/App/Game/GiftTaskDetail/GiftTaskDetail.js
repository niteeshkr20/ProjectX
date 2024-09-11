import React from 'react'
import {
  Image,  
  StyleSheet,
  View,
  Text,  
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native';
import styles from './GiftTaskDetail.styles'
import Coin from '../../../../svg_components/Coin';
import Logo from '../../../../svg_components/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context'
import color from '../../../../shared_styles/colors'
import XP from '../../../../svg_components/XP';
import JCImages from '../../../../../assets/JCImages'
import { renderJewel, jewelInfo } from '../../../../JCUtils/CommonUtils';
import Icon from 'react-native-vector-icons/FontAwesome'
import NetworkManager from '../../../../../network/NetworkManager';
import rest from '../../../../../network/rest';
import actions from '../../../../../actions';
import CustomLoader from '../../../../shared_components/CustomLoader';


class GiftTaskDetail extends React.Component {

  constructor(props) {
    super(props)
    this.giftTask = this.props.navigation.state.params.giftTask
    console.log('GiftTask',this.giftTask)
    this.state = {
      isLaoding: false
    }
  }

  jewelView(jewel) {
    let jewelView = []
    // show 3 dots with exact count
    if (jewel.count <= 5) {
      for (let i = 0; i < jewel.count; i++) {
        jewelView.push(
          renderJewel(jewel.jeweltype_id, 30, 30, styles.jewelStyle, jewel.jeweltype_id+'_'+i )
        )
      }
    }
    else {
      for (let i = 0; i < 3; i++) {
        jewelView.push(
          renderJewel(jewel.jeweltype_id, 30, 30, styles.jewelStyle, jewel.jeweltype_id+'_'+i)
        )
      }
      jewelView.push(
        <View>
          <Text style={{ fontSize: 20, color: color.lightcolor1, fontWeight: 'bold' }}>...({jewel.count})</Text>
        </View>
      )
    }
    return jewelView
  }

  getCurrentCycle(dt) {
    var tdt = new Date(dt.valueOf());
    var dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
  }

  componentDidMount() {
    
    let data = {
      'gifttask_id': this.giftTask.id
    }

    if (!this.props.gifttaskdetails.hasOwnProperty(this.giftTask.id)) {
      NetworkManager.callAPI(rest.getGiftTasksElements, 'POST', data).then(result => {
        console.log(result)
        let data = Object.create(this.props.gifttaskdetails)
        data[this.giftTask.id] = result.gifttaskdetails
        this.props.setGiftTaskDetails(data)
      }).catch(error => {})
    }

    if (!this.props.usergifttasks.hasOwnProperty(this.giftTask.id)) {
      NetworkManager.callAPI(rest.getGiftTaskLevel, 'POST', data).then(result => {
        let data = Object.create(this.props.usergifttasks)
        data[this.giftTask.id] = result.gifttaskusers[0]
        this.props.setUserGiftTask(data)
      }).catch(error => {})
    }
    
  }

  CheckNonAvailablity(RequiredJewel) {
    if(this.props.game.jewels[RequiredJewel.jeweltype_id].count < RequiredJewel.count)
        return true;
    else 
        return false;
  }

  CheckAvailablityForAllJewels() {

      const nonavailablejewel = this.props.gifttaskdetails[this.giftTask.id].find((jewel) => {
          return this.CheckNonAvailablity(jewel)
      })           
      
      return ( !nonavailablejewel ? true : false );
  }

  checkDelay = () => {
      return new Promise((resolve) =>
        setTimeout(
          () => { resolve('result') },
          3000
        )
      )
  }

  checkEligibility() {
    let count = 0
    this.props.gifttaskdetails[this.giftTask.id].map(item => {
      if (!this.CheckNonAvailablity(item)) {
        count++
      }
    })
    console.log(count, this.props.gifttaskdetails[this.giftTask.id])
    if (this.props.gifttaskdetails[this.giftTask.id].length === count) {
      return true
    }
    else {
      return false
    }
  }

  winGift() {
    let data = {
      id: this.props.usergifttasks[this.giftTask.id].id,
      gifttask_id: this.props.usergifttasks[this.giftTask.id].gifttask_id
    }

    this.setState({ isLaoding: true  })
    AsyncStorage.setItem('ActiveGiftTask', JSON.stringify(data))
    .then(()=>{
        return NetworkManager.callAPI(rest.redeemGiftTask, 'POST', data)
    })
    .then( result => {
        return this.checkDelay()
    })
    .then(() => {
        return NetworkManager.callAPI(rest.checkGiftTaskCompletion, 'POST', data)
    })
    .then( (completedtask) => {            
        // check gift task completion
        if(completedtask.gifttaskusers && completedtask.gifttaskusers.done==1){
          this.props.usergifttasks[this.giftTask.id].done = 1
          this.props.setUserGiftTask(this.props.usergifttasks)
          this.setState({  isLaoding: false  });
          this.props.loadGameState()
          AsyncStorage.removeItem('ActiveGiftTask').then(()=>{}).catch(err=>{})  
          let cash = false; 
          if(this.giftTask.cash == 1)
            cash = true;
          this.props.navigation.navigate('SuccessFullGiftRedeem', {tasktype: 'gifttask', cash })
        }else{
          return new Promise( (resolve, reject) => { reject('TASK NOT COMPLETED') })  
        }

    })    
    .catch(err =>{
        this.setState({  isLaoding: false  });
        AsyncStorage.removeItem('ActiveGiftTask').then(()=>{}).catch(err=>{})

        if(err.response){
            if(err.response.data.message === 'Invalid Task' || err.response.data.message === 'Task Not Completed'){
                // remove this task and Go Back in navigation
                // reload game state and task list

                this.props.loadGameState();

                let t = Object.create(this.props.gifttaskdetails);
                delete t[this.giftTask.id];      
                this.props.setGiftTaskDetails(t);

                t = Object.create(this.props.usergifttasks);
                delete t[this.giftTask.id];
                this.props.setUserGiftTask(t);

                this.props.navigation.goBack();                  
                console.log('TASK ERROR',err.response.data)     
                console.log('TASK ERROR',err.response.data.message)

            }                       
        }else if(err === 'TASK NOT COMPLETED'){
            console.log('TASK NOT COMPLETED');
        }

    })    

  }


  displayButton(){

    if(!(this.props.gifttaskdetails.hasOwnProperty(this.giftTask.id) && this.props.usergifttasks.hasOwnProperty(this.giftTask.id)))
      return null;

    if(this.props.game.scores.level < this.props.usergifttasks[this.giftTask.id].level)
      return (<View style={{ alignItems: 'center', paddingTop: 10 }}>
                <View style={{ justifyContent: 'center', width: 150, alignItems: 'center', backgroundColor: color.darkcolor2, borderRadius: 5, borderWidth: 1, borderColor: color.jcgray, paddingHorizontal: 25, paddingVertical: 10 }}>
                  <Text style={{ color: color.jcgray }}>LEVEL {this.props.usergifttasks[this.giftTask.id].level}</Text>
                </View>
              </View>);

    if(!this.CheckAvailablityForAllJewels())       
      return (<View style={{ alignItems: 'center', paddingTop: 10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: color.darkcolor2, borderRadius: 5, borderWidth: 1, borderColor: color.jcgray, paddingHorizontal: 25, paddingVertical: 10 }}>
                  <Text style={{ color: color.jcgray }}>Collect All Jewels</Text>
                </View>
              </View>);   

    if(this.props.usergifttasks[this.giftTask.id].done >= 1 || this.giftTask.current_qty <=0)   
      return null;

    
    if(this.giftTask.cash == 1 && this.props.usergifttasks[this.giftTask.id].done == 0 )   
      return (<TouchableOpacity style={{ alignSelf: 'center', paddingTop: 10  }} onPress = { ()=> this.winGift()}>
                  <ImageBackground source={require('../../../../../assets/ColorGrad.jpg')} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: color.darkcolor2, borderRadius: 5, borderWidth: 1, borderColor: color.lightcolor2, paddingHorizontal: 25, paddingVertical: 10, overflow:'hidden' }}>
                      <Text style= {{color: 'white', textAlign:'center', fontSize: 18,  fontWeight: "600"}}> WIN CASH </Text>
                  </ImageBackground> 
              </TouchableOpacity>); 

    if(this.giftTask.cash == 0 && this.props.usergifttasks[this.giftTask.id].done == 0 )   
      return (<TouchableOpacity style={{ alignSelf: 'center', paddingTop: 10  }} onPress = { ()=> this.winGift()}>
                  <ImageBackground source={require('../../../../../assets/ColorGrad.jpg')} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: color.darkcolor2, borderRadius: 5, borderWidth: 1, borderColor: color.lightcolor2, paddingHorizontal: 25, paddingVertical: 10, overflow:'hidden' }}>                    
                      { this.giftTask.money==0 && <Text style= {{color: 'white', textAlign:'center', fontSize: 18,  fontWeight: "600"}}>WIN GIFT</Text>} 
                      { this.giftTask.money>0 && <Text style= {{color: 'white', textAlign:'center', fontSize: 18,  fontWeight: "600"}}>Pay {'\u20B9'}{this.giftTask.money} only</Text>}
                  </ImageBackground> 
              </TouchableOpacity>);            
    

  }


  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView >
          <CustomLoader loading={this.state.isLaoding} />
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            {this.giftTask.cash === 0 ?
              <Image
                style={{ width: 160, height: 200, borderRadius: 7 }}
                source={{ uri: this.giftTask.product_pic }}
              /> :
              <View style={{ backgroundColor: color.jcgray, width: 160, height: 200, borderRadius: 7, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: color.darkcolor1, fontSize: 60, fontWeight: 'bold' }}>{'\u20B9'}</Text>
                  <Text style={{ color: color.darkcolor1, fontSize: 30, fontWeight: 'bold' }}> {this.giftTask.money}</Text>
              </View>
            }
          </View>

          <View style={{ backgroundColor: color.darkcolor3, height: 0.5, width: '100%' }}></View>
          {this.props.usergifttasks.hasOwnProperty(this.giftTask.id) ?
            <View style={{ padding: 10 }}>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', paddingBottom: 8 }}>{this.giftTask.productname}</Text>
              <Text style={{ color: color.jcgray, fontSize: 11, paddingBottom: 8 }}>{this.giftTask.productdetail}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: color.jcgray, fontSize: 12, fontWeight:'600' }}>{this.giftTask.current_qty}/{this.giftTask.total_qty}</Text>
                <Text style={{ color: color.jcgray, fontSize: 12, fontWeight:'600' }}>EXPIRATION DATE: {(this.props.usergifttasks[this.giftTask.id].expiration_at).split('T')[0]}</Text>
              </View>
            </View> : null}

          <View style={{ backgroundColor: color.darkcolor3, height: 0.5, width: '100%' }}></View>
          <View>
            <Text style={styles.CollectText}>COLLECT JEWELS</Text>
          </View>
          {this.props.gifttaskdetails.hasOwnProperty(this.giftTask.id) ?
            <View style={{ paddingBottom: 20, flexDirection: 'column' }}>
              {
                this.props.gifttaskdetails[this.giftTask.id].map((jewel) =>

                  <View style={{ flexDirection: 'row', padding: 5 }}  key={jewel.id+this.giftTask.id} >

                    <View style={{ flexDirection: 'row', width: '85%', paddingLeft: '20%', justifyContent: 'center', alignItems: 'center' }}>
                      {this.jewelView(jewel)}
                    </View>
                    <View style={{ width: '15%' }}>
                      {
                        this.CheckNonAvailablity(jewel) 
                        ? <TouchableOpacity onPress={()=>jewelInfo(jewel)} style={{flexDirection:'row'}}><Icon name='close' color='red' size={20} /><Icon style={{marginLeft:3}} name='info-circle' color='white' size={20} /></TouchableOpacity>
                        : <Icon name='check' color='green' size={20} />
                      }
                    </View>
                  </View>
                )
              }

            </View> : null}
          <View style={{ backgroundColor: color.darkcolor3, height: 0.5, width: '100%' }}></View>

          {this.displayButton()} 
          
          </ScrollView>
      </SafeAreaView>
    );
  }

}

function mapStateToProps(state) {
  return {
    tasks: state.tasks.tasks,
    taskdetails: state.taskdetails.taskdetails,
    gifttasks: state.gifttasks.gifttasks,
    gifttaskdetails: state.gifttaskdetails.taskdetails,
    usergifttasks: state.usergifttasks.usergifttasks,
    game: state.game
  };
}


function mapDispatchToProps(dispatch) {
  return {
    setGiftTaskDetails: (payload) => dispatch(actions.setGiftTaskDetails(payload)),
    setUserGiftTask: (payload) => dispatch(actions.setUserGiftTask(payload)),
    loadGameState: () => dispatch(actions.loadGameState())

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GiftTaskDetail);