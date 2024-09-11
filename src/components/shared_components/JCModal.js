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

import colors from "../shared_styles/colors";
import ChatList_LongPress from './modals/ChatList_LongPress';
import ChatPage_ShareOptions from './modals/ChatPage_ShareOptions';
import ChatPage_Giphy from './modals/ChatPage_Giphy';
import JewelStore from './modals/JewelStore';
import ChatPageOptions from './modals/ChatPageOptions'
import UpdateStatus from './modals/UpdateStatus';



export default class JCModal extends React.Component {

    state = {
        type: 'JStore'
    }

    componentDidMount() {
        const { route } = this.props;
        const { modal_name } = route.params || {}
        console.log('MOUNT MODAL');
        this.setState({ type: modal_name })

    }

    componentWillUnmount() {

        console.log('UNMOUNT MODAL')

    }

    render() {
        console.log(this.props);

        if (this.state.type === 'JStore') {

            return (<JewelStore modalprops={this.props} />);

        } else if (this.state.type === 'chatlist_longpress') {

            return (<ChatList_LongPress modalprops={this.props} />);

        } else if (this.state.type === 'chatpage_shareoptions') {

            return (<ChatPage_ShareOptions modalprops={this.props} />);

        } else if (this.state.type === 'chatpage_giphy') {

            return (<ChatPage_Giphy modalprops={this.props} />);

        } else if (this.state.type === 'ChatPageOptions') {

            return (<ChatPageOptions modalprops={this.props} />)

        }
        else if (this.state.type === 'UpdateStatus') {

            return (<UpdateStatus modalprops={this.props} />)

        }

    }

}




const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: colors.darkcolor1
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

