import { StyleSheet, PixelRatio } from 'react-native'

import colors from '../../../../shared_styles/colors'
export default styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.darkcolor3
    },
    subContainer: {
        flex: 1,
        flexDirection: 'column-reverse',
        justifyContent: 'flex-end',
        backgroundColor: colors.darkcolor3,
    },
    chatroom: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: colors.darkcolor1,
        overflow: 'scroll',
        paddingLeft: 8,
        paddingRight: 8
    },
    
    chatItemContainer: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 8
    },
    mainBarConatiner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 6,
        marginBottom: 6,
        alignItems: 'center'
    },
    firstItemMainBar: {
        height: 24,
        width: 24,
        // backgroundColor: 'black',
        marginLeft: 8,
        marginRight: 4
    },
    secondItem: {
        height: 24,
        width: 24,
        // backgroundColor: 'red',
        marginLeft: 4,
        marginRight: 4
    },
    thirdItem: {
        height: 24,
        width: 24,
     //   backgroundColor: 'red',
        marginLeft: 4,
        marginRight: 8
    },
    fourthItem: {
      //  backgroundColor: 'blue',
        marginLeft: 4,
        marginRight: 8
    },
    MsgRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10
    },    
    MsgContainer: {
        flex: 1,
        flexDirection: 'column'        
    },

    sectionheaderdate: {
        marginTop: 10,
        marginBottom: 10,
        paddingVertical:3,
        paddingHorizontal:7,
        borderRadius:4,        
        color: 'white',
        backgroundColor: colors.darkcolor3,
        alignSelf: 'center'
    },

    chatbox: {
        flex:1,
        flexDirection: 'column',             
        maxWidth: 250,
        minWidth: 100,
        paddingHorizontal: 3,
        paddingVertical:2,  
        borderRadius: 5,      
        
    },

    mychatbox: {        
        alignSelf: 'flex-end',
        backgroundColor: colors.lightcolor2 
    },

    friendschatbox: {        
        alignSelf: 'flex-start',
        backgroundColor: 'white'
    },

    mychatboxBottomStrip:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end'        
    },

    friendschatboxBottomStrip:{
        flex:1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'        
    },

    myMsgContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        flexDirection: 'column',
        maxWidth: 250
    },
    jewelContainer: {
        justifyContent: 'center',        
        width: 40,
        height: 40
    },
    collectingJewel:{
        width: 20,
        height: 20
    },
    jewelStyle: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        overflow: 'hidden'
    },
    
    friendMsgText: {
        padding: 5,
        color: 'black'
    },
    friendMsgTextContainer:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#4287f5',
        backgroundColor: '#4287f5',
        borderRadius: 5
    },
    myMsgText: {
        padding: 5,
        color: 'white'
    },
    myMsgTextConatiner:{
        backgroundColor: colors.lightcolor2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.lightcolor2,
        borderRadius: 5
    },
    msgTime: {
        alignSelf: 'flex-end',
        color: colors.jcgray,
        fontSize: 10,
        paddingRight: 5
    },
    groupMsgSender: {
        color: 'black',
        fontSize: 12,
        fontWeight: '700',
        marginRight:20,
        paddingTop:7,
        paddingLeft: 5
    }
})