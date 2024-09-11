import { StyleSheet, PixelRatio } from 'react-native'
import colors from '../../../../shared_styles/colors'

//import color from '../../../../shared_styles/colors'

export default styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.darkcolor1
    },
    transferOptionContainer: {
        backgroundColor: colors.lightcolor2,
        width: PixelRatio.roundToNearestPixel(60*global.scaleFactor),
        height: PixelRatio.roundToNearestPixel(60*global.scaleFactor),
        margin:PixelRatio.roundToNearestPixel(2*global.moderateScaleFactor),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    transferOptionContainerDisabled: {
        backgroundColor: colors.darkcolor1,
        borderColor: colors.jcgray,
        borderWidth:1,
        width: PixelRatio.roundToNearestPixel(60*global.scaleFactor),
        height: PixelRatio.roundToNearestPixel(60*global.scaleFactor),
        margin:PixelRatio.roundToNearestPixel(2*global.moderateScaleFactor),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionText: {
        fontSize: PixelRatio.roundToNearestPixel(11*global.scaleFactor),
        color: 'white',
    },
    transferText: {
        color: 'white',
        fontSize: PixelRatio.roundToNearestPixel(15*global.scaleFactor)
    },
    scrollBar: {
        paddingVertical: PixelRatio.roundToNearestPixel(10*global.moderateScaleFactor),
        paddingLeft: PixelRatio.roundToNearestPixel(10*global.moderateScaleFactor)
    },
    scrollBarItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: PixelRatio.roundToNearestPixel(110*global.scaleFactor),
        width: PixelRatio.roundToNearestPixel(110*global.scaleFactor),
        borderRadius: PixelRatio.roundToNearestPixel(5*global.scaleFactor),
        backgroundColor: colors.darkcolor3,
        padding: PixelRatio.roundToNearestPixel(8*global.moderateScaleFactor)
    },
    itemText: {
        fontSize: 18*global.scaleFactor,
        color: 'white',
        fontWeight: '600'
    },
    addMoneyContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: PixelRatio.roundToNearestPixel(30*global.moderateScaleFactor)
    },
    addMoneyText: {
        paddingHorizontal: PixelRatio.roundToNearestPixel(30*global.moderateScaleFactor),
        color: 'white',
        fontWeight: 'bold'
    },
    MoneyText: {
        color: 'white',
        fontSize: PixelRatio.roundToNearestPixel(28*global.scaleFactor),
        fontWeight: 'bold'
    },
    transferMoneyContainer: {
        backgroundColor: colors.darkcolor3,
        padding: PixelRatio.roundToNearestPixel(10*global.moderateScaleFactor),
        flexDirection: 'row'
    },
    transferTextContainer: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10        
    },
    paymentOptionConatiner: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    diamondContainer: {
        paddingVertical: 3,
        backgroundColor: colors.darkcolor3,
        width: '100%',
        alignItems: 'center'
    },
    buyText: {
        color: 'grey',
        fontSize: PixelRatio.roundToNearestPixel(13*global.scaleFactor),
    },
    itemOne: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemTwo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    jewelStyle: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        overflow: 'hidden'
    }

})