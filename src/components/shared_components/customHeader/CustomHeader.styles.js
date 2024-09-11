import { StyleSheet, PixelRatio } from 'react-native'

import colors from '../../shared_styles/colors'
export default styles = StyleSheet.create({
    mainContainer: {
        height: 105,
        width: "100%",
        flexDirection: "column",
        backgroundColor: colors.darkcolor1
    },
    subContainer: {
        flexDirection: "row",
        height: 80,
        width: "100%",
        paddingTop: 36,
        borderBottomWidth: 1,
        borderColor: colors.darkcolor2
    },
    headerLeft: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'center',
        height: '100%'
    },
    levelProgressContainer: {
        height: 25,
        width: "100%",
        borderBottomWidth: 1,
        borderColor: colors.darkcolor2,
        flexDirection: "row"
    },
    headerRight: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: 'center',
        height: '100%'
    },
    levelCount: {
        height: 16,
        width: 56,
        backgroundColor: colors.lightcolor1,
        marginTop: 4,
        marginLeft: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#00000000',
        borderRadius: 3,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'

    },
    imageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    count: {
        fontSize: 10,
        color: 'white'
    },
    jewelBox: {
        height: 32,
        width: 32,
        marginLeft: 8,
        marginRight: 8
    },
    profilepic:{
        height: 32,
        width: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderRadius: 16,
        marginLeft: 8,
        marginRight: 8,
        borderWidth: StyleSheet.hairlineWidth,
        overflow: 'hidden'
    },
    barContainer: {
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        marginLeft: 8,
        marginRight: 8
    },
    xpStyle: {
        height: '100%',
        width: '10%',
        padding: 2
    },
    progressBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    progressBarInnerContainer: {
        position: 'absolute',
        width: '98%',
        height: 5,
        zIndex: 1,
        backgroundColor: colors.darkcolor3,
        borderColor: colors.darkcolor3,
        borderRadius: 3,
        borderWidth: StyleSheet.hairlineWidth,
        overflow: 'hidden'
    },
    progressBarOuterContainer: {
        height: '100%',
        width: '80%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    levelData: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 2,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    levelDataText: {
        color: 'white',
        fontWeight: '500',
        fontStyle: 'italic',
        fontSize: 16
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
})