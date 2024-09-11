import React from "react";
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from "../../../../shared_components/customHeader/CustomHeader";
import JCImages from '../../../../../assets/JCImages'
import styles from './LeaderBoard.styles'
import NetworkManager from "../../../../../network/NetworkManager";
import rest from "../../../../../network/rest";
import actions from "../../../../../actions";
import { connect } from 'react-redux';
import colors from "../../../../shared_styles/colors";
import { renderJewel } from '../../../../JCUtils/CommonUtils'
import LeaderBoardRow from "./LeaderBoardRow";
import CustomLoader from "../../../../shared_components/CustomLoader";

class LeaderBoard extends React.Component {
  /*static navigationOptions = ({ navigation }) => {
    
    console.log('HERE');
    return {
      header: <CustomHeader levelbar="show" />
    };
};*/
  constructor(props) {
    super(props)
    this.state = {  
      leaderboard: [],    
      isLoading: false
    }
  }

  componentDidMount() {   
    
    this.setState({
      isLoading: true
    })
    
    NetworkManager.callAPI(rest.getLeaderBoard, 'GET', null).then(result => {
      console.log('LEADERBOARD')
      
      //let t = Object.create(result.top);
      let lb;
      lb = result.top.reverse()
      lb.push({id:this.props.mytoken.myid, phone: this.props.mytoken.myphone, name: 'You', level: this.props.game.scores.level, total_points:0})
             
      lb = lb.concat(result.down);
      //console.log(lb);             
                  
      this.setState({        
        leaderboard: lb
      })

      this.setState({        
        isLoading: false
      })      

    })
    .catch(error => { })

  }

  

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <CustomLoader loading={this.state.isLoading} />
        <FlatList                    
            data={this.state.leaderboard}                    
            renderItem={({ item, index }) =>
                <LeaderBoardRow type={'other'} item={item} />
            }                    
            keyExtractor={(item, index) => item.id+''}
        />

      </SafeAreaView >
    );
  }
  
}

function mapStateToProps(state) {
  return {    
    game: state.game,
    mytoken: state.mytoken
  };
}


function mapDispatchToProps(dispatch) {
  return {
    //setLeaderBoard: (payload) => dispatch(actions.setLeaderBoard(payload))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
