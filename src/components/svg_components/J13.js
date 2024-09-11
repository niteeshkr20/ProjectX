import React from "react";
import Svg, { Path, G, LinearGradient, Stop } from "react-native-svg";

const SvgComponent = props => (
  <Svg
    x="0px"
    y="0px"
    viewBox="0 0 1000 1000"
    enableBackground="new 0 0 1000 1000"
    {...props}
  >
    <Path
      d="M372.1 652.6l49.2-151.7v-.3l-50.2-153.7 128.4-93.6 130.4 93.6L580 499.3v.3l49.9 152.9-128.4 93.6-129.4-93.5z"
      fill="#fff"
    />
    <Path d="M499.5 254l129.8 93.2-49.8 152c-.1.2-.1.4 0 .6l49.8 152.6-127.8 93.1-128.8-93.1 49.1-151.3c.1-.2.1-.4 0-.6l-50.1-153.3L499.5 254m0-1.3l-129 94 50.3 154-49.3 152 130 94 129-94-50-153.3 50-152.7-131-94z" />
    <Path
      d="M499.9 73l338.9 164.3-129.2 265.2L840 767.7 502.2 933 163.3 767.7l128.1-265.2L161 237.3 499.9 73m0-5c-.7 0-1.5.2-2.2.5L158.8 232.8c-1.2.6-2.1 1.6-2.5 2.9-.4 1.3-.3 2.6.2 3.8l129.3 263-127 263c-1.2 2.5-.2 5.5 2.3 6.7L500 937.5c.7.3 1.4.5 2.2.5.8 0 1.5-.2 2.2-.5l337.8-165.3c1.2-.6 2.1-1.6 2.5-2.9.4-1.3.3-2.6-.2-3.8l-129.3-263 128.2-263c.6-1.2.7-2.6.2-3.8-.4-1.3-1.3-2.3-2.5-2.9l-339-164.3c-.7-.3-1.4-.5-2.2-.5z"
      fill="#666"
    />
    <G>
      <LinearGradient
        id="a"
        gradientUnits="userSpaceOnUse"
        x1={161}
        y1={503}
        x2={840}
        y2={503}
      >
        <Stop offset={0} stopColor="#ccc" />
        <Stop offset={0.3722} stopColor="#e6e6e6" />
        <Stop offset={0.7405} stopColor="#f8f8f8" />
        <Stop offset={1} stopColor="#fff" />
      </LinearGradient>
      <Path
        d="M499.9 73L161 237.3 291.4 502.5 163.3 767.7 502.2 933 840 767.7 709.6 502.5 838.9 237.3z"
        fill="url(#a)"
      />
    </G>
    <G>
      <LinearGradient
        id="b"
        gradientUnits="userSpaceOnUse"
        x1={369.5}
        y1={499.7469}
        x2={629.5}
        y2={499.7469}
      >
        <Stop offset={0} stopColor="#000" />
        <Stop offset={0.1386} stopColor="#000027" />
        <Stop offset={0.355} stopColor="#00005c" />
        <Stop offset={0.5569} stopColor="#000087" />
        <Stop offset={0.7379} stopColor="#0000a6" />
        <Stop offset={0.8918} stopColor="#0000b8" />
        <Stop offset={1} stopColor="#0000bf" />
      </LinearGradient>
      <Path
        d="M498.5 252.7L369.5 346.7 419.8 500.7 370.5 652.7 500.5 746.7 629.5 652.7 579.5 499.5 629.5 346.7z"
        fill="url(#b)"
      />
      <LinearGradient
        id="c"
        gradientUnits="userSpaceOnUse"
        x1={350.4517}
        y1={176.7881}
        x2={448.8342}
        y2={294.655}
      >
        <Stop offset={0} stopColor="#0000bf" />
        <Stop offset={0.1082} stopColor="#0000b8" />
        <Stop offset={0.2621} stopColor="#0000a6" />
        <Stop offset={0.4431} stopColor="#000087" />
        <Stop offset={0.645} stopColor="#00005c" />
        <Stop offset={0.8614} stopColor="#000027" />
        <Stop offset={1} stopColor="#000" />
      </LinearGradient>
      <Path
        d="M499.5 99.7L499.5 252.7 370.5 346.7 200.5 252.7z"
        fill="url(#c)"
      />
      <LinearGradient
        id="d"
        gradientUnits="userSpaceOnUse"
        x1={680.3295}
        y1={182.1878}
        x2={511.3909}
        y2={242.3326}
      >
        <Stop offset={0} stopColor="#33f" />
        <Stop offset={0.3505} stopColor="#3131fc" />
        <Stop offset={0.5637} stopColor="#2a2af4" />
        <Stop offset={0.7401} stopColor="#1f1fe6" />
        <Stop offset={0.8955} stopColor="#0f0fd1" />
        <Stop offset={1} stopColor="#0000bf" />
      </LinearGradient>
      <Path
        d="M499.5 99.7L499.5 252.7 630.5 346.7 798.5 252.7z"
        fill="url(#d)"
      />
      <LinearGradient
        id="e"
        gradientUnits="userSpaceOnUse"
        x1={612.483}
        y1={376.2469}
        x2={755.4832}
        y2={376.2469}
      >
        <Stop offset={0} stopColor="#0000bf" />
        <Stop offset={0.1045} stopColor="#0f0fd1" />
        <Stop offset={0.2599} stopColor="#1f1fe6" />
        <Stop offset={0.4363} stopColor="#2a2af4" />
        <Stop offset={0.6495} stopColor="#3131fc" />
        <Stop offset={1} stopColor="#33f" />
      </LinearGradient>
      <Path
        d="M630.5 346.7L580.5 499.7 684.5 499.7 798.5 252.7z"
        fill="url(#e)"
      />
      <LinearGradient
        id="f"
        gradientUnits="userSpaceOnUse"
        x1={580.5}
        y1={623.2469}
        x2={799.5}
        y2={623.2469}
      >
        <Stop offset={0} stopColor="#0000bf" />
        <Stop offset={0.05906266} stopColor="#0707c7" />
        <Stop offset={0.2673} stopColor="#1a1ae0" />
        <Stop offset={0.4863} stopColor="#2828f1" />
        <Stop offset={0.7212} stopColor="#3030fc" />
        <Stop offset={1} stopColor="#33f" />
      </LinearGradient>
      <Path
        d="M684.5 499.7L799.5 746.7 630.5 652.7 580.5 499.7z"
        fill="url(#f)"
      />
      <G>
        <LinearGradient
          id="g"
          gradientUnits="userSpaceOnUse"
          x1={520.4013}
          y1={741.3906}
          x2={772.192}
          y2={900.7815}
        >
          <Stop offset={0} stopColor="#0000bf" />
          <Stop offset={0.1059} stopColor="#0f0fd2" />
          <Stop offset={0.2581} stopColor="#1f1fe6" />
          <Stop offset={0.4318} stopColor="#2a2af4" />
          <Stop offset={0.6433} stopColor="#3131fc" />
          <Stop offset={1} stopColor="#33f" />
        </LinearGradient>
        <Path
          d="M799.5 746.7L501.5 900.7 501.5 746.7 630.5 652.7z"
          fill="url(#g)"
        />
      </G>
      <G>
        <LinearGradient
          id="h"
          gradientUnits="userSpaceOnUse"
          x1={451.9016}
          y1={754.1361}
          x2={206.5823}
          y2={925.073}
        >
          <Stop offset={0} stopColor="#000040" />
          <Stop offset={0.06470549} stopColor="#000058" />
          <Stop offset={0.1677} stopColor="#000078" />
          <Stop offset={0.28} stopColor="#000092" />
          <Stop offset={0.4032} stopColor="#0000a6" />
          <Stop offset={0.543} stopColor="#0000b4" />
          <Stop offset={0.7132} stopColor="#0000bc" />
          <Stop offset={1} stopColor="#0000bf" />
        </LinearGradient>
        <Path
          d="M501.5 746.7L501.5 900.7 202.5 746.7 370.5 652.7z"
          fill="url(#h)"
        />
      </G>
      <G>
        <LinearGradient
          id="i"
          gradientUnits="userSpaceOnUse"
          x1={202.5}
          y1={623.2469}
          x2={420.5}
          y2={623.2469}
        >
          <Stop offset={0} stopColor="navy" />
          <Stop offset={0.2405} stopColor="#00007c" />
          <Stop offset={0.4991} stopColor="#00006f" />
          <Stop offset={0.7652} stopColor="#000059" />
          <Stop offset={1} stopColor="#000040" />
        </LinearGradient>
        <Path
          d="M202.5 746.7L370.5 652.7 420.5 500.7 315.5 499.7z"
          fill="url(#i)"
        />
      </G>
      <G>
        <LinearGradient
          id="j"
          gradientUnits="userSpaceOnUse"
          x1={204.4672}
          y1={360.2794}
          x2={415.2888}
          y2={423.1624}
        >
          <Stop offset={0} stopColor="navy" />
          <Stop offset={0.3797} stopColor="#00007e" />
          <Stop offset={0.5855} stopColor="#000076" />
          <Stop offset={0.7496} stopColor="#000068" />
          <Stop offset={0.8909} stopColor="#005" />
          <Stop offset={1} stopColor="#000040" />
        </LinearGradient>
        <Path
          d="M420.5 500.7L370.5 346.7 200.5 252.7 315.5 499.7z"
          fill="url(#j)"
        />
      </G>
    </G>
    <G>
      <Path
        d="M498.5 254l129.8 93.2-49.8 152c-.1.2-.1.4 0 .6l49.8 152.6-127.8 93.1-128.8-93.1 49.1-151.3c.1-.2.1-.4 0-.6l-50.1-153.3L498.5 254m0-1.3l-129 94 50.3 154-49.3 152 130 94 129-94-50-153.3 50-152.7-131-94z"
        fill="#fff"
      />
      <Path
        d="M498.5 101.4v150.9l-128.1 93.3-167.8-92.8 295.9-151.4m1-1.7l-299 153 170 94 129-94v-153z"
        fill="#fff"
      />
      <Path
        d="M500.5 101.4l295.9 151.4-165.8 92.8-130.1-93.3V101.4m-1-1.7v153l131 94 168-94-299-153zM796.3 255.1L683.9 498.7h-102l49.5-151.3 164.9-92.3m2.2-2.4zm0 0l-168 94-50 153h104l114-247zM683.9 500.7l113.4 243.6-166-92.3-49.4-151.3h102m.6-1h-104l50 153 169 94-115-247z"
        fill="#fff"
      />
      <Path
        d="M630.6 653.9l166.8 92.8-294.9 152.4V747.3l128.1-93.4m-.1-1.2l-129 94v154l298-154-169-94zM370.4 653.9l130.1 93.3V899L204.6 746.7l165.8-92.8m.1-1.2l-168 94 299 154v-154l-131-94zM316.1 500.8l103 1-49.5 150.3-165 92.3 111.5-243.6m-.6-1.1l-113 247 168-94 50-152-105-1z"
        fill="#fff"
      />
      <Path
        d="M202.7 255.1l167 92.3 49.4 152.3-103-1-113.4-243.6m-2.2-2.4l115 247 105 1-50-154-170-94z"
        fill="#fff"
      />
    </G>
  </Svg>
);

export default SvgComponent;
