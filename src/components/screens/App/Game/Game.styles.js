import { StyleSheet, PixelRatio } from 'react-native'

import color from '../../../shared_styles/colors'

export default styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor: color.darkcolor1,
    },
    scrollBar: {
        padding: PixelRatio.roundToNearestPixel(5 * global.moderateScaleFactor)
    },
    scrollBarItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems:'center',
        height: PixelRatio.roundToNearestPixel(90 * global.scaleFactor),
        width: PixelRatio.roundToNearestPixel(90 * global.scaleFactor),
        borderRadius: PixelRatio.roundToNearestPixel(10 * global.scaleFactor),
        borderWidth: 2,
        borderColor: color.lightcolor1,
        backgroundColor: color.darkcolor1,
        padding: PixelRatio.roundToNearestPixel(10 * global.moderateScaleFactor)
    },
    itemText: {
        fontSize: 11 * global.scaleFactor,
        color: color.jcgray,
        fontWeight: '600',
        paddingLeft:5
    },
    itemOne: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemTwo: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    }
})