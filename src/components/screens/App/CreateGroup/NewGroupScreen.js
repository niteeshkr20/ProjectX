import React from 'react'
import {
    View,
    Text
}
    from 'react-native'
import { connect } from 'react-redux'
class NewGroupScreen extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View>
                <Text>Provide Group Detail</Text>
            </View>
        )
    }
}

function mapStatetoProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(NewGroupScreen)