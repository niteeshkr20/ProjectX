import colors from "../../../shared_styles/colors";
import {

    StyleSheet,

} from 'react-native';
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
export default styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: colors.darkcolor2
    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.darkcolor1,
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT
    },
    backgroundImage: {
        //  position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        borderRadius: 100,
        width: HEADER_MAX_HEIGHT,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',

    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: 40,
        justifyContent: 'center',
        position: 'absolute'
    },
    name: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500'
    },
    statusMessage: {
        fontSize: 14,
        color: 'white',
        fontWeight: '400'
    },
    ContactNumber: {
        fontSize: 12,
        color: 'lightgray',
    },
    number: {
        fontSize: 14,
        color: 'lightgray',
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    status: {
        color: 'white',
        fontSize: 16
    },
    scrollViewContent: {
        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
        backgroundColor: colors.darkcolor1
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: 'green',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    contact: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowText: {
        fontSize: 14,
        fontWeight: '400',
        color: 'white'
    }
});
