import { StyleSheet, PixelRatio } from 'react-native'

import color from '../../../../shared_styles/colors'

export default styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor: color.darkcolor1
    },
    activityIndicatorWrapper: {
        position: 'absolute',
        top: '40%',
        paddingHorizontal: '4%',
        backgroundColor: color.lightcolor1,
        //opacity: 0.8,
        height: PixelRatio.roundToNearestPixel(100 * global.scaleFactor),
        minWidth: PixelRatio.roundToNearestPixel(95 * global.scaleFactor),
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: PixelRatio.roundToNearestPixel(15 * global.moderateScaleFactor),
        flex: 1,
    },
    activityIndicator: {
        paddingTop: '15%',
    },
    loadingText: {
        color: 'white',
        fontSize: PixelRatio.roundToNearestPixel(17 * global.scaleFactor),
        flexWrap: 'wrap',
        alignSelf: 'center',
        paddingTop: '1%',
        paddingBottom: '2%',
    },
   
    scrollBarItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems:'center',
        height: PixelRatio.roundToNearestPixel(100 * global.scaleFactor),
        width: PixelRatio.roundToNearestPixel(100 * global.scaleFactor),
        borderRadius: PixelRatio.roundToNearestPixel(10 * global.scaleFactor),
        borderWidth: 2,
        borderColor: color.lightcolor1,
        backgroundColor: color.darkcolor1,
        padding: PixelRatio.roundToNearestPixel(10 * global.moderateScaleFactor)
    },
    itemText: {
        fontSize: 13 * global.scaleFactor,
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
    },
    CollectText:{
        fontSize: 11 * global.scaleFactor,
        color: color.darkcolor3,
        fontWeight: 'bold',
        padding:8        
    },
    jewelStyle: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        overflow: 'hidden'
    }
})