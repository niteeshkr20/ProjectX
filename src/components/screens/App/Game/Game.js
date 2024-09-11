import React from 'react'
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  FlatList,
  PixelRatio,
  ActivityIndicator
} from 'react-native';
import styles from './Game.styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context'
import color from '../../../shared_styles/colors'
import NetworkManager from '../../../../network/NetworkManager';
import rest from '../../../../network/rest';
import actions from '../../../../actions';
import GiftTaskView from './GiftTaskView'
import TaskView from './TaskView';
import colors from '../../../shared_styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Game extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      reachedEnd: false,
      page: 0,
      isLoading: false,
      giftTaskLoading: false
    }
    this.lastpagelength = 10;
  }

  componentDidMount() {

      this.setState({ isLoading: true });
      this.setState({  giftTaskLoading: true  })

      this.getTasks()    
      this.updateCurrentCycle()

      AsyncStorage.getItem('ActiveGameTask').then( val=>{
        
        if(val){
          this.props.loadGameState()
          AsyncStorage.removeItem('ActiveGameTask').then(()=>{}).catch(err=>{})
        }
        
      }).catch(err=>{})


      AsyncStorage.getItem('ActiveGiftTask').then( val=>{
        
        if(val){
          this.props.loadGameState()
          AsyncStorage.removeItem('ActiveGiftTask').then(()=>{}).catch(err=>{})
        }
        
      }).catch(err=>{})
      
  }


  

  getTasks() {

          this.setState({ isLoading: true });  

          console.log('GET TASKS');

          NetworkManager.callAPI(rest.getTasks, 'POST', null).then(result => {
            
            console.log('Tasks')
            console.log(result.tasks)
            this.setState({
              isLoading: false
            })
            this.props.setTaskData(result.tasks)

            if(result.tasks.length<8){

                NetworkManager.callAPI(rest.getNewTaskOnTaskCompletion, 'GET', null)
                .then(val => {
                  return NetworkManager.callAPI(rest.getTasks, 'POST', null)
                })
                .then(result1 => {
                  this.props.setTaskData(result1.tasks)
                })
                .catch(error =>{})

            }
            

          }).catch(error => {
            this.setState({
              isLoading: false
            })
          })

    
  }


  updateCurrentCycle(){

    let currentcycle = '';

    AsyncStorage.getItem('CurrentCycle')
    .then(val => {
      if(val) 
        currentcycle = val;

      console.log('OLD CYCLE', currentcycle)  

      return NetworkManager.callAPI(rest.getCurrentCycle, 'GET', null)

    })
    .then(result => {
      console.log('CURRENT CYCLE', result.currentcycle)
      //console.log(result.currentcycle)

      if(currentcycle !== result.currentcycle){
        console.log('>>>>CURRENT CYCLE  '+currentcycle, result.currentcycle)
        this.props.setGiftTaskDetails({});
        this.props.setUserGiftTask({});
        AsyncStorage.setItem('CurrentCycle', result.currentcycle+'')        
      }    
      this.getGiftTask()    
      
    }).catch(error => {})

  }

  getGiftTask(refresh) {

      let p;

      if(refresh){     
        p=0;
        this.state.page = 0;
      }  
      else
        p=this.state.page;

      this.setState({  giftTaskLoading: true  });      
      NetworkManager.callAPI(rest.getGiftTasks, 'POST', { page: p }).then(result => {
          
          if(p == 0) 
            this.props.emptyGiftTaskData();
          
          this.lastpagelength = result.gifttasks.length;
          this.props.setGiftTaskData(result.gifttasks)    
          this.setState({giftTaskLoading: false })

      }).catch(error => {
        this.setState({giftTaskLoading: false })
      })

  }

  loadMoreRandomData = () => {
    if (!this.state.giftTaskLoading && this.lastpagelength==10) {
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.getGiftTask()
      })
    }
  }
  
  // _renderList = (data) => {
  //   console.log('itemm', data)
  //   return (
  //     <FlatList numColumns={2}
  //       style={{ paddingLeft:10, paddingRight:10, paddingBottom:10, paddingTop:5 }}
  //       data={data}
  //       onEndReached={this.LoadMoreRandomData}
  //       onEndReachedThreshold={0.5}
  //       ListFooterComponent={this._renderSectionFooter}
  //       renderItem={({ item, index }) =>
  //         <GiftTaskView navigation={this.props.navigation} giftTask={item} />
  //       }
  //       keyExtractor={item => item.id + ''}
  //     />
  //   )
  // }

  _renderSectionHeader = () => {
    console.log('HEADER')
    return (
      //  item.title == 'section0' ? 
      <View>
        <View style={{ flexDirection:'row', paddingHorizontal: 15, paddingTop: 10, paddingBottom:5 }}>
          <Text style={{ color: color.jcgray, fontSize: 11, fontWeight: "bold" }}>WIN GAME POINTS AND GAME COINS</Text>
          {this.state.isLoading && <ActivityIndicator size="small" color="white" animating={true} style={{ width:14, height:14, marginLeft:10 }} />}
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 10, height: PixelRatio.roundToNearestPixel(105 * global.scaleFactor), borderBottomWidth:1, borderBottomColor: colors.darkcolor2,}}>
          {
            this.props.tasks.map((task, key ) => (
              <TaskView navigation={this.props.navigation} task={task} key={task.id}/>
            ))
          }
        </ScrollView>
        <View style={{ flexDirection:'row', paddingHorizontal: 15, paddingTop: 10}}>          
          <Text style={{ color: color.jcgray, fontSize: 11, fontWeight: "bold" }}>WIN CASH AND GIFTS</Text>
          {this.state.giftTaskLoading && <ActivityIndicator size="small" color="white" animating={true} style={{ width:14, height:14, marginLeft:10 }} />}
        </View>
      </View>
      //: null
    )
  }

  // _renderSectionFooter = () => {
  //   return (
  //     // <BannerAd
  //     //   unitId={TestIds.BANNER}
  //     //   size={BannerAdSize.SMART_BANNER}
  //     //   requestOptions={{
  //     //     requestNonPersonalizedAdsOnly: true,
  //     //   }} />
  //     <View>
  //       <Text>footer replace by ads</Text>
  //     </View>
  //   )
  // }

  render() {

    return (
      <SafeAreaView style={styles.mainContainer}>
        
        <View style={{ backgroundColor: color.darkcolor3, height: 0.5, width: '100%' }}></View>
        
          <FlatList
            bounces={false}
            data={this.props.gifttasks}
            numColumns={2}
            onRefresh = { () => this.getGiftTask(true) }
            refreshing = {this.state.giftTaskLoading}
            onEndReached = { () => this.loadMoreRandomData() }
            onEndReachedThreshold = {0.75}
            renderItem={({ item, index }) =>
              <GiftTaskView navigation={this.props.navigation} giftTask={item} key={index} userGiftTask={this.props.usergifttasks} />
            }
            ListHeaderComponent={this._renderSectionHeader}
            keyExtractor={(item, index) => item + index}
          />
        {this.state.giftTaskLoading &&   
          <View style={{ backgroundColor: color.darkcolor1, height: 25, width: '100%' }}>
            <ActivityIndicator size="small" color="white" animating={true} />
          </View>  
        }
        <StatusBar barStyle="light-content" hidden={false} translucent={true} />
      </SafeAreaView>
    );
  }

}

function mapStateToProps(state) {
  return {
    tasks: state.tasks.tasks,
    taskdetails: state.taskdetails,
    gifttasks: state.gifttasks.gifttasks,
    gifttaskdetails: state.gifttaskdetails,
    usergifttasks: state.usergifttasks
  };
}


function mapDispatchToProps(dispatch) {
  return {
    setTaskData: (payload) => dispatch(actions.setTaskData(payload)),
    setGiftTaskData: (payload) => dispatch(actions.setGiftTaskData(payload)),
    emptyGiftTaskData: () => dispatch(actions.emptyGiftTaskData()),
    setGiftTaskDetails: (payload) => dispatch(actions.setGiftTaskDetails(payload)),
    setUserGiftTask: (payload) => dispatch(actions.setUserGiftTask(payload)),
    loadGameState: () => dispatch(actions.loadGameState())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Game);