import { StyleSheet, PixelRatio } from 'react-native'


import colors from '../../../shared_styles/colors'

export default styles = StyleSheet.create({
    rootContainer: {
        backgroundColor: colors.darkcolor1,
        height: '100%',
        width: '100%'
    },
    mainConatiner: {
        flexDirection: "row",
        width: '100%',
        height: 64,
        borderBottomWidth: 1,
        borderColor: colors.darkcolor2,
        backgroundColor: colors.darkcolor1
    },
    subContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        height: '100%'
    },
    marginstyle: {
        height: 64,
        width: 8,
        marginLeft: 4
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
        borderColor: colors.jcgray,
        borderRadius: 24,
        marginTop: 8,
        marginRight: 8,
        borderWidth: 1,
        overflow: 'hidden'
    },
    jewelStyle: {
        margin: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        overflow: 'hidden'
    },
    itemLeftConatiner: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        height: '100%'
    },
    itemLeftSubContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent:'center'
    },
    marginStyleLeft: {
        height: 64,
        width: 8,
        marginLeft: 4
    },
    name: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        paddingTop: 2
    },
    msgText: {
        color: colors.jcgray,
        fontSize: 10,
        fontWeight: 'normal',
        paddingTop: 2
    },
    chatboxLeftContainer:{
        height: 64,
        marginTop: 8,
        marginLeft: 8
      },
    inviteText:{
        color: 'white',
        fontSize: 14,
        fontWeight: '600'
    },

    invitedText:{
        color: colors.jcgray,
        opacity: 0.3,
        fontSize: 14,
        fontWeight: '600'
    }
})