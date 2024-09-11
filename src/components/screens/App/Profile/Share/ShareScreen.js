import React from "react";
import {
    SafeAreaView,    
    View,
    Text,
		TouchableOpacity,
		FlatList
} from "react-native";
import styles from '../LeaderBoard/LeaderBoard.styles'

import { connect } from 'react-redux';
import LeaderBoardRow from "../LeaderBoard/LeaderBoardRow";
import colors from "../../../../shared_styles/colors";
import { renderJewel } from "../../../../JCUtils/CommonUtils";
import CustomLoader from "../../../../shared_components/CustomLoader";
import NetworkManager from "../../../../../network/NetworkManager";
import rest from "../../../../../network/rest";

class ShareScreen extends React.Component {
    constructor(props) {
        super(props)  
        this.state = {					
					processedlist: [],
					networkloading: false
				}      

				this.page = 0;
				this.invitees = 0;
				this.children = []
    }

    componentDidMount() {

			this.setState({	networkloading: true	})
			this.getChildren();		
			//this.processReferrals()	
		}

		componentDidUpdate(prevProps, prevState) {
			// console.log('SHARE SCREEN STATE')
			// console.log(this.props)			
		}

		getChildren(){			

			let data = {
        page: this.page
      }

			NetworkManager.callAPI(rest.getChildren, 'POST', data).then(result => {

				if(this.page == 0){
					console.log('Invitees', result.invitees)
					this.invitees = result.invitees
					if(result.children.length > 0)						
						this.children = this.children.concat(result.children)
					if(result.children.length == 100){
						this.page++
						this.getChildren()
					}else{
						this.setState({	processedlist: this.children, networkloading: false	})
						this.processReferrals()	
					}

				}else if(this.page > 0){
					if(result.children.length > 0)
					this.children = this.children.concat(result.children)
					if(result.children.length == 100){
						this.page++
						this.getChildren()
					}else{
						this.setState({	processedlist: this.children, networkloading: false	})
						this.processReferrals()	
					}
				}

				
				
			}).catch(error => { 
				this.setState({	networkloading: false	})
			})


		}



		processReferrals(){
			console.log('Processed List')
			//console.log(this.state.processedlist)	
			let t = {
				1: { total_count: 0},
				2: { total_count: 0},
				18: { total_count: 0},
				19: { total_count: 0},
				20: { total_count: 0},
				21: { total_count: 0},
				22: { total_count: 0},
				23: { total_count: 0},
				24: { total_count: 0},
				25: { total_count: 0},
				26: { total_count: 0},
				27: { total_count: 0},
				28: { total_count: 0},
				29: { total_count: 0},
				30: { total_count: 0},
				31: { total_count: 0},
				32: { total_count: 0}
			};

			t['1'].total_count = this.invitees;
			t['2'].total_count = this.state.processedlist.length;

			for(let i=0; i< this.state.processedlist.length; i++){
				if(this.state.processedlist[i].level >= 5)
					t['18'].total_count++;
				if(this.state.processedlist[i].level >= 10)
					t['19'].total_count++;
				if(this.state.processedlist[i].level >= 15)
					t['20'].total_count++;
				if(this.state.processedlist[i].level >= 20)
					t['21'].total_count++;
				if(this.state.processedlist[i].level >= 25)
					t['22'].total_count++;
				if(this.state.processedlist[i].level >= 30)
					t['23'].total_count++;
				if(this.state.processedlist[i].level >= 35)
					t['24'].total_count++;
				if(this.state.processedlist[i].level >= 40)
					t['25'].total_count++;
				if(this.state.processedlist[i].level >= 45)
					t['26'].total_count++;
				if(this.state.processedlist[i].level >= 50)
					t['27'].total_count++;
				if(this.state.processedlist[i].level >= 55)
					t['28'].total_count++;
				if(this.state.processedlist[i].level >= 60)
					t['29'].total_count++;
				if(this.state.processedlist[i].level >= 65)
					t['30'].total_count++;				
				if(this.state.processedlist[i].level >= 70)
					t['31'].total_count++;
				if(this.state.processedlist[i].level >= 75)
					t['32'].total_count++;
					
				console.log('Insideloop')	
			}
			console.log(this.state.processedlist)	
			console.log(t)	
			this.props.setReferralAchievement({type:'UPDATE_REFERRAL_ACHIEVEMENTS', payload: t})


		}
		


    render() {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <CustomLoader loading={this.state.networkloading} />
                <FlatList                    
                    data={this.state.processedlist}                    
                    renderItem={({ item, index }) =>
                        <LeaderBoardRow type={'other'} item={item} />
                    }                    
                    keyExtractor={(item, index) => item.id+''}
                />
                { this.state.processedlist.length == 0 && !this.state.networkloading &&                     
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: '400', color: colors.jcgray }}>Not referred any one yet.</Text>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('Contacts')
                        }} style={{ flexDirection: 'row', padding: 10, marginTop: 10, borderRadius: 5, backgroundColor: colors.lightcolor2 }}>
                            <Text style={{ fontSize: 20, fontWeight: '500', color: 'white', justifyContent: 'center' }}>Refer and Win </Text>
                            {renderJewel(0, 25, 25, styles.jewelStyle)}
                        </TouchableOpacity>
                    </View>
                }

            </SafeAreaView >
        );
    }
}

function mapStateToProps(state) {
    return {
        referralAchievement: state.referralAchievement
    };
}


function mapDispatchToProps(dispatch) {
    return {
        setReferralAchievement: (referralAchievement) => dispatch(referralAchievement)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShareScreen);
