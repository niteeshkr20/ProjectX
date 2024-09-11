import { StyleSheet, PixelRatio } from 'react-native'

import color from '../../../shared_styles/colors'
import colors from '../../../shared_styles/colors'
export default styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: color.darkcolor1
    },
    profileSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: color.darkcolor3,
        height: PixelRatio.roundToNearestPixel(70 * global.scaleFactor),
    },
    firstDiamond: {
        justifyContent: "center",
        alignItems: 'center',
        flexDirection:'row',
        backgroundColor: color.darkcolor2,
        width: '30%',
        borderTopRightRadius: PixelRatio.roundToNearestPixel(35 * global.scaleFactor),
        borderBottomRightRadius: PixelRatio.roundToNearestPixel(35 * global.scaleFactor)
    },
    mainLeftLayout: {
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        paddingLeft: PixelRatio.roundToNearestPixel(10 * global.moderateScaleFactor)
    },
    DiamondImage: {
        height: PixelRatio.roundToNearestPixel(25 * global.scaleFactor),
        width: PixelRatio.roundToNearestPixel(20 * global.scaleFactor)
    },
    profilePictureBorder: {
        borderWidth:2,
        borderColor: 'white',
        borderRadius: PixelRatio.roundToNearestPixel(102 * global.scaleFactor),
        width: PixelRatio.roundToNearestPixel(102 * global.scaleFactor),
        height: PixelRatio.roundToNearestPixel(102 * global.scaleFactor),
        top:-15,
        backgroundColor: color.darkcolor1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    ProfilePicture: {
        width: PixelRatio.roundToNearestPixel(99 * global.scaleFactor),
        height: PixelRatio.roundToNearestPixel(99 * global.scaleFactor),
        borderRadius: PixelRatio.roundToNearestPixel(99 * global.scaleFactor),
    },
    SecondDiamond: {
        justifyContent: "center",
        alignItems: 'center',
        flexDirection:'row',
        backgroundColor: color.darkcolor2,
        width: '30%',
        borderTopLeftRadius: PixelRatio.roundToNearestPixel(35 * global.scaleFactor),
        borderBottomLeftRadius: PixelRatio.roundToNearestPixel(35 * global.scaleFactor)
    },
    mainRightLayout: {
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        paddingRight: PixelRatio.roundToNearestPixel(10 * global.moderateScaleFactor)
    },
    scrollBar: {
        padding: PixelRatio.roundToNearestPixel(5 * global.moderateScaleFactor),
        paddingTop: PixelRatio.roundToNearestPixel(20 * global.moderateScaleFactor)
    },
    scrollBarItem: {
        height: PixelRatio.roundToNearestPixel(80 * global.scaleFactor),
        width: PixelRatio.roundToNearestPixel(80 * global.scaleFactor),
        borderRadius: PixelRatio.roundToNearestPixel(5 * global.scaleFactor),
        backgroundColor: color.lightcolor2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemImage: {
        height: PixelRatio.roundToNearestPixel(35*global.scaleFactor),
        width: PixelRatio.roundToNearestPixel(30*global.scaleFactor)
    },
    itemText: {
        fontSize: PixelRatio.roundToNearestPixel(10*global.scaleFactor),
        color: 'white',
        paddingTop: PixelRatio.roundToNearestPixel(10*global.moderateScaleFactor)
    },
    diamondContainer: {
        paddingVertical: PixelRatio.roundToNearestPixel(3*global.moderateScaleFactor),
        backgroundColor: color.darkcolor3,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buyText: {
        color: 'grey',
        fontSize: PixelRatio.roundToNearestPixel(13*global.scaleFactor)
    },
    jewelStyle: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        overflow: 'hidden'
    }
})