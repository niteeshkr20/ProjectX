import React from "react";
import Svg, { G, LinearGradient, Stop, Ellipse, Path } from "react-native-svg";

const SvgComponent = props => (
  <Svg
    id="Layer_1"
    x="0px"
    y="0px"
    viewBox="0 0 1000 1000"
    xmlSpace="preserve"
    enableBackground="new 0 0 1000 1000"
    {...props}
  >
    <G id="Layer_8">
      <LinearGradient
        id="SVGID_1_"
        gradientUnits="userSpaceOnUse"
        x1={898.4253}
        y1={-277.3849}
        x2={790.2544}
        y2={-283.2305}
        gradientTransform="matrix(1 0 0 -1 0 202)"
      >
        <Stop offset={0} stopColor="#f9ed32" />
        <Stop offset={0.27} stopColor="#fae330" />
        <Stop offset={0.73} stopColor="#fcca29" />
        <Stop offset={1} stopColor="#fdb724" />
      </LinearGradient>
      <LinearGradient
        id="SVGID_2_"
        gradientUnits="userSpaceOnUse"
        x1={165.8202}
        y1={-297.9047}
        x2={871.5955}
        y2={-297.9047}
        gradientTransform="matrix(1 0 0 -1 0 202)"
      >
        <Stop offset={0.3} stopColor="#ffc421" />
        <Stop offset={1} stopColor="#f99f28" />
        <Stop offset={1} stopColor="#f5d435" />
      </LinearGradient>
      <Ellipse
        cx={518.7}
        cy={499.9}
        rx={352.4}
        ry={399.7}
        fill="url(#SVGID_1_)"
        stroke="url(#SVGID_2_)"
        strokeMiterlimit={10}
      />
      <Ellipse cx={481.3} cy={500.1} rx={352.4} ry={399.7} fill="#f9ed32" />
      <LinearGradient
        id="SVGID_3_"
        gradientUnits="userSpaceOnUse"
        x1={180.0367}
        y1={-312.6391}
        x2={332.4614}
        y2={-304.8902}
        gradientTransform="matrix(1 0 0 -1 0 202)"
      >
        <Stop offset={0} stopColor="#ffd11d" />
        <Stop offset={1} stopColor="#f9ed32" />
      </LinearGradient>
      <Ellipse
        cx={466.1}
        cy={500.1}
        rx={297}
        ry={336.9}
        fill="url(#SVGID_3_)"
      />
      <LinearGradient
        id="SVGID_4_"
        gradientUnits="userSpaceOnUse"
        x1={196.1755}
        y1={-297.9048}
        x2={790.1423}
        y2={-297.9048}
        gradientTransform="matrix(1 0 0 -1 0 202)"
      >
        <Stop offset={0} stopColor="#f9ed32" />
        <Stop offset={0.07} stopColor="#faea30" />
        <Stop offset={0.61} stopColor="#fed822" />
        <Stop offset={1} stopColor="#ffd11d" />
      </LinearGradient>
      <Ellipse
        cx={493.2}
        cy={499.9}
        rx={297}
        ry={336.9}
        fill="url(#SVGID_4_)"
      />
      <LinearGradient
        id="SVGID_5_"
        gradientUnits="userSpaceOnUse"
        x1={322.4531}
        y1={74.045}
        x2={658.2604}
        y2={74.045}
        gradientTransform="scale(1 -1) rotate(-4.531 -6465.397 -62.074)"
      >
        <Stop offset={0} stopColor="#ffc421" />
        <Stop offset={0.66} stopColor="#f99f28" />
        <Stop offset={1} stopColor="#f5d435" />
      </LinearGradient>
      <Path
        d="M587.8 645.5L483.5 586.9 395.2 637.3 379.5 646.3 398.6 520.4 314.5 431.4 430.6 412.3 482.5 297.8 535.2 411.9 651.4 430.1 567.9 519.8z"
        fill="url(#SVGID_5_)"
        stroke="#f15a29"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
    </G>
  </Svg>
);

export default SvgComponent;
