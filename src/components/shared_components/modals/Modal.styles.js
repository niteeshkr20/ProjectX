import { StyleSheet, PixelRatio } from 'react-native'

import colors from '../../shared_styles/colors'
export default styles = StyleSheet.create({
    inputStyle: {
        height: PixelRatio.roundToNearestPixel(40 * global.scaleFactor),
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        color:'white',
        fontSize: PixelRatio.roundToNearestPixel(14 * global.scaleFactor),
    },
    labelStyle: {
        fontSize: PixelRatio.roundToNearestPixel(20 * global.scaleFactor),
        color: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        letterSpacing: PixelRatio.roundToNearestPixel(0.1 * global.scaleFactor),
        lineHeight: PixelRatio.roundToNearestPixel(22 * global.scaleFactor),
    },
    TextInputContainer: {
        backgroundColor: colors.darkcolor2,
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: PixelRatio.roundToNearestPixel(20 * global.moderateScaleFactor),
        paddingVertical: PixelRatio.roundToNearestPixel(10 * global.moderateScaleFactor)
    },
    formelementstyle5:{
        backgroundColor: colors.darkcolor2,
        paddingTop: PixelRatio.roundToNearestPixel(30 * global.moderateScaleFactor),
        height: PixelRatio.roundToNearestPixel(80 * global.scaleFactor),
        paddingHorizontal: PixelRatio.roundToNearestPixel(20 * global.moderateScaleFactor),
    },
    mainbtnctr:{
        flexDirection:'row',
        justifyContent:'space-between',
    },

    buttonContainer2: {
        justifyContent: 'center',
        alignItems: 'center',
        width:'48%',
        margin: PixelRatio.roundToNearestPixel(5 * global.moderateScaleFactor),
        borderRadius:5,
        backgroundColor: colors.lightBlue,
        height: PixelRatio.roundToNearestPixel(40 * global.scaleFactor),
    },
    btnTextStyle: {
        fontSize: PixelRatio.roundToNearestPixel(14 * global.scaleFactor),
        color:'white',
        letterSpacing: PixelRatio.roundToNearestPixel(1.27 * global.scaleFactor)
    },
    jewelStyle: {
        marginHorizontal: 10,
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        overflow: 'hidden'
    }
})