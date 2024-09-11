import React from "react";
import Svg, { Path, LinearGradient, Stop, G } from "react-native-svg";

const SvgComponent = props => (
  <Svg
    x="0px"
    y="0px"
    viewBox="0 0 1000 1000"
    enableBackground="new 0 0 1000 1000"
    {...props}
  >
    <Path
      d="M499.4 77.8l265.2 211.3-.6 423-264.5 210-264-209.9.8-424.1L499.4 77.8m0-5c-1.1 0-2.2.4-3.1 1.1L233.1 284.3c-1.2.9-1.9 2.4-1.9 3.9l-.8 424.1c0 1.5.7 3 1.9 3.9l264 209.9c.9.7 2 1.1 3.1 1.1s2.2-.4 3.1-1.1l264.5-210c1.2-.9 1.9-2.4 1.9-3.9l.6-423c0-1.5-.7-3-1.9-3.9L502.5 73.9c-.9-.7-2-1.1-3.1-1.1z"
      fill="#7f7f7f"
    />
    <LinearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1={235.4123}
      y1={500}
      x2={764.5877}
      y2={500}
    >
      <Stop offset={0} stopColor="#aaa" />
      <Stop offset={1} stopColor="#fff" />
    </LinearGradient>
    <Path
      d="M499.4 77.8L236.3 288.2 235.4 712.2 499.4 922.2 764 712.1 764.6 289.1z"
      fill="url(#a)"
    />
    <G>
      <LinearGradient
        id="b"
        gradientUnits="userSpaceOnUse"
        x1={357.5}
        y1={501}
        x2={639.4}
        y2={501}
      >
        <Stop offset={0} stopColor="#ac7511" />
        <Stop offset={0.1144} stopColor="#c58614" />
        <Stop offset={0.2481} stopColor="#dc9616" />
        <Stop offset={0.3318} stopColor="#e59c17" />
        <Stop offset={0.4243} stopColor="#e5a228" />
        <Stop offset={0.6072} stopColor="#e5b154" />
        <Stop offset={0.8605} stopColor="#e5ca9a" />
        <Stop offset={1} stopColor="#e5d9c3" />
      </LinearGradient>
      <Path
        d="M498.5 275.1L357.5 388.9 358.5 614.7 498.5 726.9 639.4 613.1 639.3 388.3z"
        fill="url(#b)"
      />
      <LinearGradient
        id="c"
        gradientUnits="userSpaceOnUse"
        x1={549.9232}
        y1={246.132}
        x2={693.252}
        y2={237.066}
      >
        <Stop offset={0} stopColor="#e59c17" />
        <Stop offset={0.8689} stopColor="#e5d1ac" />
        <Stop offset={1} stopColor="#e5d9c3" />
      </LinearGradient>
      <Path
        d="M499.5 101.5L498.5 275.1 639.3 388.3 749.5 300.7z"
        fill="url(#c)"
      />
      <LinearGradient
        id="d"
        gradientUnits="userSpaceOnUse"
        x1={639.3}
        y1={500.1}
        x2={749.5}
        y2={500.1}
      >
        <Stop offset={0} stopColor="#e5b050" />
        <Stop offset={1} stopColor="#e5d9c3" />
      </LinearGradient>
      <Path
        d="M639.3 388.3L639.4 613.1 748.9 699.5 749.5 300.7z"
        fill="url(#d)"
      />
      <LinearGradient
        id="e"
        gradientUnits="userSpaceOnUse"
        x1={505.9043}
        y1={769.6443}
        x2={750.1586}
        y2={714.5082}
      >
        <Stop offset={0} stopColor="#e59c17" />
        <Stop offset={0.8689} stopColor="#e5d1ac" />
        <Stop offset={1} stopColor="#e5d9c3" />
      </LinearGradient>
      <Path
        d="M639.4 613.1L498.5 726.9 499.5 897.5 748.9 699.5z"
        fill="url(#e)"
      />
      <G>
        <LinearGradient
          id="f"
          gradientUnits="userSpaceOnUse"
          x1={450.6388}
          y1={719.3831}
          x2={371.3077}
          y2={802.4694}
        >
          <Stop offset={0} stopColor="#ac7511" />
          <Stop offset={1} stopColor="#e59c17" />
        </LinearGradient>
        <Path
          d="M498.5 726.9L499.5 897.5 250.6 699.6 358.5 614.7z"
          fill="url(#f)"
        />
      </G>
      <G>
        <LinearGradient
          id="g"
          gradientUnits="userSpaceOnUse"
          x1={250.6}
          y1={499.7}
          x2={358.5}
          y2={499.7}
        >
          <Stop offset={0} stopColor="#e59c17" />
          <Stop offset={1} stopColor="#ac7511" />
        </LinearGradient>
        <Path
          d="M358.5 614.7L250.6 699.6 251.4 299.8 357.5 388.9z"
          fill="url(#g)"
        />
      </G>
      <G>
        <LinearGradient
          id="h"
          gradientUnits="userSpaceOnUse"
          x1={359.0588}
          y1={183.3489}
          x2={449.4579}
          y2={278.7664}
        >
          <Stop offset={0} stopColor="#e59c17" />
          <Stop offset={1} stopColor="#ac7511" />
        </LinearGradient>
        <Path
          d="M357.5 388.9L498.5 275.1 499.5 101.5 251.4 299.8z"
          fill="url(#h)"
        />
      </G>
    </G>
    <G>
      <LinearGradient
        id="i"
        gradientUnits="userSpaceOnUse"
        x1={250.6}
        y1={499.5}
        x2={749.5}
        y2={499.5}
      >
        <Stop offset={0} stopColor="#e5b050" />
        <Stop offset={0.3028} stopColor="#e5c07d" />
        <Stop offset={0.6056} stopColor="#e5cea3" />
        <Stop offset={0.8484} stopColor="#e5d6ba" />
        <Stop offset={1} stopColor="#e5d9c3" />
      </LinearGradient>
      <Path
        d="M251.4 299.8l-.8 399.8 248.9 197.9 249.4-198-109.5-86.4-140.9 113.8 140.9-113.8-.1-224.8.1 224.8 109.5 86.4.6-398.8-250-199.2-248.1 198.3zm388 315.9l106.3 83.8-244.2 193.9-1-165.5 138.9-112.2zm107.5 79.7l-105.5-83.2-.1-222.9 106.2-84.4-.6 390.5zM497.5 105.7l-1 168.5-139 112.2-103-86.5 243-194.2zm-141 508l-103.9 81.7.8-391.4 102.1 85.8 1 223.9zm-102.7 85.9l104.7-82.4 138 110.6 1 165.5-243.7-193.7zm244.7 24.7l-138-110.6-1-223.9 139-112.2 138.8 111.6.1 222.9-138.9 112.2zm3-618.7l244.8 195.1-107 85-138.8-111.6 1-168.5z"
        fill="url(#i)"
      />
    </G>
  </Svg>
);

export default SvgComponent;
