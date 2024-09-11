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
      d="M598 71.4l158.5 163.7L817.1 500l-60.6 264.9L598 928.6H402L243.5 764.9 182.9 500l60.6-264.9L402 71.4h196m0-5H402c-1.4 0-2.6.5-3.6 1.5L239.9 231.6c-.6.7-1.1 1.5-1.3 2.4L178 498.9c-.2.7-.2 1.5 0 2.2L238.6 766c.2.9.6 1.7 1.3 2.4l158.5 163.7c.9 1 2.2 1.5 3.6 1.5h196c1.4 0 2.6-.5 3.6-1.5l158.5-163.7c.6-.7 1.1-1.5 1.3-2.4L822 501.1c.2-.7.2-1.5 0-2.2L761.4 234c-.2-.9-.6-1.7-1.3-2.4L601.6 67.9c-1-1-2.3-1.5-3.6-1.5z"
      fill="gray"
    />
    <LinearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1={182.912}
      y1={500}
      x2={817.088}
      y2={500}
    >
      <Stop offset={0} stopColor="#ccc" />
      <Stop offset={0.2742} stopColor="#dbdbdb" />
      <Stop offset={0.6892} stopColor="#ececec" />
      <Stop offset={1} stopColor="#f2f2f2" />
    </LinearGradient>
    <Path
      d="M598 71.4L402 71.4 243.5 235.1 182.9 500 243.5 764.9 402 928.6 598 928.6 756.5 764.9 817.1 500 756.5 235.1z"
      fill="url(#a)"
    />
    <G>
      <LinearGradient
        id="b"
        gradientUnits="userSpaceOnUse"
        x1={353.4975}
        y1={500.4278}
        x2={644.4975}
        y2={500.4278}
      >
        <Stop offset={0} stopColor="#bdb319" />
        <Stop offset={0.2277} stopColor="#d5c91c" />
        <Stop offset={0.5454} stopColor="#fcee21" />
        <Stop offset={1} stopColor="#fcf69f" />
      </LinearGradient>
      <Path
        d="M544 303.7L454 303.7 381.3 378.9 353.5 500.4 381.3 622 454 697.1 544 697.1 616.7 622 644.5 500.4 616.7 378.9z"
        fill="url(#b)"
      />
      <LinearGradient
        id="c"
        gradientUnits="userSpaceOnUse"
        x1={498.4348}
        y1={295.8971}
        x2={499.8864}
        y2={110.9028}
      >
        <Stop offset={0} stopColor="#bdb319" />
        <Stop offset={0.1335} stopColor="#cac024" />
        <Stop offset={0.4752} stopColor="#e6db3a" />
        <Stop offset={0.7755} stopColor="#f7ec48" />
        <Stop offset={1} stopColor="#fdf14d" />
      </LinearGradient>
      <Path
        d="M407.5 96.7L454.5 303.7 543.5 303.7 592.5 96.7z"
        fill="url(#c)"
      />
      <LinearGradient
        id="d"
        gradientUnits="userSpaceOnUse"
        x1={310.0824}
        y1={156.7367}
        x2={451.498}
        y2={292.4482}
      >
        <Stop offset={0} stopColor="#fcee21" />
        <Stop offset={0.278} stopColor="#efe21f" />
        <Stop offset={0.7909} stopColor="#cdc21b" />
        <Stop offset={1} stopColor="#bdb319" />
      </LinearGradient>
      <Path
        d="M454.5 303.7L381.5 378.7 258.5 250.7 407.5 96.7z"
        fill="url(#d)"
      />
      <LinearGradient
        id="e"
        gradientUnits="userSpaceOnUse"
        x1={204.1226}
        y1={373.7836}
        x2={383.6067}
        y2={387.4023}
      >
        <Stop offset={0} stopColor="#fcee21" />
        <Stop offset={0.2627} stopColor="#f0e320" />
        <Stop offset={0.7313} stopColor="#d2c61c" />
        <Stop offset={1} stopColor="#bdb319" />
      </LinearGradient>
      <Path
        d="M381.5 378.7L353.5 500.7 201.5 500.7 258.5 250.7z"
        fill="url(#e)"
      />
      <LinearGradient
        id="f"
        gradientUnits="userSpaceOnUse"
        x1={202.1251}
        y1={626.2347}
        x2={377.6165}
        y2={620.0154}
      >
        <Stop offset={0} stopColor="#fcee21" />
        <Stop offset={0.2332} stopColor="#f4e620" />
        <Stop offset={0.6025} stopColor="#ddd11d" />
        <Stop offset={1} stopColor="#bdb319" />
      </LinearGradient>
      <Path
        d="M353.5 500.7L381.5 621.7 258.5 749.7 201.5 500.7z"
        fill="url(#f)"
      />
      <LinearGradient
        id="g"
        gradientUnits="userSpaceOnUse"
        x1={322.9156}
        y1={840.8049}
        x2={437.1418}
        y2={681.5304}
      >
        <Stop offset={0} stopColor="#fcee21" />
        <Stop offset={0.236} stopColor="#f7ea20" />
        <Stop offset={0.5052} stopColor="#eadd1f" />
        <Stop offset={0.7897} stopColor="#d3c71c" />
        <Stop offset={1} stopColor="#bdb319" />
      </LinearGradient>
      <Path
        d="M381.5 621.7L454.5 696.7 407.5 903.7 258.5 749.7z"
        fill="url(#g)"
      />
      <G>
        <LinearGradient
          id="h"
          gradientUnits="userSpaceOnUse"
          x1={499.9802}
          y1={906.2153}
          x2={501.4015}
          y2={703.6037}
        >
          <Stop offset={0} stopColor="#fcee21" />
          <Stop offset={0.362} stopColor="#faec21" />
          <Stop offset={0.5737} stopColor="#f1e420" />
          <Stop offset={0.7467} stopColor="#e3d71e" />
          <Stop offset={0.8979} stopColor="#cfc41b" />
          <Stop offset={1} stopColor="#bdb319" />
        </LinearGradient>
        <Path
          d="M454.5 696.7L543.5 696.7 592.5 903.7 407.5 903.7z"
          fill="url(#h)"
        />
      </G>
      <G>
        <LinearGradient
          id="i"
          gradientUnits="userSpaceOnUse"
          x1={556.8027}
          y1={752.2421}
          x2={721.827}
          y2={788.5888}
        >
          <Stop offset={0} stopColor="#bdb319" />
          <Stop offset={0.1045} stopColor="#cbc129" />
          <Stop offset={0.2996} stopColor="#e1d741" />
          <Stop offset={0.5061} stopColor="#f0e653" />
          <Stop offset={0.7294} stopColor="#f9ef5d" />
          <Stop offset={1} stopColor="#fcf260" />
        </LinearGradient>
        <Path
          d="M543.5 696.7L616.5 621.7 741.5 749.7 592.5 903.7z"
          fill="url(#i)"
        />
      </G>
      <G>
        <LinearGradient
          id="j"
          gradientUnits="userSpaceOnUse"
          x1={650.3604}
          y1={576.2907}
          x2={819.0491}
          y2={644.6141}
        >
          <Stop offset={0} stopColor="#bdb319" />
          <Stop offset={0.1318} stopColor="#d2c831" />
          <Stop offset={0.2895} stopColor="#e5db46" />
          <Stop offset={0.4663} stopColor="#f2e855" />
          <Stop offset={0.6756} stopColor="#faf05d" />
          <Stop offset={1} stopColor="#fcf260" />
        </LinearGradient>
        <Path
          d="M616.5 621.7L741.5 749.7 798.5 499.7 644.5 500.7z"
          fill="url(#j)"
        />
      </G>
      <G>
        <LinearGradient
          id="k"
          gradientUnits="userSpaceOnUse"
          x1={624.8053}
          y1={351.9451}
          x2={796.6389}
          y2={411.9219}
        >
          <Stop offset={0} stopColor="#bdb319" />
          <Stop offset={0.2244} stopColor="#d3c931" />
          <Stop offset={0.5201} stopColor="#e9df4b" />
          <Stop offset={0.7876} stopColor="#f7ed5b" />
          <Stop offset={1} stopColor="#fcf260" />
        </LinearGradient>
        <Path
          d="M644.5 500.7L798.5 499.7 741.5 250.7 616.5 378.7z"
          fill="url(#k)"
        />
      </G>
      <G>
        <LinearGradient
          id="l"
          gradientUnits="userSpaceOnUse"
          x1={543.4975}
          y1={237.7469}
          x2={741.4975}
          y2={237.7469}
        >
          <Stop offset={0} stopColor="#bdb319" />
          <Stop offset={0.1161} stopColor="#cec42c" />
          <Stop offset={0.299} stopColor="#e2d843" />
          <Stop offset={0.4959} stopColor="#f1e753" />
          <Stop offset={0.7148} stopColor="#f9ef5d" />
          <Stop offset={1} stopColor="#fcf260" />
        </LinearGradient>
        <Path
          d="M616.5 378.7L741.5 250.7 592.5 96.7 543.5 303.7z"
          fill="url(#l)"
        />
      </G>
    </G>
    <G>
      <LinearGradient
        id="m"
        gradientUnits="userSpaceOnUse"
        x1={201.4975}
        y1={500.2469}
        x2={798.4975}
        y2={500.2469}
      >
        <Stop offset={0} stopColor="#fcf260" />
        <Stop offset={0.1282} stopColor="#fcf36c" />
        <Stop offset={0.4721} stopColor="#fcf588" />
        <Stop offset={0.7742} stopColor="#fcf699" />
        <Stop offset={1} stopColor="#fcf69f" />
      </LinearGradient>
      <Path
        d="M592.5 96.7h-185l-149 154-57 250 57 249 149 154h185l149-154 57-250-57-249-149-154zm23.3 524.8l-72.3 74.6h-89.1l-72.3-74.6-27.7-121.1 27.7-121.1 72.3-74.6h89.1l72.3 74.6 27.7 121.1-27.7 121.1zM593 98.8l147.1 152-123.6 126.5-71.9-73.9L593 98.8zm-1.8-1.1l-48.5 205h-87.4l-46.5-205h182.4zm-184.3 1.1l46.5 204.7-71.9 73.9-121.6-126.7 147-151.9zm-147.8 154l121.3 126.3-27.7 120.7H202.8l56.3-247zm94.4 247.8l6 26.2-6-26v-.2zm-150.7 1.1h150l27.7 119.7-121.4 126.3-56.3-246zm204.1 400l-147-152 121.6-126.6 71.9 73.9-46.5 204.7zm1.9 1l46.5-205h87.4l48.5 205H408.8zm184.2-1L544.5 697l71.9-73.9L740 749.7l-147 152zm147.9-154L617.6 621.4l27.7-119.7 151.9-1-56.3 247zM638.5 526.8l6-26.2v.2l-6 26zm158.7-28l-152 1-27.7-120.7 123.3-126.3 56.4 246z"
        fill="url(#m)"
      />
    </G>
  </Svg>
);

export default SvgComponent;
