import React from "react";
import {
    View,
    Text,
    ImageBackground
} from "react-native";

import { connect } from 'react-redux';
import colors from "../../shared_styles/colors";
import styles from './CustomHeader.styles'
import XP from '../../svg_components/XP';


class LevelPointsBar extends React.PureComponent {
    render() {
        return (

            <View style={styles.levelProgressContainer}>
                <View style={styles.levelCount}>
                    <ImageBackground source={require('../../../assets/ColorGrad.jpg')} style={styles.imageBackground}>
                        <Text style={styles.count}>{this.props.scores.level < 9 ? 'Level ' + this.props.scores.level : this.props.scores.level}</Text>
                    </ImageBackground>
                </View>
                <View style={styles.barContainer}>
                    <View style={styles.xpStyle}>
                        <XP height="100%" />
                    </View>
                    <View style={styles.progressBarOuterContainer}>
                        <View style={styles.progressBarInnerContainer}>
                            <View style={{ width: (this.props.scores.points * 100) / this.props.scores.max_level_points + '%', height: '100%' }}>
                                <ImageBackground source={require('../../../assets/ColorGrad.jpg')} style={styles.progressBackground}></ImageBackground>
                            </View>
                        </View>
                        <View style={styles.levelData}>
                            <Text style={styles.levelDataText}>{this.props.scores.points < 9 ? '00' + this.props.scores.points : this.props.scores.points}/{this.props.scores.max_level_points}</Text>
                        </View>

                    </View>
                    <View style={styles.xpStyle}>
                        <XP height="100%" />
                    </View>
                </View>
            </View>

        );

    }

}


function mapStateToProps(state) {

    return {
        scores: state.game.scores
    }
}




export default connect(mapStateToProps)(LevelPointsBar);


