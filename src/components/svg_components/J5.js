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
      d="M395.6 78L606.5 78 922 395.6 922 606.5 606.5 922 395.6 922 78 606.5 78 395.6z"
      fill="#4c4c4c"
    />
    <Path
      d="M607.6 924.5H394.5l-.7-.7L75.5 607.6V394.5l.7-.7L394.5 75.5h213.1l316.9 319v213.1L607.6 924.5zm-211-5h208.9l314-314V396.6l-314-316.1H396.6L80.5 396.6v208.9l316.1 314z"
      fill="#4c4c4c"
    />
    <LinearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1={78.0283}
      y1={500}
      x2={921.9717}
      y2={500}
    >
      <Stop offset={0} stopColor="#8c8c8c" />
      <Stop offset={0.2176} stopColor="#b5b5b5" />
      <Stop offset={0.4328} stopColor="#d5d5d5" />
      <Stop offset={0.6391} stopColor="#ececec" />
      <Stop offset={0.8325} stopColor="#fafafa" />
      <Stop offset={1} stopColor="#fff" />
    </LinearGradient>
    <Path
      d="M395.6 78L606.5 78 922 395.6 922 606.5 606.5 922 395.6 922 78 606.5 78 395.6z"
      fill="url(#a)"
      stroke="#000"
      strokeMiterlimit={10}
    />
    <LinearGradient
      id="b"
      gradientUnits="userSpaceOnUse"
      x1={384.1}
      y1={499}
      x2={613.9}
      y2={499}
    >
      <Stop offset={0} stopColor="#680065" />
      <Stop offset={0.02866179} stopColor="#6e006b" />
      <Stop offset={0.2593} stopColor="#9e0099" />
      <Stop offset={0.4788} stopColor="#c300be" />
      <Stop offset={0.6816} stopColor="#de00d8" />
      <Stop offset={0.8615} stopColor="#ee00e7" />
      <Stop offset={1} stopColor="#f400ed" />
    </LinearGradient>
    <Path
      d="M546.6 613.9L451.4 613.9 384.1 546.6 384.1 451.4 451.4 384.1 546.6 384.1 613.9 451.4 613.9 546.6z"
      fill="url(#b)"
      stroke="#000"
      strokeMiterlimit={10}
    />
    <G>
      <LinearGradient
        id="c"
        gradientUnits="userSpaceOnUse"
        x1={98.5}
        y1={499.5}
        x2={384.5}
        y2={499.5}
      >
        <Stop offset={0} stopColor="#b400af" />
        <Stop offset={1} stopColor="#680065" />
      </LinearGradient>
      <Path
        d="M98.5 399.5L384.5 451.5 384.5 546.5 98.5 599.5z"
        fill="url(#c)"
      />
      <LinearGradient
        id="d"
        gradientUnits="userSpaceOnUse"
        x1={253.5773}
        y1={251.5056}
        x2={422.6427}
        y2={344.0524}
      >
        <Stop offset={0} stopColor="#b400af" />
        <Stop offset={1} stopColor="#680065" />
      </LinearGradient>
      <Path
        d="M384.5 451.5L451.5 384.5 399.5 98.5 98.5 399.5z"
        fill="url(#d)"
      />
      <LinearGradient
        id="e"
        gradientUnits="userSpaceOnUse"
        x1={518.0439}
        y1={168.8785}
        x2={412.6245}
        y2={338.8395}
      >
        <Stop offset={0} stopColor="#b400af" />
        <Stop offset={1} stopColor="#680065" />
      </LinearGradient>
      <Path
        d="M451.5 384.5L546.5 384.5 599.5 98.5 399.5 98.5z"
        fill="url(#e)"
      />
      <LinearGradient
        id="f"
        gradientUnits="userSpaceOnUse"
        x1={569.9883}
        y1={343.1049}
        x2={758.4646}
        y2={244.0245}
      >
        <Stop offset={0} stopColor="#b400af" />
        <Stop offset={0.1567} stopColor="#c300be" />
        <Stop offset={0.4839} stopColor="#de00d8" />
        <Stop offset={0.7755} stopColor="#ee00e7" />
        <Stop offset={1} stopColor="#f400ed" />
      </LinearGradient>
      <Path
        d="M546.5 384.5L613.5 451.5 898.5 399.5 599.5 98.5z"
        fill="url(#f)"
      />
      <G>
        <LinearGradient
          id="g"
          gradientUnits="userSpaceOnUse"
          x1={613.5}
          y1={499.5}
          x2={898.5}
          y2={499.5}
        >
          <Stop offset={0} stopColor="#b400af" />
          <Stop offset={0.1567} stopColor="#c300be" />
          <Stop offset={0.4839} stopColor="#de00d8" />
          <Stop offset={0.7755} stopColor="#ee00e7" />
          <Stop offset={1} stopColor="#f400ed" />
        </LinearGradient>
        <Path
          d="M613.5 451.5L613.5 546.5 898.5 599.5 898.5 399.5z"
          fill="url(#g)"
        />
      </G>
      <G>
        <LinearGradient
          id="h"
          gradientUnits="userSpaceOnUse"
          x1={546.5}
          y1={722.5}
          x2={898.5}
          y2={722.5}
        >
          <Stop offset={0} stopColor="#b400af" />
          <Stop offset={0.1567} stopColor="#c300be" />
          <Stop offset={0.4839} stopColor="#de00d8" />
          <Stop offset={0.7755} stopColor="#ee00e7" />
          <Stop offset={1} stopColor="#f400ed" />
        </LinearGradient>
        <Path
          d="M613.5 546.5L546.5 613.5 599.5 898.5 898.5 599.5z"
          fill="url(#h)"
        />
      </G>
      <G>
        <LinearGradient
          id="i"
          gradientUnits="userSpaceOnUse"
          x1={421.5435}
          y1={675.6609}
          x2={529.4129}
          y2={844.0776}
        >
          <Stop offset={0} stopColor="#750071" />
          <Stop offset={0.05754775} stopColor="#7d0079" />
          <Stop offset={0.2632} stopColor="#950091" />
          <Stop offset={0.4806} stopColor="#a600a2" />
          <Stop offset={0.7156} stopColor="#b100ac" />
          <Stop offset={1} stopColor="#b400af" />
        </LinearGradient>
        <Path
          d="M546.5 613.5L451.5 613.5 399.5 898.5 599.5 898.5z"
          fill="url(#i)"
        />
      </G>
      <G>
        <LinearGradient
          id="j"
          gradientUnits="userSpaceOnUse"
          x1={385.3063}
          y1={703.3386}
          x2={50.5879}
          y2={815.4664}
        >
          <Stop offset={0} stopColor="#750071" />
          <Stop offset={0.05754775} stopColor="#7d0079" />
          <Stop offset={0.2632} stopColor="#950091" />
          <Stop offset={0.4806} stopColor="#a600a2" />
          <Stop offset={0.7156} stopColor="#b100ac" />
          <Stop offset={1} stopColor="#b400af" />
        </LinearGradient>
        <Path
          d="M451.5 613.5L384.5 546.5 98.5 599.5 399.5 898.5z"
          fill="url(#j)"
        />
      </G>
    </G>
    <LinearGradient
      id="k"
      gradientUnits="userSpaceOnUse"
      x1={98.5}
      y1={498.5}
      x2={898.5}
      y2={498.5}
    >
      <Stop offset={0} stopColor="#f400ed" />
      <Stop offset={0.0567674} stopColor="#f521ef" />
      <Stop offset={0.1569} stopColor="#f854f3" />
      <Stop offset={0.2615} stopColor="#fa82f6" />
      <Stop offset={0.3686} stopColor="#fba8f9" />
      <Stop offset={0.4789} stopColor="#fdc8fb" />
      <Stop offset={0.5932} stopColor="#fee0fd" />
      <Stop offset={0.7133} stopColor="#fef1fe" />
      <Stop offset={0.8431} stopColor="#fffcff" />
      <Stop offset={1} stopColor="#fff" />
    </LinearGradient>
    <Path
      d="M599.5 98.5h-200l-301 301v200l301 299h200l299-299v-200l-299-301zm297 303.4v195.2l-281-52.3v-91.7l281-51.2zM600.8 102.6l293.6 295.6-280.2 51.1-65.5-65.5 52.1-281.2zm-3.7-2.1l-52.3 282h-91.7l-51.3-282h195.3zm-198.9 2.1l51.1 281.2-65.5 65.5-281.2-51.1 295.6-295.6zm-15.7 350.6v91.7l-282 52.3V401.9l282 51.3zm15.7 441.2L102.6 600.8l281.2-52.1 65.5 65.5-51.1 280.2zm3.7 2.1l51.3-281h91.7l52.3 281H401.9zm198.9-2.1l-52.1-280.2 65.5-65.5 280.2 52.1-293.6 293.6zm-54.3-280.9h-95l-67-67v-95l67-67h95l67 67v95l-67 67z"
      fill="url(#k)"
    />
  </Svg>
);

export default SvgComponent;
