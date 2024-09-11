import React from "react";
import {
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image
} from "react-native";
import styles from './UserProfile.styles'
import JCImages from '../../../../../assets/JCImages'
import { connect } from 'react-redux';
import Logo from '../../../../svg_components/Logo';
import Diamond from '../../../../svg_components/Diamond'
import ImagePicker from 'react-native-image-crop-picker';
import ImageEditor from "@react-native-community/image-editor";
import RNFS from 'react-native-fs'
import NetworkManager from "../../../../../network/NetworkManager";
import rest from "../../../../../network/rest";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from "base64-arraybuffer";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../../../shared_styles/colors";
import { Item, Input, Textarea, Form } from 'native-base';
import CustomLoader from "../../../../shared_components/CustomLoader";
import { CognitoIdentityClient, GetCredentialsForIdentityCommand } from "@aws-sdk/client-cognito-identity"; // ES Modules import
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

class UserProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            profileimageerror: false,
            name: '',
            status: '',
            address: '',
            imageUri: rest.imageBaseURL + this.props.mytoken.myphone + '?time=' + new Date().getTime(),
            isLoading: false
        }

    }

    componentDidMount() {
        this.getProfileData()
        console.log('IMAGE URI')
        console.log(this.state.imageUri);
    }

    getProfileData() {

        this.setState({
            isLoading: true
        })

        NetworkManager.callAPI(rest.getProfile, 'GET', null).then((responseJson) => {
            if (responseJson.error == false) {
                console.log(responseJson.profile);
                this.setState({
                    name: responseJson.profile.name,
                    status: responseJson.profile.status,
                    address: responseJson.profile.address
                })
                //AsyncStorage.setItem('name', responseJson.profile.name)
                this.setState({
                    isLoading: false
                })
            }
        }).catch((error) => {
            console.log(error)
            this.setState({
                isLoading: false
            })
        })



    }

    updateStatus = () => {

        this.setState({
            isLoading: true
        })

        var data = {
            status: this.state.status
        }

        NetworkManager.callAPI(rest.updateStatus, 'post', data).then((responseJson) => {

            this.setState({
                isLoading: false
            })
        }).catch((error) => {
            console.log(error)
            this.setState({
                isLoading: false
            })
        })

    }

    updateName = () => {

        this.setState({
            isLoading: true
        })

        var data = {
            name: this.state.name
        }

        NetworkManager.callAPI(rest.updateProfileName, 'post', data).then((responseJson) => {

            AsyncStorage.setItem('name', this.state.name)
            this.setState({ isLoading: false })
            this.props.tokenLoad({ name: this.state.name })

        }).catch((error) => {
            console.log(error)
            this.setState({ isLoading: false })
        })

    }


    updateAddress = () => {

        this.setState({
            isLoading: true
        })

        var data = {
            address: this.state.address
        }

        NetworkManager.callAPI(rest.updateAddress, 'post', data).then((responseJson) => {

            this.setState({
                isLoading: false
            })

        }).catch((error) => {
            console.log(error)
            this.setState({
                isLoading: false
            })
        })

    }


    openImagePicker() {

        ImagePicker.openPicker({
            cropping: true,
            width: 500,
            height: 500,
            includeBase64: true,
            compressImageQuality: 0.5
        }).then(image => {
            this.crop(image.path, image)
        })

    }

    crop(imagePath, image) {

        let cropData = {
            offset: { x: 0, y: 0 },
            size: { width: 500, height: 500 },
            displaySize: { width: 40, height: 40 },
            resizeMode: 'contain'
        };
        ImageEditor.cropImage(imagePath, cropData).then(url => {
            console.log("Cropped image uri", url);
            RNFS.readFile(url, 'base64').then(base64image => {
                console.log('cropped base64', base64image)
                var image64 = `data:${image.mime};base64,${base64image}`
                console.log(image64)
                this.getAWSTaken(image, image64)
                //AsyncStorage.setItem('UserProfileImage', `data:${image.mime};base64,${image.data}`)
            })
        })

    }


    getAWSTaken(image, pic) {

        this.setState({
            isLoading: true
        })
        NetworkManager.callAPI(rest.awsToken, 'get', null).then((responseJson) => {
            console.log('AWS token result')
            this.uploadImagetoAWS(image, pic, responseJson)
            console.log(responseJson)
        }).catch((error) => {
            console.log(error)
        })

    }


    uploadImagetoAWS = (image, pic, responseJson) => {

        const client = new CognitoIdentityClient();
        client.config.region = 'ap-south-1'
        const input = {
            IdentityPoolId: 'ap-south-1:e04ce17e-0b33-4ada-b6a0-962aa9adfb29',
            IdentityId: responseJson.IdentityId,
            Logins: {
                'cognito-identity.amazonaws.com': responseJson.Token
            }
        }
        const command = new GetCredentialsForIdentityCommand(input);

        const credentials = client.send(command).then(res => {
            return res.Credentials
        });

        // AWS.config.region = 'ap-south-1'
        // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        //     IdentityPoolId: 'ap-south-1:e04ce17e-0b33-4ada-b6a0-962aa9adfb29',
        //     IdentityId: responseJson.IdentityId,
        //     Logins: {
        //         'cognito-identity.amazonaws.com': responseJson.Token
        //     }
        // });
        // Refresh and Upload
        var keyName = this.props.mytoken.myphone;
        let contentType = image.mime;
        const arrayBuffer = decode(image.data);
        var params = { Bucket: 'profileprojectx', Key: keyName, Body: arrayBuffer, contentType: contentType };
        // var upload = new AWS.S3.ManagedUpload({
        //     params: params
        // });
        // upload.send((err, data) => {
        //     console.log(err, data);
        //     //  this.updateInServer(data.Location, pic)
        //     this.setState({
        //         imageUri: data.Location + '?time=' + new Date().getTime(),
        //         isLoading: false
        //     })
        //     this.props.tokenLoad({ imageUri: data.Location + '?time=' + new Date().getTime() })
        // });

        try {
            const s3Client = new S3Client()
            s3Client.config.credentials = credentials
            s3Client.config.region = 'ap-south-1'
            const parallelUploads3 = new Upload({
                client: s3Client,
                params: params,
            });

            parallelUploads3.on("httpUploadProgress", (progress) => {
                console.log(progress);
            });

            parallelUploads3.done().then(val => {
                this.setState({
                    imagepath: val.Location,
                    isLoading: false
                })
            });
        } catch (e) {
            console.log(e);
        }


    }


    render() {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <CustomLoader loading={this.state.isLoading} />
                <ScrollView>
                    <View style={{ paddingTop: 30, flex: 1, alignItems: 'center' }} >
                        <View style={{ height: 300, width: 300, justifyContent: 'center', alignItems: 'center', borderColor: colors.lightcolor1, borderWidth: 1 }}>
                            {!this.state.profileimageerror &&
                                <Image
                                    style={{ flex: 1, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
                                    key={this.state.imagepath}
                                    source={{ headers: { Pragma: 'no-cache' }, uri: this.state.imageUri }}
                                    onError={(error) => {
                                        this.setState({ profileimageerror: true })
                                    }}></Image>
                            }
                            {
                                this.state.profileimageerror && <Icon name='user' color={colors.jcgray} size={300} solid />
                            }
                            <TouchableOpacity onPress={() => this.openImagePicker()}
                                style={{ position: 'absolute', bottom: 0, right: 0, margin: 10 }}  >
                                <Icon name='edit' size={20} color='white' />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'column', marginLeft: 16, marginRight: 16 }}>

                        <View style={{ marginTop: 30, marginBottom: 15 }}>
                            <Text style={{ color: colors.lightcolor1 }}>PHONE</Text>
                            <Text style={{ color: 'white' }}>+{this.props.mytoken.myphone}</Text>
                        </View>

                        <View style={{ marginTop: 15 }}><Text style={{ color: colors.lightcolor1 }}>NAME (max 30 characters)</Text></View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 44, marginTop: 5, marginBottom: 15 }}>
                            <Item regular style={{ width: '70%', alignSelf: 'center', color: colors.lightcolor1, borderColor: colors.lightcolor1, borderRadius: 5 }}>
                                <Input placeholder='Name'
                                    maxLength={30}
                                    onSubmitEditing={event => {
                                        this.updateName();
                                    }}
                                    value={this.state.name}
                                    onChangeText={(val) => { this.setState({ name: val }) }}
                                    style={{ color: colors.lightcolor1 }} />
                            </Item>
                            <TouchableOpacity
                                onPress={() => this.updateName()}
                                style={{ alignSelf: 'flex-end', backgroundColor: colors.lightcolor2, height: '100%', width: 70, alignItems: 'center', borderColor: colors.lightcolor1, justifyContent: 'center', borderWidth: 1.5, borderRadius: 5 }}>
                                <Text style={{ color: colors.jcgray, fontSize: 12 }}>Save</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 15 }}><Text style={{ color: colors.lightcolor1 }}>STATUS (max 250 characters)</Text></View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                            <Form style={{ width: '70%', alignSelf: 'center', color: colors.lightcolor1, borderColor: colors.lightcolor1, borderRadius: 5 }}>
                                <Textarea rowSpan={3} bordered
                                    onSubmitEditing={event => {
                                        this.updateStatus();
                                    }}
                                    maxLength={250}
                                    value={this.state.status}
                                    onChangeText={(val) => { this.setState({ status: val }) }}
                                    placeholder='' style={{ color: colors.lightcolor1, borderColor: colors.lightcolor1, borderRadius: 5 }} />
                            </Form>
                            <TouchableOpacity
                                onPress={() => this.updateStatus()}
                                style={{ alignSelf: 'flex-end', backgroundColor: colors.lightcolor2, height: '100%', height: 44, width: 70, alignItems: 'center', borderColor: colors.lightcolor1, justifyContent: 'center', borderWidth: 1.5, borderRadius: 5 }}>
                                <Text style={{ color: colors.jcgray, fontSize: 12 }}>Save</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 15 }}><Text style={{ color: colors.lightcolor1 }}>ADDRESS</Text></View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                            <Form style={{ width: '70%', alignSelf: 'center', color: colors.lightcolor1, borderColor: colors.lightcolor1, borderRadius: 5 }}>
                                <Textarea rowSpan={5} bordered
                                    maxLength={500}
                                    onSubmitEditing={event => {
                                        this.updateAddress();
                                    }}
                                    value={this.state.address}
                                    onChangeText={(val) => { this.setState({ address: val }) }}
                                    placeholder='Enter your proper home address to receive your gifts.' style={{ color: colors.lightcolor1, borderColor: colors.lightcolor1, borderRadius: 5 }} />
                            </Form>
                            <TouchableOpacity
                                onPress={() => this.updateAddress()}
                                style={{ alignSelf: 'flex-end', backgroundColor: colors.lightcolor2, height: '100%', height: 44, width: 70, alignItems: 'center', borderColor: colors.lightcolor1, justifyContent: 'center', borderWidth: 1.5, borderRadius: 5 }}>
                                <Text style={{ color: colors.jcgray, fontSize: 12 }}>Save</Text>
                            </TouchableOpacity>
                        </View>


                    </View>








                    {/* <List>
                        
                        <ListItem>
                            <Body>
                                <Text style={{ color: colors.lightcolor1, fontWeight: 'bold' }}>PHONE</Text>
                                <Text style={{ color: 'white' }}>+{this.state.userProfile.phone}</Text>
                            </Body>                            
                        </ListItem>
                        <ListItem>
                            <Body>
                                <Text style={{ color: colors.lightcolor1, fontWeight: 'bold' }}>NAME</Text>
                                <Text style={{ color: 'white' }} note onPress={() => this.props.navigation.navigate('MyModal', { modal_name: 'UpdateStatus', subType: 'UPDATE NAME', value: this.state.userProfile.name, UpdateStatus: this.updateName })}>{this.state.userProfile.name}</Text>
                            </Body>
                            <Right>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyModal', { modal_name: 'UpdateStatus', subType: 'UPDATE NAME', value: this.state.userProfile.name, UpdateStatus: this.updateName })}>
                                    <Icon name='edit' size={20} color='white' />
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Body>
                                <Text style={{ color: colors.lightcolor1, fontWeight: 'bold' }}>STATUS</Text>
                                <Text style={{ color: 'white' }} note onPress={() => this.props.navigation.navigate('MyModal', { modal_name: 'UpdateStatus', subType: 'UPDATE STATUS', value: this.state.userProfile.status, UpdateStatus: this.updateStatus })}>{this.state.userProfile.status}</Text>
                            </Body>
                            <Right>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyModal', { modal_name: 'UpdateStatus', subType: 'UPDATE STATUS', value: this.state.userProfile.status, UpdateStatus: this.updateStatus })}>
                                    <Icon name='edit' size={20} color='white' />
                                </TouchableOpacity>
                            </Right>
                        </ListItem>                    
                        <ListItem>
                            <Body>
                                <Text style={{ color: colors.lightcolor1, fontWeight: 'bold' }}>Shipping Address</Text>
                                <Text style={{ color: 'white' }} note>test Address</Text>
                            </Body>
                            <Right>
                                <TouchableOpacity onPress={() => console.log('Address')}>
                                    <Icon name='edit' size={20} color='white' />
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                    </List> */}
                </ScrollView>

                {/* <Button onPress={() => this.openImagePicker()} title='Select Image' /> */}
            </SafeAreaView >
        );
    }
}

function mapStateToProps(state) {
    return {
        mytoken: state.mytoken
    };
}


function mapDispatchToProps(dispatch) {
    return {
        tokenLoad: (myTokens) => dispatch({ type: 'USER_TOKEN_LOADED', myTokens })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

//+ '?' + new Date()