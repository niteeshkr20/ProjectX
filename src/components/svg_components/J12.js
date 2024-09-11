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
      d="M500 896.8L917.3 593.7 757.9 103.2 242.1 103.2 82.7 593.7z"
      fill="#fff"
    />
    <Path
      d="M757.9 103.2l159.4 490.5L500 896.8 82.7 593.7l159.4-490.5h515.8m5.8-8H236.3l-1.8 5.5L75.1 591.2l-1.8 5.5 4.7 3.4 417.3 303.2 4.7 3.4 4.7-3.4L922 600.2l4.7-3.4-1.8-5.5-159.4-490.6-1.8-5.5z"
      fill="gray"
    />
    <LinearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1={82.7407}
      y1={500}
      x2={917.2593}
      y2={500}
    >
      <Stop offset={0} stopColor="#ccc" />
      <Stop offset={1} stopColor="#fff" />
    </LinearGradient>
    <Path
      d="M500 896.8L917.3 593.7 757.9 103.2 242.1 103.2 82.7 593.7z"
      fill="url(#a)"
    />
    <G>
      <LinearGradient
        id="b"
        gradientUnits="userSpaceOnUse"
        x1={274.9046}
        y1={460.1101}
        x2={785.0954}
        y2={460.1101}
      >
        <Stop offset={0} stopColor="#1a9af5" />
        <Stop offset={0.1796} stopColor="#39a7f5" />
        <Stop offset={0.3906} stopColor="#56b3f5" />
        <Stop offset={0.6} stopColor="#6bbcf5" />
        <Stop offset={0.8048} stopColor="#78c1f5" />
        <Stop offset={1} stopColor="#7cc3f5" />
      </LinearGradient>
      <Path
        d="M530 702.7L785.1 517.4 687.7 217.5 372.3 217.5 274.9 517.4z"
        fill="url(#b)"
        stroke="#3fa9f5"
        strokeMiterlimit={10}
      />
      <LinearGradient
        id="c"
        gradientUnits="userSpaceOnUse"
        x1={159.884}
        y1={348.7321}
        x2={308.8627}
        y2={400.447}
      >
        <Stop offset={0} stopColor="#7cc3f5" />
        <Stop offset={1} stopColor="#1a9af5" />
      </LinearGradient>
      <Path
        d="M252.5 119.5L372.5 217.5 274.5 517.5 100.5 589.5z"
        fill="url(#c)"
        stroke="#3fa9f5"
        strokeMiterlimit={10}
      />
      <LinearGradient
        id="d"
        gradientUnits="userSpaceOnUse"
        x1={252.5}
        y1={168.5}
        x2={747.5}
        y2={168.5}
      >
        <Stop offset={0} stopColor="#7cc3f5" />
        <Stop offset={1} stopColor="#1a9af5" />
      </LinearGradient>
      <Path
        d="M252.5 119.5L372.5 217.5 687.5 217.5 747.5 119.5z"
        fill="url(#d)"
        stroke="#3fa9f5"
        strokeMiterlimit={10}
      />
      <LinearGradient
        id="e"
        gradientUnits="userSpaceOnUse"
        x1={687.5}
        y1={354.5}
        x2={900.5}
        y2={354.5}
      >
        <Stop offset={0} stopColor="#3fa9f5" />
        <Stop offset={1} stopColor="#badcf5" />
      </LinearGradient>
      <Path
        d="M687.5 217.5L785.5 517.5 900.5 589.5 747.5 119.5z"
        fill="url(#e)"
        stroke="#3fa9f5"
        strokeMiterlimit={10}
      />
      <LinearGradient
        id="f"
        gradientUnits="userSpaceOnUse"
        x1={500.5}
        y1={699}
        x2={900.5}
        y2={699}
      >
        <Stop offset={0} stopColor="#3fa9f5" />
        <Stop offset={1} stopColor="#badcf5" />
      </LinearGradient>
      <Path
        d="M785.5 517.5L529.5 702.5 500.5 880.5 900.5 589.5z"
        fill="url(#f)"
        stroke="#3fa9f5"
        strokeMiterlimit={10}
      />
      <LinearGradient
        id="g"
        gradientUnits="userSpaceOnUse"
        x1={306.8657}
        y1={728.4816}
        x2={401.1071}
        y2={631.9794}
      >
        <Stop offset={0} stopColor="#7cc3f5" />
        <Stop offset={1} stopColor="#1a9af5" />
      </LinearGradient>
      <Path
        d="M530.5 702.5L274.5 517.5 100.5 589.5 500.5 880.5z"
        fill="url(#g)"
        stroke="#3fa9f5"
        strokeMiterlimit={10}
      />
    </G>
    <G opacity={0.45}>
      <Path
        d="M501.9 881.4l398.7-290 2.6 1.7-.9-2.9.9-.7-1.4-.9-152.7-468.9 1-1.7h-1.6l-.7-2.1-1.3 2.1H253l-1.3-1.1-.3 1.1h-3.1l2.5 2-62.4 193.1-89.6 275.5-1.4.6.9.7-.2.6.3.2-.5 1.5 1.6-.7 399.1 290-.4 2.4 2.1-1.5 1.1.8.5-1.8zm203.7-696.3L686.7 216H373l-116.3-94.9h488l-39.1 64zm81.2 331.4l-68.3-209.2-29.2-89.8 29.1-47.5 28.6-46.7 150.2 462.2-110.4-69zM373.6 219h312.8l29 88.9 67.9 208.9-104.5 76L530 700.3 381.2 592.8l-104.6-76 67.8-208.6 29.2-89.2zm-99.3 300.2l105 75.9L527.9 703l-28.5 174.8-395.9-288 170.8-70.6zM680.8 595l104.8-75.7 111.2 69.6 1.1.7-395.2 287 29.2-173.5L680.8 595zM253.5 122.2l117.1 95.7-29.1 89.4-68.3 209-35.9 14.8-134.5 55.6L191 313.9l62.5-191.7z"
        fill="#fff"
      />
    </G>
    <G opacity={0.3}>
      <G display="none">
        <Path
          d="M500 880.4L900 589.8 747.2 119.6 252.8 119.6 100 589.8z"
          display="inline"
          fill="#fff"
        />
      </G>
      <LinearGradient
        id="h"
        gradientUnits="userSpaceOnUse"
        x1={242.9046}
        y1={503.1101}
        x2={753.0954}
        y2={503.1101}
      >
        <Stop offset={0} stopColor="#1a9af5" />
        <Stop offset={0.1796} stopColor="#39a7f5" />
        <Stop offset={0.3906} stopColor="#56b3f5" />
        <Stop offset={0.6} stopColor="#6bbcf5" />
        <Stop offset={0.8048} stopColor="#78c1f5" />
        <Stop offset={1} stopColor="#7cc3f5" />
      </LinearGradient>
      <Path
        d="M498 745.7L753.1 560.4 655.7 260.5 340.3 260.5 242.9 560.4z"
        fill="url(#h)"
      />
      <LinearGradient
        id="i"
        gradientUnits="userSpaceOnUse"
        x1={162.076}
        y1={348.1459}
        x2={295.7994}
        y2={394.5652}
      >
        <Stop offset={0} stopColor="#7cc3f5" />
        <Stop offset={1} stopColor="#1a9af5" />
      </LinearGradient>
      <Path d="M253.5 118.5L342 260 244 560 101.5 588.5z" fill="url(#i)" />
      <LinearGradient
        id="j"
        gradientUnits="userSpaceOnUse"
        x1={252.5}
        y1={190.25}
        x2={747.5}
        y2={190.25}
      >
        <Stop offset={0} stopColor="#7cc3f5" />
        <Stop offset={1} stopColor="#1a9af5" />
      </LinearGradient>
      <Path d="M252.5 119.5L341 261 656 261 747.5 119.5z" fill="url(#j)" />
      <LinearGradient
        id="k"
        gradientUnits="userSpaceOnUse"
        x1={656}
        y1={354.5}
        x2={900.5}
        y2={354.5}
      >
        <Stop offset={0} stopColor="#3fa9f5" />
        <Stop offset={1} stopColor="#badcf5" />
      </LinearGradient>
      <Path d="M656 261L752 560 900.5 589.5 747.5 119.5z" fill="url(#k)" />
      <G>
        <LinearGradient
          id="l"
          gradientUnits="userSpaceOnUse"
          x1={498}
          y1={720.25}
          x2={900.5}
          y2={720.25}
        >
          <Stop offset={0} stopColor="#3fa9f5" />
          <Stop offset={1} stopColor="#badcf5" />
        </LinearGradient>
        <Path d="M753 560L498 746 500.5 880.5 900.5 589.5z" fill="url(#l)" />
      </G>
      <G>
        <LinearGradient
          id="m"
          gradientUnits="userSpaceOnUse"
          x1={299.2013}
          y1={736.3298}
          x2={370.3408}
          y2={663.4838}
        >
          <Stop offset={0} stopColor="#7cc3f5" />
          <Stop offset={1} stopColor="#1a9af5" />
        </LinearGradient>
        <Path d="M498 746L244 560 100.5 589.5 500.5 880.5z" fill="url(#m)" />
      </G>
      <G>
        <Path
          d="M704.8 266.7L684.6 223.3 638.1 234.5 681.4 214.3 670.3 167.8 690.5 211.1 737 200 693.7 220.2z"
          fill="#fff"
        />
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
