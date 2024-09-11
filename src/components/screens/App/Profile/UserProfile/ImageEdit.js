import React from "react"
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    SafeAreaView,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ImageBackground,
    PixelRatio,
    Modal
} from "react-native";
import styles from './UserProfile.styles'
import JCImages from '../../../../../assets/JCImages'
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import ImageEditor from "@react-native-community/image-editor";
import RNFS from 'react-native-fs'
import NetworkManager from "../../../../../network/NetworkManager";
import rest from "../../../../../network/rest";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CognitoIdentityClient, GetCredentialsForIdentityCommand } from "@aws-sdk/client-cognito-identity"; // ES Modules import
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { decode } from "base64-arraybuffer";
import colors from "../../../../shared_styles/colors";
import { Button } from 'native-base';
import CustomLoader from "../../../../shared_components/CustomLoader";

class ImageEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imagepath: '',
            isLoading: false
        }
    }
    componentDidMount() {
        AsyncStorage.multiGet(["UserProfileImage", "UserProfile"]).then(profileData => {
            console.log(profileData)
            if (profileData) {
                this.setState({
                    imagepath: profileData[0][1]
                })
            }
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
        // AWS.config.region = 'ap-south-1'
        // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        //     IdentityPoolId: 'ap-south-1:e04ce17e-0b33-4ada-b6a0-962aa9adfb29',
        //     IdentityId: responseJson.IdentityId,
        //     Logins: {
        //         'cognito-identity.amazonaws.com': responseJson.Token
        //     }
        // });

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
        
        const credentials = client.send(command).then(res =>{
            return res.Credentials
        });

        var keyName = this.props.mytoken.myphone + '.jpeg';
        let contentType = image.mime;
        const arrayBuffer = decode(image.data);
        var params = { Bucket: 'profileprojectx', Key: keyName, Body: arrayBuffer, contentType: contentType };

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


        // // Refresh and Upload
        // AWS.config.credentials.refresh(() => {
        //     var keyName = this.props.mytoken.myphone + '.jpeg';
        //     let contentType = image.mime;
        //     const arrayBuffer = decode(image.data);
        //     var params = { Bucket: 'profileprojectx', Key: keyName, Body: arrayBuffer, contentType: contentType };
        //     var upload = new AWS.S3.ManagedUpload({
        //         params: params
        //     });
        //     upload.send((err, data) => {
        //         console.log(err, data);
        //         //  this.updateInServer(data.Location, pic)
        //         this.setState({
        //             imagepath: data.Location,
        //             isLoading: false
        //         })
        //     });
        // });
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
        var cropData = {
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
                AsyncStorage.setItem('UserProfileImage', `data:${image.mime};base64,${image.data}`)
            })
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkcolor1 }}>
                <CustomLoader loading={this.state.isLoading} />
                <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ width: 400, height: 400, alignItems: 'center', justifyContent: 'center' }} key={this.state.imagepath} source={{ uri: rest.imageBaseURL + this.props.mytoken.myphone +'.jpeg?time=' + new Date() }} />
                </ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20 }}>
                    <Button style={{ width: '45%', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.lightcolor2 }} primary><Text style={{ color: 'white' }}>CLEAR</Text></Button>
                    <Button style={{ width: '45%', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.lightcolor2 }} onPress={() => this.openImagePicker()} primary><Text style={{ color: 'white' }}>UPLOAD</Text></Button>
                </View>
            </SafeAreaView>
        )
    }
}

function mapStateToProps(state) {
    return {
        mytoken: state.mytoken
    };
}


function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageEdit);
