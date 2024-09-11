import { StyleSheet, PixelRatio } from 'react-native'
import colors from '../../../shared_styles/colors'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: "center",
        backgroundColor: colors.darkcolor1
    },
    button: {
        alignItems: "center",
        marginRight: 40,
        marginLeft: 40,
        marginTop: 40,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: colors.lightcolor2,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: colors.lightcolor2
    },
    buttontext: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "600"
    },
    jewelStyle: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        overflow: 'hidden'
    }
});