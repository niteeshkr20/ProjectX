import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Text,
    Button,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

import colors from "../../shared_styles/colors";
import { connect } from 'react-redux';



class ChatPage_Giphy extends React.Component {

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end'
                }}
            >

                
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


export default connect(mapStateToProps, mapDispatchToProps)(ChatPage_Giphy);


