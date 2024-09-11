import React from 'react'
import {
  ImageBackground,
  Button,
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import colors from '../../../shared_styles/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import JCImages from '../../../../assets/JCImages'
import { connect } from 'react-redux';
import NetworkManager from "../../../../network/NetworkManager";
import rest from '../../../../network/rest';
import styles from './jewelFactory.styles'
import actions from '../../../../actions';
import { renderJewel } from '../../../JCUtils/CommonUtils'
import FactoryOutputView from './factoryOutputView'
import FactoryRunningView from './factoryRunningView'
import FactoryFinalView from './factoryFinalView';
import CustomLoader from '../../../shared_components/CustomLoader';

class JewelFactory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userFactory: [],
      jewelReady: false
    }
  }
  componentDidMount() {
    this.props.getFactory()
    this.props.getUserFactory()    
  }

  makeJewelReady = () =>{
    this.setState({
      jewelReady: !this.state.jewelReady
    })
  }


  isFactoryRunning(index){

    
    let dateParams = this.props.userFactory[index].start_time.split(/[\s-:]/);
    dateParams[1] = (parseInt(dateParams[1], 10) - 1).toString();
    let startTime = new Date(Date.UTC(...dateParams)).getTime();

    let now = new Date().getTime();
    let durationPassed = (now - startTime + global.TimeDelta)/1000

    return durationPassed
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkcolor1 }}>
        <CustomLoader loading={this.props.isLoading} />
        <ScrollView style={{ flex: 1, backgroundColor: colors.darkcolor1 }}>
          {this.props.userFactory.length > 0 ?
            this.props.factory.map((item, index) =>
              this.props.userFactory[index].is_on == 1 ?
                this.isFactoryRunning(index) <= item.duration ?                  
                  <FactoryRunningView factory={item} userfactory={this.state.userFactory[index]} index={index} makeJewelReady={this.makeJewelReady} />
                  :
                  <FactoryFinalView factory={item} index={index} />                  
                :
                <FactoryOutputView factory={item} index={index} />
            )
            : null}

          <StatusBar barStyle="light-content" hidden={false} translucent={true} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}


function mapStateToProps(state) {
  return {
    factory: state.factory.factory,
    material: state.factory.materials,
    userFactory: state.userfactory.factoryuser,
    isLoading: state.userfactory.isLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getFactory: () => dispatch(actions.getFactory()),
    getUserFactory: () => dispatch(actions.getUserFactory())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(JewelFactory)

