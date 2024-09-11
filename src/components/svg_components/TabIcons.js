import React from 'react';
import Svg, { G, Path } from 'react-native-svg'
import PropTypes from 'prop-types';

// import SvgIcon from 'react-native-svg-icon';


// Each nameValuePair can be:
// * Name: <Svg />; or
// * Name: { svg: <Svg />, viewBox: '0 0 50 50' }

const svgicons = {
    Chats: {
        svg: <Path
        d="M722.22 277.78C722.22 124.31 560.59 0 361.11 0S0 124.31 0 277.78c0 59.55 24.48 114.41 66 159.72-23.26 52.43-61.63 94.1-62.15 94.62a13.79 13.79 0 0 0-2.6 15.1 13.58 13.58 0 0 0 12.67 8.34c63.54 0 116.14-21.36 154-43.4 55.9 27.25 122.05 43.4 193.23 43.4 199.44 0 361.07-124.31 361.07-277.78zM934 659.72c41.49-45.13 66-100.17 66-159.72 0-116.14-92.88-215.62-224.48-257.12a258.44 258.44 0 0 1 2.26 34.9c0 183.85-187 333.33-416.67 333.33a520.26 520.26 0 0 1-55-3.3c54.68 99.83 183.16 170 332.81 170 71.18 0 137.33-16 193.23-43.4 37.85 22 90.45 43.4 154 43.4a13.68 13.68 0 0 0 12.67-8.33 13.91 13.91 0 0 0-2.6-15.11c-.56-.59-38.93-42.04-62.22-94.65z"
        />,
        viewBox: '0 -80 1000 920',
    },
    Gifts: {
        svg: <Path
        d="M604.17 749.53v-461H395.83v461q0 16.1 11.72 24.79T437.5 783h125q18.22 0 30-8.7t11.67-24.77zM307.29 206.06h127l-82-103.68q-16.92-19.95-44.92-20-26 0-44.27 18t-18.23 43.79Q244.79 170 263 188t44.29 18.06zm447.92-61.82q0-25.76-18.23-43.79t-44.27-18q-28 0-44.92 20l-81.38 103.61h126.3q26 0 44.27-18t18.23-43.82zM1000 309.09v206.05a19.92 19.92 0 0 1-5.86 14.86q-5.86 5.81-15 5.8h-62.5v267.82q0 25.75-18.23 43.79t-44.27 18H145.83q-26 0-44.27-18t-18.23-43.79V535.75h-62.5q-9.1 0-15-5.8A19.92 19.92 0 0 1 0 515.14v-206a19.92 19.92 0 0 1 5.86-14.81q5.86-5.8 15-5.8h286.43q-60.54 0-103.19-42.18t-42.64-102.11q0-59.88 42.64-102.06T307.29 0Q377 0 416.67 49.58L500 155.83l83.33-106.25Q623.05 0 692.71 0q60.54 0 103.19 42.18t42.64 102.06q0 59.88-42.64 102.06t-103.19 42.18h286.46q9.11 0 15 5.8a19.92 19.92 0 0 1 5.83 14.81z"
        />,
        viewBox: '0 -80 1000 920',
    },
    Profile: {
        svg: <Path
        d="M432 0C193.35 0 0 193.35 0 432s193.35 432 432 432 432-193.35 432-432S670.65 0 432 0zm0 167.23a153.29 153.29 0 1 1-153.29 153.29A153.29 153.29 0 0 1 432 167.23zm0 599.22c-102.25 0-193.88-46.33-255.19-118.8 32.74-61.65 96.85-104.17 171.58-104.17a42.52 42.52 0 0 1 12.36 1.92c22.65 7.32 46.34 12 71.25 12s48.77-4.7 71.25-12a42.52 42.52 0 0 1 12.36-1.92c74.73 0 138.84 42.51 171.58 104.17-61.31 72.47-152.94 118.8-255.19 118.8z"
        />,
        viewBox: '0 -80 1000 920',
    },
    NineOne: {
        svg: <G fill="#5887F9">
        <Path d="M14.05 52.29H2.44v-6.57h11.61v-11.7h6.57v11.7h11.61v6.57H20.62v11.55h-6.57V52.29zM67.8 45.51c0 8.64-1.82 15.09-5.46 19.35-3.64 4.26-9.15 6.39-16.53 6.39-2.6 0-4.57-.14-5.91-.42v-7.44c1.68.42 3.44.63 5.28.63 3.1 0 5.65-.46 7.65-1.37 2-.91 3.53-2.34 4.59-4.29 1.06-1.95 1.67-4.63 1.83-8.05h-.35c-1.16 1.88-2.5 3.2-4.02 3.96-1.52.76-3.42 1.14-5.7 1.14-3.82 0-6.83-1.22-9.03-3.67-2.2-2.45-3.3-5.85-3.3-10.21 0-4.7 1.33-8.41 4-11.14 2.67-2.73 6.3-4.09 10.9-4.09 3.24 0 6.07.76 8.5 2.28 2.43 1.52 4.29 3.72 5.6 6.61 1.3 2.87 1.95 6.32 1.95 10.32zM51.94 33.72c-1.92 0-3.42.66-4.5 1.98-1.08 1.32-1.62 3.22-1.62 5.7 0 2.12.49 3.8 1.47 5.04.98 1.24 2.47 1.86 4.47 1.86 1.88 0 3.49-.62 4.83-1.84 1.34-1.23 2.01-2.64 2.01-4.24 0-2.38-.62-4.39-1.88-6.03-1.25-1.65-2.84-2.47-4.78-2.47zM95.31 70.64h-9.27V45.27l.09-4.17.15-4.56c-1.54 1.54-2.61 2.55-3.21 3.03l-5.04 4.05-4.47-5.58 14.13-11.25h7.62v43.85z" />
            </G>,
        viewBox: '0 0 100 100',
    }
}


const Icon = (props) => {
    return (<SvgIcon {...props} svgs={svgicons} />);
}

export default Icon;

const SvgIcon = props => {
    if (!props.name) {
        return null;
    }

    const name = props.svgs[`${props.name}.${Platform.OS}`] || props.svgs[props.name];

    if (!name) {
        return null;
    }

    const height = props.height && props.height.toString();
    const width = props.width && props.width.toString();
    const strokeWidth = props.strokeWidth && props.strokeWidth.toString();

    const isSimple = React.isValidElement(name);
    const svgEl = isSimple ? name : name.svg;

    let viewBox;

    if (props.viewBox && props.viewBox !== SvgIcon.defaultProps.viewBox) {
        viewBox = props.viewBox;
    } else if (!isSimple && name.viewBox) {
        viewBox = name.viewBox;
    } else if (props.defaultViewBox) {
        viewBox = props.defaultViewBox;
    } else {
        viewBox = SvgIcon.defaultProps.viewBox;
    }

    return React.createElement(
        Svg,
        { height: height, width: width, viewBox: viewBox, style: props.style },
        React.cloneElement(svgEl, {
            fill: props.fill,
            fillRule: props.fillRule,
            stroke: props.stroke,
            strokeWidth: strokeWidth
        })
    );
};

// SvgIcon.defaultProps = {
//     fill: '#000',
//     fillRule: 'evenodd',
//     height: '44',
//     width: '44',
//     viewBox: '0 0 100 100'
// };

SvgIcon.propTypes = {
    fill: PropTypes.string.isRequired,
    fillRule: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    svgs: PropTypes.object.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    viewBox: PropTypes.string
};