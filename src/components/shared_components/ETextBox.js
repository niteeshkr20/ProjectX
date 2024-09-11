import React from 'react';
import {
    TextInput
} from 'react-native';


export default class ETextBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 200, height: 24, borderColor: 'white', borderWidth: 1
        }
    }

    updateSize = (height) => {
        console.log(height);
        if(height>100 )
            height = 100; 
        if(height<24)
            height = 24;      
        this.setState({
            height
        });
    }

    render() {


        return (
            <TextInput
                placeholder="Your Placeholder"
                //onChangeText={(value) => this.setState({value})}
                style={this.state}
                editable={true}
                multiline={true}
                //value={value}
                onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
            />
        )
    }

}