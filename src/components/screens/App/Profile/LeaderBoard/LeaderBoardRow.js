import React from 'react';
import { Text, View, Image } from 'react-native';
import JCImages from '../../../../../assets/JCImages'
import styles from './LeaderBoard.styles'
import { renderJewel } from '../../../../JCUtils/CommonUtils'
import colors from "../../../../shared_styles/colors";
import XP from '../../../../svg_components/XP';
import rest from '../../../../../network/rest';
import Icon from "react-native-vector-icons/FontAwesome";


// const LeaderBoardRow = (props) => {
//     const item = props.item
//     let profileimageerror = false;
//     return (
//         <View style={{ backgroundColor: props.type == 'user' ? colors.lightBlue : null, flexDirection: 'row', alignItems: 'center', borderColor: props.type == 'user' ? colors.lightBlue : 'grey', borderRadius: 10, borderWidth: 1, padding: 5, marginBottom: 10 }}>
//             { !profileimageerror && <Image
//                     style={{ width: 45, height: 45, borderRadius: 22, borderColor: colors.jcgray, borderWidth: 1 }} 
//                     onError={(error) => { profileimageerror = true }}
//                     source={{ uri: rest.imageBaseURL+ item.phone + '?time=' + new Date().getTime() }}>
//                 </Image>}
//             {
//                 profileimageerror 
//                     && <View style={{ width: 45, height: 45, borderRadius: 22, borderColor: colors.jcgray, borderWidth: 1 }} >
//                             <Icon name='user' color={colors.jcgray} size={30} solid />
//                         </View>
//             } 
//             <View style={{ flexDirection: 'column', paddingLeft: 10, width: '70%' }}>
//                 <Text style={{ color: 'lightgrey', fontSize: 16, paddingBottom: 5 }}>{item.name}</Text>
//                 <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         <Text style={{ color: colors.lightcolor1, fontWeight: 'bold' }}>LEVEL:</Text>
//                         <Text style={{ color: 'white' }}> {item.level}</Text>
//                     </View>                    
//                 </View>
//             </View>
//         </View>
//     );
// }


class LeaderBoardRow extends React.Component {
    constructor(props) {
			super(props);        
		}

		state = {
			profileimageerror: false
		}

		render(){
			console.log('LeaderboardRow', this.props.item);
			return(
			<View style={{ backgroundColor: this.props.item.name == 'You' ? colors.lightcolor2 : null, flexDirection: 'row', alignItems: 'center', borderColor: this.props.type == 'user' ? colors.lightcolor1 : 'grey', borderRadius: 10, borderWidth: 1, padding: 5, marginBottom: 10 }}>
            { !this.state.profileimageerror && <Image
                    style={{ width: 45, height: 45, borderRadius: 22, borderColor: colors.jcgray, borderWidth: 1 }} 
                    onError={(error) => { 
											this.setState({profileimageerror : true})
										}}
                    source={{ uri: rest.imageBaseURL+ this.props.item.phone + '?' + global.randstr }}>
                </Image>}
            {
                this.state.profileimageerror 
                    && <View style={{ width: 45, height: 45, borderRadius: 22, borderColor: colors.jcgray, borderWidth: 1, justifyContent:'center', alignItems:'center' }} >
                            <Icon name='user' color={colors.jcgray} size={30} solid />
                        </View>
            } 
            <View style={{ flexDirection: 'column', paddingLeft: 10, width: '70%' }}>
                <Text style={{ color: 'lightgrey', fontSize: 16, paddingBottom: 5 }}>{this.props.item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: colors.lightcolor1, fontWeight: 'bold' }}>LEVEL:</Text>
                        <Text style={{ color: 'white' }}> {this.props.item.level}</Text>
                    </View>                    
                </View>
            </View>
        </View>
			)
		}

}

export default LeaderBoardRow;
