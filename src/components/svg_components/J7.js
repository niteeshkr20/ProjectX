import React from "react";
import Svg, { Path, LinearGradient, Stop } from "react-native-svg";

const SvgComponent = props => (
  <Svg
    x="0px"
    y="0px"
    viewBox="0 0 1000 1000"
    xmlSpace="preserve"
    enableBackground="new 0 0 1000 1000"
    {...props}
  >
    <Path
      d="M502.1 929.1L177.5 501.6l1.1-1.5L502.1 70.9l320.4 430.7-320.4 427.5zM183.8 501.6l318.4 419.2 314.2-419.2L502.1 79.2 183.8 501.6z"
      fill="#4c4c4c"
    />
    <LinearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1={180.6196}
      y1={500}
      x2={819.3804}
      y2={500}
    >
      <Stop offset={0} stopColor="#8c8c8c" />
      <Stop offset={1} stopColor="#fff" />
    </LinearGradient>
    <Path
      d="M502.1 75L180.6 501.6 502.1 925 819.4 501.6z"
      fill="url(#a)"
      stroke="#000"
      strokeMiterlimit={10}
    />
    <LinearGradient
      id="b"
      gradientUnits="userSpaceOnUse"
      x1={417.6778}
      y1={353.0345}
      x2={357.3917}
      y2={306.0414}
    >
      <Stop offset={0} stopColor="#003a3a" />
      <Stop offset={0.1529} stopColor="#004949" />
      <Stop offset={0.4826} stopColor="#006364" />
      <Stop offset={0.7757} stopColor="#007374" />
      <Stop offset={1} stopColor="#00797a" />
    </LinearGradient>
    <Path d="M500.5 98.5L499.5 248.5 309.5 500.5 197.5 500.5z" fill="url(#b)" />
    <LinearGradient
      id="c"
      gradientUnits="userSpaceOnUse"
      x1={541.3036}
      y1={278.695}
      x2={730.1979}
      y2={353.2722}
    >
      <Stop offset={0} stopColor="#008687" />
      <Stop offset={0.4084} stopColor="#00a7a8" />
      <Stop offset={0.7688} stopColor="#00bdbe" />
      <Stop offset={1} stopColor="#00c5c6" />
    </LinearGradient>
    <Path d="M500.5 98.5L499.5 248.5 687.5 500.5 799.5 500.5z" fill="url(#c)" />
    <LinearGradient
      id="d"
      gradientUnits="userSpaceOnUse"
      x1={510.5974}
      y1={730.4229}
      x2={792.4326}
      y2={627.6174}
    >
      <Stop offset={0} stopColor="#008687" />
      <Stop offset={0.4084} stopColor="#00a7a8" />
      <Stop offset={0.7688} stopColor="#00bdbe" />
      <Stop offset={1} stopColor="#00c5c6" />
    </LinearGradient>
    <Path
      d="M687.5 500.5L499.5 752.5 500.5 899.5 799.5 500.5z"
      fill="url(#d)"
    />
    <LinearGradient
      id="e"
      gradientUnits="userSpaceOnUse"
      x1={255.4553}
      y1={786.3803}
      x2={439.7175}
      y2={616.2304}
    >
      <Stop offset={0} stopColor="#00797a" />
      <Stop offset={0.3201} stopColor="#007677" />
      <Stop offset={0.5414} stopColor="#006d6e" />
      <Stop offset={0.7328} stopColor="#005e5f" />
      <Stop offset={0.9063} stopColor="#004949" />
      <Stop offset={1} stopColor="#003a3a" />
    </LinearGradient>
    <Path
      d="M499.5 752.5L500.5 899.5 197.5 500.5 309.5 500.5z"
      fill="url(#e)"
    />
    <LinearGradient
      id="f"
      gradientUnits="userSpaceOnUse"
      x1={309.5}
      y1={500.3}
      x2={688}
      y2={500.3}
    >
      <Stop offset={0} stopColor="#003a3a" />
      <Stop offset={0.1251} stopColor="#005252" />
      <Stop offset={0.4126} stopColor="#008384" />
      <Stop offset={0.6646} stopColor="#00a7a8" />
      <Stop offset={0.869} stopColor="#00bdbe" />
      <Stop offset={1} stopColor="#00c5c6" />
    </LinearGradient>
    <Path d="M500 248.5L309.5 501.3 500 752.1 688 501.3z" fill="url(#f)" />
    <LinearGradient
      id="g"
      gradientUnits="userSpaceOnUse"
      x1={197.5}
      y1={499}
      x2={799.5}
      y2={499}
    >
      <Stop offset={0} stopColor="#00c5c6" />
      <Stop offset={0.2155} stopColor="#4ad6d6" />
      <Stop offset={0.4264} stopColor="#8ae4e5" />
      <Stop offset={0.6161} stopColor="#bdf0f0" />
      <Stop offset={0.781} stopColor="#e1f8f8" />
      <Stop offset={0.9145} stopColor="#f7fdfd" />
      <Stop offset={1} stopColor="#fff" />
    </LinearGradient>
    <Path
      d="M197.5 500.5l303 399 299-399-299-402-303 402zM500 748.8L312 501.3l188-249.5 185.5 249.5L500 748.8zm-1.5-644.3l-1 143.3-189 250.7h-107l297-394zm1 144l.2.3-189.9 252.1-.3-.4 190-252zm-298 254h107l189 250.7 1 140.3-297-391zM391.3 609l108.6 143-.4.5L391.3 609zm111.2 284.5l-1-140.4 187-250.7h107l-293 391.1zm185-392.9l-30-40.3 30 40.3zm-185-396.1l293.1 394h-107l-187-250.7.9-143.3z"
      fill="url(#g)"
    />
  </Svg>
);

export default SvgComponent;
