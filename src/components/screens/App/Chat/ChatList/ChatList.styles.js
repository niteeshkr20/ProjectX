import { StyleSheet, PixelRatio } from 'react-native'

import colors from '../../../../shared_styles/colors'

export default styles = StyleSheet.create({
    mainConatiner: {
        flexDirection: "row",
        width: '100%',
        height: 64,
        borderBottomWidth: 1,
        borderColor: colors.darkcolor2,
        backgroundColor: colors.darkcolor1
    },
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: "center",
        backgroundColor: colors.darkcolor1
    },
    button: {
        height: 50,
        width: 250,
        alignItems: "center",
        marginRight: 40,
        marginLeft: 40,
        marginTop: 100,
        backgroundColor: colors.lightcolor1,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#00000000',
        overflow: 'hidden'
    },
    buttontext: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "600"
    },
    jewelStyle: {
       // margin: 10,
        // width: '100%',
        // height: '100%',
        // alignItems: 'center',
       // overflow: 'hidden'
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    chatBox: {
        height: 48,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderRadius: 24,
        marginTop: 8,
        marginRight: 8,
        borderWidth: StyleSheet.hairlineWidth,
        overflow: 'hidden'
    },
    marginstyle: {
        height: 64,
        width: 8,
        marginLeft: 4
    },
    name: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        padding: 4
    },
    msgText: {
        color: colors.jcgray,
        fontSize: 10,
        fontWeight: 'normal',
        padding: 4
    },
    itemLeftConatiner: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        height: '100%'
    },
    itemLeftSubContainer: {
        height: 64,
        marginTop: 8,
        marginLeft: 8,
        alignItems: 'center'
    },
    msgCreateTime: {
        color: colors.jcgray,
        fontSize: 10,
        fontWeight: 'normal',
        padding: 4
    },
    unreadCount: {
        minWidth: 22,
        minHeight: 22,
        backgroundColor: colors.lightcolor2,
        borderRadius: 11,
        padding: 4,
        borderWidth: 1,
        overflow: 'hidden',
        borderColor: colors.lightcolor2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    countText: {
        fontSize: 10,
        color: 'white'
    },
    marginStyleLeft: {
        height: 64,
        width: 8,
        marginLeft: 4
    },
    rootContainer: {
        backgroundColor: colors.darkcolor1,
        height: '100%',
        width: '100%'
    },
    subContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        height: '100%'
    },
    chatboxLeftContainer:{
        height: 64,
        marginTop: 8,
        marginLeft: 8
      }
})