import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Text,
    Button,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView
} from 'react-native';
import styles from './Modal.styles'
import colors from "../../shared_styles/colors";
import { connect } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';



class JewelStore extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            status: this.props.modalprops.navigation.getParam('value')
        }
    }
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={65}
                style={{
                    flex: 1,
                }}><SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '70%',
                        backgroundColor: colors.darkcolor1,
                        opacity: 0.5
                    }}
                        onPress={() => { console.log('Herex'); this.props.modalprops.navigation.goBack() }}
                    >
                    </TouchableOpacity>

                    <View style={{
                        paddingTop: 20,
                        alignItems: 'center',
                        height: '30%',
                        backgroundColor: colors.darkcolor2,
                        borderTopWidth: 1,
                        borderTopColor: 'white'
                    }}
                    >
                        <Text style={styles.labelStyle}>{this.props.modalprops.navigation.getParam('subType')}</Text>
                        <View style={styles.TextInputContainer}>
                            <TextInput
                                maxLength={255}
                                style={styles.inputStyle}
                                onChangeText={(text) => {
                                    this.setState({
                                        status: text
                                    })
                                }}
                                onSubmitEditing={() => {
                                    this.props.modalprops.navigation.getParam('UpdateStatus')(this.state.status)
                                    this.props.modalprops.navigation.goBack()
                                }}
                                value={this.state.status}
                            />
                        </View>
                        <View style={styles.formelementstyle5}>
                            <View style={styles.mainbtnctr}>
                                <TouchableOpacity
                                    style={styles.buttonContainer2}
                                    onPress={() => this.props.modalprops.navigation.goBack()}>
                                    <Text style={styles.btnTextStyle}>CANCEL</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonContainer2}
                                    disabled={this.state.disbleSubmit}
                                    onPress={() => {
                                        this.props.modalprops.navigation.getParam('UpdateStatus')(this.state.status)
                                        this.props.modalprops.navigation.goBack()
                                    }}>
                                    <Text style={styles.btnTextStyle}>SAVE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}
function mapStateToProps(state) {
    return {
        game: state.game
    }
}
function mapDispatchToProps(dispatch) {
    return {
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(JewelStore);


