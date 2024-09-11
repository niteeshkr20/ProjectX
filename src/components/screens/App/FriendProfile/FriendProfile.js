import React, { Component } from 'react';
import {
    Animated,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux';
import BackButton from '../../../svg_components/BackButton';
import colors from "../../../shared_styles/colors";
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
import styles from './FriendProfile.styles'
import { Container, Header, Content, Button, ListItem, Left, Body, Right, Switch } from 'native-base';
import Logo from '../../../svg_components/Logo';
import Icon from 'react-native-vector-icons/MaterialIcons'
import NetworkManager from '../../../../network/NetworkManager';
import rest from '../../../../network/rest';
import { Snackbar } from 'react-native-paper';


const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class FriendProfile extends Component {
    constructor(props) {
        super(props);


        this.state = {
            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            refreshing: false,
            visible: false,
            userDetail: {
                "id": null,
                "pic": "",
                "large_pic": "",
                "name": "",
                "phone": "",
                "status": ""
            }
        };
    }
    componentDidMount() {
        this.getContactInfo()
    }
    getContactInfo = () => {
        let data = {
            phone: (this.props.activeChat.CHAT_ROOM_JID).split('@')[0]
            //   phone: '918756463536'
        }
        NetworkManager.callAPI(rest.downloadContact_Phone, 'POST', data).then(result => {
            if (result.contact != null) {
                this.setState({
                    userDetail: result.contact
                })
            }

        }).catch(error => {
            this.setState({
                visible: true
            })
            console.log(error)
        })
    }

    _renderScrollViewContent() {
        const data = Array.from({ length: 1 });
        return (
            <SafeAreaView style={styles.scrollViewContent}>
                {this.contactView()}
                <View style={{ width: '100%', height: 1, backgroundColor: colors.darkcolor3 }}></View>
                {this.StatusView()}
                {this.seprator()}
                {this.groupsInCommon()}
                {this.seprator()}
                {this.ContactDetail()}
            </SafeAreaView>
        );
    }
    contactView = () => {
        return (
            <View style={styles.contact}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.name}>{this.state.userDetail.name}</Text>
                    <Text style={styles.ContactNumber}>+{(this.props.activeChat.CHAT_ROOM_JID).split('@')[0]}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon onPress={() => this.props.navigation.goBack()} size={25} color={'white'} name="textsms" />
                </View>
            </View>
        )
    }
    StatusView = () => {
        return (
            <View style={styles.contact}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.ContactNumber}>STATUS</Text>
                    <Text style={styles.statusMessage}>{this.state.userDetail.status}</Text>
                </View>
            </View>
        )
    }

    seprator() {
        return (
            <View style={{ height: 20, backgroundColor: colors.darkcolor3, width: '100%' }}>
            </View>
        )
    }

    groupsInCommon = () => {
        return (
            <View>
                <ListItem icon noBorder>
                    <Left>
                        <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon color={"white"} name="group" size={18} />
                        </Button>
                    </Left>
                    <Body style={{ borderBottomWidth: null }}>
                        <Text style={styles.rowText}>Groups In Common</Text>
                    </Body>
                    <Right style={{ borderBottomWidth: null }}>
                        <Text style={styles.number}>3</Text>
                        <Icon color={"white"} name="arrow-forward" size={18} />
                    </Right>
                </ListItem>
            </View>
        )
    }
    ContactDetail = () => {
        return (
            <View>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon color={"white"} name="perm-contact-calendar" size={18} />
                        </Button>
                    </Left>
                    <Body style={{ borderBottomWidth: null }} noBorder>
                        <Text style={styles.rowText}>Contact Details</Text>
                    </Body>
                    <Right style={{ borderBottomWidth: null }}>
                        <Icon color={"white"} name="arrow-forward" size={18} />
                    </Right>
                </ListItem>
            </View>
        )
    }
    _onDismissSnackBar = () => this.setState({ visible: false });

    render() {
        // Because of content inset the scroll value will be negative on iOS so bring
        // it back to 0.
        // const scrollY = Animated.add(
        //     this.state.scrollY,
        //     Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
        // );
        // const headerTranslate = scrollY.interpolate({
        //     inputRange: [-HEADER_SCROLL_DISTANCE, 0, HEADER_SCROLL_DISTANCE],
        //     outputRange: [HEADER_SCROLL_DISTANCE, 0, -HEADER_SCROLL_DISTANCE],
        //     extrapolate: 'clamp',
        // });


        // const imageOpacity = scrollY.interpolate({
        //     inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        //     outputRange: [1, 1, 0],
        //     extrapolate: 'clamp',
        // });
        // const imageTranslate = scrollY.interpolate({
        //     inputRange: [0, HEADER_SCROLL_DISTANCE],
        //     outputRange: [0, 100],
        //     extrapolate: 'clamp',
        // });

        return (
            <SafeAreaView style={styles.fill}>
                <ScrollView>
                    <View style={{ alignItems: 'center', marginVertical: 30 }}>
                        <Image
                            style={styles.backgroundImage}
                            key={this.state.userDetail.phone}
                            source={{ uri: rest.imageBaseURL + this.state.userDetail.phone + '.jpeg?time=' + new Date() }}
                        />
                    </View>
                    {this._renderScrollViewContent()}
                </ScrollView>

                <Snackbar
                    duration={1000}
                    style={{ backgroundColor: colors.lightcolor1, alignItems: 'center' }}
                    visible={this.state.visible}
                    onDismiss={this._onDismissSnackBar}>
                    Failed to load Profile Data.
                </Snackbar>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {

    return {
        mytoken: state.mytoken,
        appstate: state.appstate,
        network: state.network,
        game: state.game,
        activeChat: state.activechat
    }
}

function mapDispatchToProps(dispatch) {

    return {
        openRealtimeConnection: () => dispatch(realtimeConnect()),
        closeRealtimeConnection: () => dispatch(realtimeDisconnect())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfile)