import React from 'react'
import styles from './Game.styles'
import { View, TouchableOpacity, Text } from 'react-native'
import Coin from '../../../svg_components/Coin';
import XP from '../../../svg_components/XP';

const TaskView = (props) => {
    return (
        <View style={styles.scrollBar}>
            <TouchableOpacity style={styles.scrollBarItem} onPress={() => {
                props.navigation.navigate("TaskDetail", { task: props.task })
            }}>
                
                <View style={styles.itemOne}>
                    <XP height="35" width="35" />
                    <Text style={styles.itemText}>{props.task.points}</Text>
                </View>
                <View style={styles.itemOne}>
                    <Coin height="25" width="25" />
                    <Text style={styles.itemText}>{props.task.coins}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default TaskView