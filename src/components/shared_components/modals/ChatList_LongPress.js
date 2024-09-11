import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Text,
    Button,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView
} from 'react-native';

import colors from "../../shared_styles/colors";
import { connect } from 'react-redux';



class ChatList_LongPress extends React.Component {

    state = {

    }

    componentDidMount() {

        console.log('ChatList_LongPress'); 
        console.log(this.props.modalprops.navigation.getParam('item'));        
        this.setState({ item: this.props.modalprops.navigation.getParam('item') })    
        
    }

    clearChats(){
        console.log('Clear Chats for ID:'+this.state.item._ID);
        this.props.modalprops.navigation.goBack();
    }

    render() {
        return (
                <View style={{height:'100%', width:'100%'}}>
                    <View style={{ position: 'absolute', top: 0, left:0, width:'100%', height: '100%', backgroundColor:colors.darkcolor1, opacity:0.5}}></View>
                    <View style={{ position:'absolute',top: 0, left:0, width:'100%', height: '100%'}}>
                        <SafeAreaView style={{flex:1}}>  
                            <View
                                style={{                                
                                    flex: 1,
                                    flexDirection:'column-reverse',
                                    justifyContent: 'flex-end'
                                }}
                            >

                                        
                                            
                                        <TouchableOpacity style={{ flexDirection:'row', justifyContent:'center', marginLeft: 16, marginRight: 16, marginBottom: 16, marginTop:16, backgroundColor:'white', opacity:1.0, borderColor:'white', borderWidth:1, borderRadius:5 }}
                                            onPress={() => {  this.props.modalprops.navigation.goBack() }}>
                                            <Text style={{fontSize:16, marginTop:8, marginBottom: 8, color: colors.lightcolor2 }}>Cancel</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ flexDirection:'row', justifyContent:'center', marginLeft: 16, marginRight: 16, backgroundColor:'white', opacity:1.0, borderColor:'white', borderWidth:1, borderRadius:5 }}
                                            onPress={ () => this.clearChats() }>
                                            <Text style={{fontSize:16, marginTop:8, marginBottom: 8, color: colors.lightcolor2 }}>Clear Chats</Text>
                                        </TouchableOpacity>
                                            
                                                    
                                        <TouchableOpacity style={{ width:'100%',flexGrow: 1}} 
                                            onPress={() => {  this.props.modalprops.navigation.goBack() }}>
                                        </TouchableOpacity> 

                                

                                
                            </View>
                        </SafeAreaView>   
                    </View>               
                </View>    
        );
    }

}


function mapStateToProps(state) {
    return {
        
    }
}

function mapDispatchToProps(dispatch) {
    return {


    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatList_LongPress);


