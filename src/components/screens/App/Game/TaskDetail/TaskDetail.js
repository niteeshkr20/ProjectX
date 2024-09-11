import React from 'react'
import {    
    StyleSheet,
    View,
    Text,    
    TouchableOpacity,
    ImageBackground,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './TaskDetail.styles'
import Coin from '../../../../svg_components/Coin';
import Logo from '../../../../svg_components/Logo';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context'
import color from '../../../../shared_styles/colors'
import XP from '../../../../svg_components/XP';
import JCImages from '../../../../../assets/JCImages'
import NetworkManager from '../../../../../network/NetworkManager';
import rest from '../../../../../network/rest';
import { renderJewel, jewelInfo } from '../../../../JCUtils/CommonUtils'
import actions from '../../../../../actions';
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomLoader from '../../../../shared_components/CustomLoader';
//  import { BannerAdSize, BannerAd, TestIds } from '@react-native-firebase/admob';

class TaskDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLaoding: false,
            locktimer: 1,
            locktimertext: '0h 0m 0s'
        }
        this.task = this.props.navigation.state.params.task;
        this.locktimerid = null;

        let dateParams = this.task.created_at.split(/[\s-:]/);
        dateParams[1] = (parseInt(dateParams[1], 10) - 1).toString();
        this.taskcreated_at = new Date(Date.UTC(...dateParams))
        console.log('>>>>',this.taskcreated_at);        
        //this.taskcreated_at = new Date(t.getFullYear(), t.getMonth()+1, t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds()).getTime();        
    }

    componentDidMount() {
        //console.log('TASK DETAILS', this.props);
        //console.log('TASK', this.task);
        //console.log( (now + global.TimeDelta) , taskcreated_at )

        let now = new Date().getTime();

        let distance = this.taskcreated_at.getTime() - now - global.TimeDelta; 

        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.setState({
            locktimer: distance,
            locktimertext: hours + "h " + minutes + "m " + seconds + "s "
            //locktimertext:this.task.created_at  //this.taskcreated_at.toString()
        })

        this.locktimerid = setInterval( () => {

            // Get todays date and time            
            now = new Date().getTime();
    
            console.log( (now + global.TimeDelta) , this.taskcreated_at )
            
            // Find the distance between now an the count down date
            distance = this.taskcreated_at - now - global.TimeDelta;       
    
            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(this.locktimerid);  
                console.log('Timer stopped')   
                this.setState({
                    locktimer: distance                    
                })           
            }else{
                
                // Time calculations for days, hours, minutes and seconds
                hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
                console.log(hours + "h " + minutes + "m " + seconds + "s ")
                this.setState({
                    locktimer: distance,
                    locktimertext: hours + "h " + minutes + "m " + seconds + "s "
                    //locktimertext: distance
                })
            }
    
        }, 1000);       

        console.log('TASK', this.props.taskdetails.hasOwnProperty(this.task.task_id));
        if (!this.props.taskdetails.hasOwnProperty(this.task.task_id))
            this.getTaskDetails()


    }

    componentWillUnmount() {
        clearInterval(this.locktimerid); 
    }

    getTaskDetails() {
        console.log('TASK ID', this.props);
        let data = {
            'task_id': this.props.navigation.state.params.task.task_id
        }
        NetworkManager.callAPI(rest.getTaskElements, 'POST', data).then(result => {
            let data = JSON.parse(JSON.stringify(this.props.taskdetails))
            data[this.task.task_id] = result.taskdetails
            this.props.setTaskDetails(data)
            console.log('TASK DETAILS', this.props);
        }).catch(error => {})
    }

    getTasks() {

        console.log('GET TASKS')
        NetworkManager.callAPI(rest.getTasks, 'POST', null).then(result => {
            console.log('Tasks downloaded after completion')
            console.log(result.tasks)            
            this.props.setTaskData(result.tasks)
        }).catch(error => {})  
        
    }


    

    

    jewelView(jewel) {
        
        
        let jewelView = []
        if(jewel.count<=5){
            for (let i = 0; i < jewel.count; i++) {
                jewelView.push(
                    renderJewel(jewel.jeweltype_id, 30, 30, styles.jewelStyle, jewel.jeweltype_id+'_'+i)
                )
            }
        }
        else{
            for (let i = 0; i < 3; i++) {
                jewelView.push(
                    renderJewel(jewel.jeweltype_id, 30, 30, styles.jewelStyle, jewel.jeweltype_id+'_'+i)
                )
            }
            jewelView.push(
                <View>
                    <Text style={{fontSize:20, color: color.lightcolor1, fontWeight:'bold'}}>...({jewel.count})</Text>
                </View>
            )
        }
        //console.log('JEWELVIEW', jewelView)
        return jewelView
    }
    
    CheckNonAvailablity(RequiredJewel) {

        // const val = this.props.game.jewels.find((jewel) => {
        //     return (RequiredJewel.jeweltype_id === jewel.jeweltype_id  &&  jewel.count<RequiredJewel.count )  
        // })
        //return ( val ? true: false);

        if(this.props.game.jewels[RequiredJewel.jeweltype_id].count < RequiredJewel.count)
            return true;
        else 
            return false;         

    }

    CheckAvailablityForAllJewels() {
        
        const nonavailablejewel = this.props.taskdetails[this.task.task_id].find((jewel) => {
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

    handleTaskCompletion(){

        console.log('HANDLE TASK COMPLETION')
                    
        let data = {
            task_id: this.task.task_id,
            id: this.task.id
        }

        if (this.CheckAvailablityForAllJewels()) {

            this.setState({  isLaoding: true  });
            AsyncStorage.setItem('ActiveGameTask', JSON.stringify(data))
            .then(()=>{
                return NetworkManager.callAPI(rest.redeemTask, 'POST', data)
            })
            .then( result => {
                return this.checkDelay()
            })
            .then(() => {
                return NetworkManager.callAPI(rest.checkTaskCompletion, 'POST', data)
            })
            .then( (completedtask) => {
                
                if( completedtask.taskusers && completedtask.taskusers.done == 1 ){
                    console.log('TASK COMPLETED')
                    
                    return NetworkManager.callAPI(rest.getNewTaskOnTaskCompletion, 'GET', null)
                    
                }else{                    
                    return new Promise( (resolve, reject) => { reject('TASK NOT COMPLETED') })                    
                }              

            })
            .then(val => {
                console.log('New task Creation success')
                this.setState({  isLaoding: false  });
                AsyncStorage.removeItem('ActiveGameTask').then(()=>{}).catch(err=>{})
                this.getTasks()
                
                let newlevel=false;
                if(this.props.game.scores.points + this.task.points  > this.props.game.scores.max_level_points)
                    newlevel = true
                this.props.loadGameState()    
                this.props.navigation.navigate('SuccessFullGiftRedeem', {tasktype: 'gametask', newlevel })
            })
            .catch(err =>{
                console.log('New task Creation error')
                this.setState({  isLaoding: false  });
                AsyncStorage.removeItem('ActiveGameTask').then(()=>{}).catch(err=>{})

                if(err.response){
                    if(err.response.data.message === 'Invalid Task' || err.response.data.message === 'Task Not Completed'){
                        // remove this task and Go Back in navigation
                        // reload game state and task list 

                        this.getTasks()
                        this.props.loadGameState()
                        this.props.setTaskDetails({})
                        this.props.navigation.goBack();                  
                        console.log('TASK ERROR',err.response.data)     
                        console.log('TASK ERROR',err.response.data.message)

                    }                       
                }else if(err === 'TASK NOT COMPLETED'){
                    console.log('TASK NOT COMPLETED');
                }

            })         

        }       

    }

    render() {
        return (
            <SafeAreaView style={styles.mainContainer}>               
                <CustomLoader  loading={this.state.isLaoding}/>
                <View style={{flex:1, flexDirection: 'column-reverse', justifyContent: 'flex-end',}}>
                        
                        {/* <BannerAd
                            unitId="ca-app-pub-9160946093285023/4986897283"
                            size={BannerAdSize.SMART_BANNER}
                            onAdFailedToLoad={error =>console.log('Ad error',error)}                            
                        /> */}
                    <ScrollView style={{width: '100%', flexGrow: 1}}>        
                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 50 }}>
                            <View style={styles.scrollBarItem}>
                                <View style={styles.itemOne}>
                                    <XP height="35" width="35" />
                                    <Text style={styles.itemText}>{this.task.points}</Text>
                                </View>
                                <View style={styles.itemOne}>
                                    <Coin height="25" width="25" />
                                    <Text style={styles.itemText}>{this.task.coins}</Text>
                                </View>
                                
                            </View>
                        </View>
                        <View style={{ backgroundColor: color.darkcolor3, height: 0.5, width: '100%' }}></View>
                        <View>
                            <Text style={styles.CollectText}>COLLECT JEWELS</Text>
                        </View>
                        {this.props.taskdetails.hasOwnProperty(this.task.task_id) ?
                            <View style={{ paddingBottom: 20, flexDirection: 'column' }}>
                                {
                                    this.props.taskdetails[this.task.task_id].map((jewel) => 
                                        <View style={{ flexDirection: 'row', padding: 5 }} key={jewel.id + this.task.task_id}>
                                            <View style={{ flexDirection: 'row', width: '85%', paddingLeft: '15%', alignItems: 'center', justifyContent: 'center' }}>
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
                        {this.state.locktimer<= 0 ? 
                        this.props.taskdetails.hasOwnProperty(this.task.task_id) ?
                        this.CheckAvailablityForAllJewels()?
                        <TouchableOpacity disabled={!this.CheckAvailablityForAllJewels()} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom:30 }} onPress = { ()=> this.handleTaskCompletion()}>

                            <View style={{ width: 220, height: 45, zIndex: 1, backgroundColor: color.darkcolor3, borderColor: color.darkcolor3, borderRadius: 8, borderWidth: StyleSheet.hairlineWidth, overflow: 'hidden' }}>
                                <View style={{ width: "100%", height: '100%' }}>
                                    <ImageBackground source={JCImages.colorGrad} style={{
                                        width: '100%', height: '100%', justifyContent: 'center',
                                        alignItems: 'center', overflow: 'hidden'
                                    }}></ImageBackground>
                                </View>
                            </View>
                            <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 2, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>WIN POINTS & COINS</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <View style={{ alignItems: 'center', paddingTop: 10, marginBottom:30 }}>
                            <View style={{ justifyContent: 'center', width: 220, alignItems: 'center', backgroundColor: color.darkcolor2, borderRadius: 5, borderWidth: 1, borderColor: color.lightcolor1, paddingHorizontal: 25, paddingVertical: 10 }}>
                            <Text style={{ color: color.jcgray }}>COLLECT ALL JEWELS</Text>
                            </View>
                        </View>
                        :null
                        :
                        <View style={{ alignItems: 'center', paddingTop: 10, marginBottom:30 }}>
                            <View style={{ flexDirection:'row', justifyContent: 'space-evenly', width: 220,  backgroundColor: color.darkcolor2, borderRadius: 5, borderWidth: 1, borderColor: color.lightcolor1, paddingHorizontal: 25, paddingVertical: 10 }}>
                            <Icon name='clock-o' size={20} color={color.jcgray}  />
                            <Text style={{ color: color.jcgray, fontSize:16 }}>{this.state.locktimertext}</Text>
                            </View>
                        </View>
                        }

                    </ScrollView> 
                </View>
            
            </SafeAreaView>
        );
    }

}

function mapStateToProps(state) {
    return {
        tasks: state.tasks.tasks,
        taskdetails: state.taskdetails.taskdetails,
        gifttasks: state.gifttasks.gifttasks,
        gifttaskdetails: state.gifttaskdetails,
        usergifttasks: state.usergifttasks,
        game: state.game
    };
}


function mapDispatchToProps(dispatch) {
    return {
        setTaskDetails: (payload) => (dispatch(actions.setTaskDetails(payload))),
        setTaskData: (payload) => dispatch(actions.setTaskData(payload)),
        loadGameState: () => dispatch(actions.loadGameState())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);