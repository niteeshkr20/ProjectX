import React from "react";
import Svg, { Path, LinearGradient, Stop, G } from "react-native-svg";

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
      d="M760 80c5.5 0 10 4.5 10 10v820c0 5.5-4.5 10-10 10H240c-5.5 0-10-4.5-10-10V90c0-5.5 4.5-10 10-10h520m0-10H240c-11 0-20 9-20 20v820c0 11 9 20 20 20h520c11 0 20-9 20-20V90c0-11-9-20-20-20z"
      fill="#999"
    />
    <LinearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1={230}
      y1={-100}
      x2={770}
      y2={-100}
      gradientTransform="translate(0 600)"
    >
      <Stop offset={0} stopColor="#ccc" />
      <Stop offset={1} stopColor="#fff" />
    </LinearGradient>
    <Path
      d="M760 920H240c-5.5 0-10-4.5-10-10V90c0-5.5 4.5-10 10-10h520c5.5 0 10 4.5 10 10v820c0 5.5-4.5 10-10 10z"
      fill="url(#a)"
    />
    <LinearGradient
      id="b"
      gradientUnits="userSpaceOnUse"
      x1={379}
      y1={-147}
      x2={669}
      y2={-147}
      gradientTransform="translate(0 600)"
    >
      <Stop offset={0} stopColor="#feff00" />
      <Stop offset={1} stopColor="#fcf8ab" />
    </LinearGradient>
    <Path d="M379 221H669V685H379z" fill="url(#b)" />
    <LinearGradient
      id="c"
      gradientUnits="userSpaceOnUse"
      x1={500.5}
      y1={-389.848}
      x2={500.5}
      y2={-530.6178}
      gradientTransform="translate(0 600)"
    >
      <Stop offset={0.3961} stopColor="#ff0" />
      <Stop offset={0.664} stopColor="#cccc01" />
      <Stop offset={0.8828} stopColor="#a8a802" />
      <Stop offset={1} stopColor="#9b9b02" />
    </LinearGradient>
    <Path d="M250.5 100.5L379 221 669 221 750.5 100.5z" fill="url(#c)" />
    <LinearGradient
      id="d"
      gradientUnits="userSpaceOnUse"
      x1={381.0842}
      y1={-99.5}
      x2={251.5842}
      y2={-99.5}
      gradientTransform="translate(0 600)"
    >
      <Stop offset={0} stopColor="#fcf85e" />
      <Stop offset={0.1143} stopColor="#fcf85b" />
      <Stop offset={0.2102} stopColor="#fcf950" />
      <Stop offset={0.2996} stopColor="#fdfa3f" />
      <Stop offset={0.3849} stopColor="#fefc26" />
      <Stop offset={0.4667} stopColor="#fffe07" />
      <Stop offset={0.4826} stopColor="#ff0" />
      <Stop offset={0.5688} stopColor="#f7f700" />
      <Stop offset={0.7038} stopColor="#e1e101" />
      <Stop offset={0.8698} stopColor="#bcbc01" />
      <Stop offset={1} stopColor="#9b9b02" />
    </LinearGradient>
    <Path d="M250.5 100.5L379 221 380 685 250.5 900.5z" fill="url(#d)" />
    <G>
      <LinearGradient
        id="e"
        gradientUnits="userSpaceOnUse"
        x1={711.6994}
        y1={230.0122}
        x2={167.3248}
        y2={149.5016}
        gradientTransform="translate(0 600)"
      >
        <Stop offset={0} stopColor="#fcf85e" />
        <Stop offset={0.1334} stopColor="#fcf85b" />
        <Stop offset={0.2345} stopColor="#fcf951" />
        <Stop offset={0.325} stopColor="#fdfa41" />
        <Stop offset={0.4092} stopColor="#fefc2a" />
        <Stop offset={0.4884} stopColor="#fffe0d" />
        <Stop offset={0.5175} stopColor="#ff0" />
        <Stop offset={0.5213} stopColor="#fefe00" />
        <Stop offset={0.6708} stopColor="#d3d301" />
        <Stop offset={0.8056} stopColor="#b5b501" />
        <Stop offset={0.9199} stopColor="#a2a202" />
        <Stop offset={1} stopColor="#9b9b02" />
      </LinearGradient>
      <Path d="M250.5 900.5L750.5 900.5 669 685 380 685z" fill="url(#e)" />
    </G>
    <G>
      <LinearGradient
        id="f"
        gradientUnits="userSpaceOnUse"
        x1={768.1038}
        y1={224.3348}
        x2={675.0983}
        y2={-463.5339}
        gradientTransform="translate(0 600)"
      >
        <Stop offset={0.3215} stopColor="#ff0" />
        <Stop offset={0.4854} stopColor="#ebeb00" />
        <Stop offset={0.8177} stopColor="#b9b901" />
        <Stop offset={1} stopColor="#9b9b02" />
      </LinearGradient>
      <Path d="M669 221L750.5 100.5 750.5 900.5 669 685z" fill="url(#f)" />
    </G>
    <G opacity={0.5}>
      <Path
        d="M250.5 100.5v800h500v-800h-500zm496 13.1v765.1L673 684.3v-462l73.5-108.7zM665 681H383V225h282v456zm78-576.5L666.9 217H380.6l-120-112.5H743zM376 683.9L254.5 886.1V109.7l120.5 113 1 461.2zM257.6 896.5L382.3 689h284l78.5 207.5H257.6z"
        fill="#9b9b02"
      />
    </G>
    <G opacity={0.18}>
      <LinearGradient
        id="g"
        gradientUnits="userSpaceOnUse"
        x1={1238.0621}
        y1={-198.1982}
        x2={950.3304}
        y2={-69.0463}
        gradientTransform="matrix(-1 0 0 1 1601 600)"
      >
        <Stop offset={0} stopColor="#fcf85e" />
        <Stop offset={0.09880844} stopColor="#fcf957" />
        <Stop offset={0.2469} stopColor="#fdfa42" />
        <Stop offset={0.4249} stopColor="#fefd21" />
        <Stop offset={0.5718} stopColor="#ff0" />
        <Stop offset={0.6456} stopColor="#f5f500" />
        <Stop offset={0.7699} stopColor="#dbdb01" />
        <Stop offset={0.9286} stopColor="#b0b002" />
        <Stop offset={1} stopColor="#9b9b02" />
      </LinearGradient>
      <Path d="M332 221H622V685H332z" fill="url(#g)" />
      <LinearGradient
        id="h"
        gradientUnits="userSpaceOnUse"
        x1={1100.5}
        y1={-389.848}
        x2={1100.5}
        y2={-530.6178}
        gradientTransform="matrix(-1 0 0 1 1601 600)"
      >
        <Stop offset={0.3961} stopColor="#ff0" />
        <Stop offset={0.664} stopColor="#cccc01" />
        <Stop offset={0.8828} stopColor="#a8a802" />
        <Stop offset={1} stopColor="#9b9b02" />
      </LinearGradient>
      <Path d="M750.5 100.5L622 221 332 221 250.5 100.5z" fill="url(#h)" />
      <LinearGradient
        id="i"
        gradientUnits="userSpaceOnUse"
        x1={981.0842}
        y1={-99.5}
        x2={851.5842}
        y2={-99.5}
        gradientTransform="matrix(-1 0 0 1 1601 600)"
      >
        <Stop offset={0} stopColor="#fcf85e" />
        <Stop offset={0.1143} stopColor="#fcf85b" />
        <Stop offset={0.2102} stopColor="#fcf950" />
        <Stop offset={0.2996} stopColor="#fdfa3f" />
        <Stop offset={0.3849} stopColor="#fefc26" />
        <Stop offset={0.4667} stopColor="#fffe07" />
        <Stop offset={0.4826} stopColor="#ff0" />
        <Stop offset={0.5688} stopColor="#f7f700" />
        <Stop offset={0.7038} stopColor="#e1e101" />
        <Stop offset={0.8698} stopColor="#bcbc01" />
        <Stop offset={1} stopColor="#9b9b02" />
      </LinearGradient>
      <Path d="M750.5 100.5L622 221 621 685 750.5 900.5z" fill="url(#i)" />
      <G>
        <LinearGradient
          id="j"
          gradientUnits="userSpaceOnUse"
          x1={1311.6993}
          y1={230.0122}
          x2={767.3248}
          y2={149.5016}
          gradientTransform="matrix(-1 0 0 1 1601 600)"
        >
          <Stop offset={0} stopColor="#fcf85e" />
          <Stop offset={0.1334} stopColor="#fcf85b" />
          <Stop offset={0.2345} stopColor="#fcf951" />
          <Stop offset={0.325} stopColor="#fdfa41" />
          <Stop offset={0.4092} stopColor="#fefc2a" />
          <Stop offset={0.4884} stopColor="#fffe0d" />
          <Stop offset={0.5175} stopColor="#ff0" />
          <Stop offset={0.5213} stopColor="#fefe00" />
          <Stop offset={0.6708} stopColor="#d3d301" />
          <Stop offset={0.8056} stopColor="#b5b501" />
          <Stop offset={0.9199} stopColor="#a2a202" />
          <Stop offset={1} stopColor="#9b9b02" />
        </LinearGradient>
        <Path d="M750.5 900.5L250.5 900.5 332 685 621 685z" fill="url(#j)" />
      </G>
      <G>
        <LinearGradient
          id="k"
          gradientUnits="userSpaceOnUse"
          x1={1368.1038}
          y1={224.3348}
          x2={1275.0983}
          y2={-463.5339}
          gradientTransform="matrix(-1 0 0 1 1601 600)"
        >
          <Stop offset={0.3215} stopColor="#ff0" />
          <Stop offset={0.4854} stopColor="#ebeb00" />
          <Stop offset={0.8177} stopColor="#b9b901" />
          <Stop offset={1} stopColor="#9b9b02" />
        </LinearGradient>
        <Path d="M332 221L250.5 100.5 250.5 900.5 332 685z" fill="url(#k)" />
      </G>
    </G>
    <G opacity={0.22}>
      <G display="none">
        <Path
          d="M749 101v798H251V101h498m1-1H250v800h500V100z"
          display="inline"
        />
      </G>
      <G opacity={0.75}>
        <LinearGradient
          id="l"
          gradientUnits="userSpaceOnUse"
          x1={709.0315}
          y1={-319.8915}
          x2={476.5595}
          y2={-102.6721}
          gradientTransform="translate(0 600)"
        >
          <Stop offset={0} stopColor="#fff" />
          <Stop offset={0.3605} stopColor="#fff" stopOpacity={0.1427} />
          <Stop offset={0.4205} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
        <Path d="M379 221H669V685H379z" fill="url(#l)" />
      </G>
      <G opacity={0.75}>
        <LinearGradient
          id="m"
          gradientUnits="userSpaceOnUse"
          x1={618.1614}
          y1={-345.378}
          x2={532.7408}
          y2={-457.2684}
          gradientTransform="translate(0 600)"
        >
          <Stop offset={0} stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
        <Path d="M250.5 100.5L379 221 669 221 750.5 100.5z" fill="url(#m)" />
      </G>
      <G opacity={0.74}>
        <LinearGradient
          id="n"
          gradientUnits="userSpaceOnUse"
          x1={774.6992}
          y1={-62.6615}
          x2={598.2476}
          y2={-331.274}
          gradientTransform="translate(0 600)"
        >
          <Stop offset={0} stopColor="#fff" stopOpacity={0} />
          <Stop offset={0.9562} stopColor="#fff" stopOpacity={0.9562} />
          <Stop offset={1} stopColor="#fff" />
        </LinearGradient>
        <Path d="M669 221L750.5 100.5 750.5 900.5 669 685z" fill="url(#n)" />
      </G>
    </G>
    <G>
      <G opacity={0.6}>
        <Path
          d="M690.3 285.8L665.3 232.4 608 246.1 661.4 221.1 647.7 163.8 672.6 217.2 730 203.5 676.5 228.5z"
          fill="#fff"
        />
      </G>
      <G opacity={0.85}>
        <Path
          d="M400.9 749.8L376 696.3 318.7 710 372.1 685.1 358.4 627.8 383.3 681.2 440.7 667.5 387.2 692.4z"
          fill="#fff"
        />
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
