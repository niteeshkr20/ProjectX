import React from "react"
import {
    SafeAreaView,
    View,
    Text,
    Image
} from "react-native";
import JCImages from '../../../../../assets/JCImages'
import { connect } from 'react-redux';
import NetworkManager from "../../../../../network/NetworkManager";
import rest from "../../../../../network/rest";
import colors from "../../../../shared_styles/colors";
import CustomLoader from '../../../../shared_components/CustomLoader'
import { ScrollView } from "react-native-gesture-handler";
class GiftsWon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            giftsWon: [],
            isLoading: false
        }
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        })
        NetworkManager.callAPI(rest.getAllGiftsWon, 'GET', null).then(result => {
            this.setState({
                giftsWon: result.gifts,
                isLoading: false
            })
        }).catch(error => {

        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkcolor1 }}>
                <CustomLoader loading={this.state.isLoading} />
                {this.state.giftsWon.length > 0 ?
                    <ScrollView style={{ padding: 10 }}>
                        {this.state.giftsWon.map(item =>
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'grey', borderRadius: 10, borderWidth: 1, padding: 5, marginBottom: 10 }}>
                                {item.money > 0 ?
                                    <View style={{ flexDirection:'column', borderRadius: 5, width: 60, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightBlue }}>
                                        <Text style={{ color: 'white' }}>{'\u20B9'}</Text>
                                        <Text style={{ color: 'white' }}>{item.money}</Text>
                                    </View>
                                    :
                                    <Image style={{ width: 60, height: 60, borderRadius: 5 }} source={item.product_pic != '' ? { uri: item.product_pic } : JCImages.placeholderImage}></Image>
                                }
                                <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                                    <Text style={{ color: 'lightgrey', fontSize: 16, paddingBottom: 5 }}>{item.money > 0 ? item.money_channel : item.productname}</Text>
                                    <Text style={{ color: 'white' }}><Text style={{ color: colors.lightcolor1, fontWeight: 'bold' }}>STATUS:</Text> {item.status}</Text>
                                </View>
                            </View>
                        )}
                    </ScrollView> :
                    this.state.isLoading != true ?
                        <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color: colors.lightcolor1, fontSize:20, textAlign:'center'}}>You are yet to win a gift. {'\n'} Chat, Collect Jewels and win gifts from Gifts section.</Text>
                        </View> :
                        null
                }

            </SafeAreaView>
        )
    }
}

function mapStateToProps(state) {
    return {

    };
}


function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftsWon);
