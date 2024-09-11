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
      d="M499.8 99.6L629.8 363.1 920.6 405.3 710.2 610.4 759.9 900 499.8 763.3 239.7 900 289.4 610.4 79 405.3 369.8 363.1z"
      fill="#fff"
    />
    <Path
      d="M499.8 99.6l130 263.5 290.8 42.2-210.4 205.1L759.9 900 499.8 763.3 239.7 900l49.7-289.6L79 405.3l290.8-42.2 130-263.5m0-11.3l-4.5 9.1-128.9 261.1-288.1 41.9-10 1.5 7.3 7.1L284 612.2l-49.2 287-1.7 10 9-4.7L499.8 769l257.7 135.5 9 4.7-1.7-10-49.2-287L924.1 409l7.3-7.1-10-1.5-288.2-41.9L504.3 97.4l-4.5-9.1z"
      fill="#999"
    />
    <LinearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1={79}
      y1={500.2}
      x2={920.6}
      y2={500.2}
      gradientTransform="matrix(1 0 0 -1 0 1000)"
    >
      <Stop offset={0} stopColor="#ccc" />
      <Stop offset={1} stopColor="#fff" />
    </LinearGradient>
    <Path
      d="M499.8 99.6L629.8 363.1 920.6 405.3 710.2 610.4 759.9 900 499.8 763.3 239.7 900 289.4 610.4 79 405.3 369.8 363.1z"
      fill="url(#a)"
    />
    <LinearGradient
      id="b"
      gradientUnits="userSpaceOnUse"
      x1={320.8}
      y1={522}
      x2={721.2}
      y2={522}
      gradientTransform="matrix(1 0 0 -1 0 1000)"
    >
      <Stop offset={0} stopColor="#ad141a" />
      <Stop offset={1} stopColor="#fa1e26" />
    </LinearGradient>
    <Path
      d="M521 287.6L582.9 413 721.2 433.1 621.1 530.6 644.7 668.4 521 603.3 397.3 668.4 420.9 530.6 320.8 433.1 459.1 413z"
      fill="url(#b)"
    />
    <LinearGradient
      id="c"
      gradientUnits="userSpaceOnUse"
      x1={174.8442}
      y1={836.7351}
      x2={501.0082}
      y2={570.5435}
      gradientTransform="matrix(1 0 0 -1 0 1000)"
    >
      <Stop offset={0} stopColor="#ad141a" />
      <Stop offset={1} stopColor="#fa1e26" />
    </LinearGradient>
    <Path
      d="M499.5 119.5L376.5 369.5 99.5 410.5 320.5 433.5 459.5 412.5 520.5 287.5z"
      fill="url(#c)"
    />
    <LinearGradient
      id="d"
      gradientUnits="userSpaceOnUse"
      x1={529.8624}
      y1={731.1133}
      x2={817.4026}
      y2={703.9655}
      gradientTransform="matrix(1 0 0 -1 0 1000)"
    >
      <Stop offset={0} stopColor="#fa1e26" />
      <Stop offset={0.5827} stopColor="#f51d25" />
      <Stop offset={1} stopColor="#ed1c24" />
    </LinearGradient>
    <Path
      d="M499.5 119.5L623.5 369.5 900.5 410.5 721.5 433.5 582.5 412.5 520.5 287.5z"
      fill="url(#d)"
    />
    <G>
      <LinearGradient
        id="e"
        gradientUnits="userSpaceOnUse"
        x1={621.5}
        y1={354.5}
        x2={900.5}
        y2={354.5}
        gradientTransform="matrix(1 0 0 -1 0 1000)"
      >
        <Stop offset={0} stopColor="#ad141a" />
        <Stop offset={0.1409} stopColor="#c5171e" />
        <Stop offset={0.3224} stopColor="#dc1a21" />
        <Stop offset={0.5165} stopColor="#ed1c24" />
        <Stop offset={0.73} stopColor="#f71e26" />
        <Stop offset={1} stopColor="#fa1e26" />
      </LinearGradient>
      <Path
        d="M900.5 410.5L700.5 605.5 747.5 880.5 644.5 668.5 621.5 530.5 721.5 433.5z"
        fill="url(#e)"
      />
    </G>
    <G>
      <LinearGradient
        id="f"
        gradientUnits="userSpaceOnUse"
        x1={499.8953}
        y1={204.3655}
        x2={499.6898}
        y2={370.8694}
        gradientTransform="matrix(1 0 0 -1 0 1000)"
      >
        <Stop offset={0} stopColor="#ad141a" />
        <Stop offset={0.5224} stopColor="#d71a21" />
        <Stop offset={1} stopColor="#fa1e26" />
      </LinearGradient>
      <Path
        d="M747.5 880.5L500.5 750.5 252.5 880.5 397.5 668.5 521.5 603.5 644.5 668.5z"
        fill="url(#f)"
      />
    </G>
    <G>
      <LinearGradient
        id="g"
        gradientUnits="userSpaceOnUse"
        x1={99.5}
        y1={354.5}
        x2={420.5}
        y2={354.5}
        gradientTransform="matrix(1 0 0 -1 0 1000)"
      >
        <Stop offset={0} stopColor="#ad141a" />
        <Stop offset={0.216} stopColor="#b1151b" />
        <Stop offset={0.4521} stopColor="#bf161d" />
        <Stop offset={0.6978} stopColor="#d41920" />
        <Stop offset={0.9485} stopColor="#f31d25" />
        <Stop offset={1} stopColor="#fa1e26" />
      </LinearGradient>
      <Path
        d="M252.5 880.5L299.5 603.5 99.5 410.5 320.5 433.5 420.5 530.5 397.5 668.5z"
        fill="url(#g)"
      />
    </G>
    <G opacity={0.6}>
      <LinearGradient
        id="h"
        gradientUnits="userSpaceOnUse"
        x1={320.8}
        y1={522}
        x2={721.2}
        y2={522}
        gradientTransform="matrix(1 0 0 -1 0 1000)"
      >
        <Stop offset={0} stopColor="#fff" stopOpacity={0} />
        <Stop offset={0.9405} stopColor="#fff" stopOpacity={0.7524} />
        <Stop offset={1} stopColor="#fff" stopOpacity={0.8} />
      </LinearGradient>
      <Path
        d="M521 287.6L582.9 413 721.2 433.1 621.1 530.6 644.7 668.4 521 603.3 397.3 668.4 420.9 530.6 320.8 433.1 459.1 413z"
        fill="url(#h)"
      />
      <LinearGradient
        id="i"
        gradientUnits="userSpaceOnUse"
        x1={529.8624}
        y1={731.1133}
        x2={817.4026}
        y2={703.9655}
        gradientTransform="matrix(1 0 0 -1 0 1000)"
      >
        <Stop offset={0} stopColor="#fff" stopOpacity={0.7} />
        <Stop offset={0.1413} stopColor="#fff" stopOpacity={0.6011} />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <Path
        d="M499.5 119.5L623.5 369.5 900.5 410.5 721.5 433.5 582.5 412.5 520.5 287.5z"
        fill="url(#i)"
      />
      <G>
        <LinearGradient
          id="j"
          gradientUnits="userSpaceOnUse"
          x1={621.5}
          y1={354.5}
          x2={900.5}
          y2={354.5}
          gradientTransform="matrix(1 0 0 -1 0 1000)"
        >
          <Stop offset={0} stopColor="#fff" stopOpacity={0} />
          <Stop offset={1} stopColor="#fff" stopOpacity={0.9} />
        </LinearGradient>
        <Path
          d="M900.5 410.5L700.5 605.5 747.5 880.5 644.5 668.5 621.5 530.5 721.5 433.5z"
          fill="url(#j)"
        />
      </G>
    </G>
    <G opacity={0.6}>
      <Path
        d="M521 294.4l59.2 119.9.7 1.4 1.6.2 132.3 19.2-95.8 93.4-1.1 1.1.3 1.6L640.8 663l-118.3-62.2-1.5-.8-1.4.7-118.3 62.2 22.6-131.8.3-1.6-1.1-1.1-95.7-93.3 132.3-19.2 1.6-.2.7-1.4 59-119.9m0-6.8L459.1 413l-138.3 20.1 100.1 97.6-23.6 137.8 123.7-65 123.7 65-23.6-137.8 100.1-97.6L582.9 413 521 287.6z"
        fill="#fff"
      />
      <Path
        d="M497.8 129.8L517.4 287l-59.9 122.8-137.1 20.7L123.5 410l253.4-37.5 1.6-.2.7-1.4 118.6-241.1m1.7-10.3l-123 250-277 41 221 23 139-21 61-125-21-168zM504.7 136.7l116.1 234.2.7 1.4 1.6.2 255.5 37.8-157.1 20.2-137-20.7-61.1-123.1-18.7-150m-5.2-17.2l21 168 62 125 139 21 179-23-277-41-124-250zM892 414.6L698.4 603.4l-1.1 1.1.3 1.6L741 860.2l-93.6-192.7-22.7-136 98.2-95.2L892 414.6m8.5-4.1l-179 23-100 97 23 138 103 212-47-275 200-195z"
        fill="#fff"
      />
      <Path
        d="M521.5 606.9l120.7 63.8 98.6 202.9-238.9-125.8-1.4-.7-1.4.7-237.3 124.4 137.8-201.4 121.9-63.9m0-3.4l-124 65-145 212 248-130 247 130-103-212-123-65zM107.8 414.4l211.3 22 98.1 95.2-22.6 135.8-136.9 200.1L302.5 604l.3-1.6-1.1-1.1-193.9-186.9m-8.3-3.9l200 193-47 277 145-212 23-138-100-97-221-23z"
        fill="#fff"
      />
    </G>
    <G opacity={0.5}>
      <LinearGradient
        id="k"
        gradientUnits="userSpaceOnUse"
        x1={771.1785}
        y1={-145.884}
        x2={1171.5181}
        y2={-145.884}
        gradientTransform="scale(-1 1) rotate(35.85 -931.99 -2075.187)"
      >
        <Stop offset={0} stopColor="#fa1e26" />
        <Stop offset={1} stopColor="#ad141a" />
      </LinearGradient>
      <Path
        d="M630.7 757.7L507.2 692.3 383.3 757.1 407.3 619.3 307.4 521.5 445.8 501.8 508 376.6 569.5 502.1 707.8 522.6 607.5 619.9z"
        fill="url(#k)"
      />
      <LinearGradient
        id="l"
        gradientUnits="userSpaceOnUse"
        x1={625.1927}
        y1={168.8563}
        x2={951.3568}
        y2={-97.3353}
        gradientTransform="scale(-1 1) rotate(35.85 -931.99 -2075.187)"
      >
        <Stop offset={0} stopColor="#ad141a" />
        <Stop offset={1} stopColor="#fa1e26" />
      </LinearGradient>
      <Path
        d="M746.6 881.4L699.9 606.7 900.4 411.2 707.8 522 607.4 620.5 631.2 757.5z"
        fill="url(#l)"
      />
      <LinearGradient
        id="m"
        gradientUnits="userSpaceOnUse"
        x1={980.2227}
        y1={63.2685}
        x2={1267.7628}
        y2={36.1206}
        gradientTransform="scale(-1 1) rotate(35.85 -931.99 -2075.187)"
      >
        <Stop offset={0} stopColor="#fa1e26" />
        <Stop offset={0.5827} stopColor="#f51d25" />
        <Stop offset={1} stopColor="#ed1c24" />
      </LinearGradient>
      <Path
        d="M746.6 881.4L499.7 751.4 251.2 880.3 382.8 756.9 507.7 692.5 631.2 757.5z"
        fill="url(#m)"
      />
      <G>
        <LinearGradient
          id="n"
          gradientUnits="userSpaceOnUse"
          x1={1071.8434}
          y1={-313.3496}
          x2={1350.7357}
          y2={-313.3496}
          gradientTransform="scale(-1 1) rotate(35.85 -931.99 -2075.187)"
        >
          <Stop offset={0} stopColor="#ad141a" />
          <Stop offset={0.1409} stopColor="#c5171e" />
          <Stop offset={0.3224} stopColor="#dc1a21" />
          <Stop offset={0.5165} stopColor="#ed1c24" />
          <Stop offset={0.73} stopColor="#f71e26" />
          <Stop offset={1} stopColor="#fa1e26" />
        </LinearGradient>
        <Path
          d="M251.2 880.3L299.1 605.2 99.9 409.8 307.6 521.3 407 619.7 382.8 756.9z"
          fill="url(#n)"
        />
      </G>
      <G>
        <LinearGradient
          id="o"
          gradientUnits="userSpaceOnUse"
          x1={950.2461}
          y1={-463.5016}
          x2={950.0406}
          y2={-296.9977}
          gradientTransform="scale(-1 1) rotate(35.85 -931.99 -2075.187)"
        >
          <Stop offset={0} stopColor="#ad141a" />
          <Stop offset={0.5224} stopColor="#d71a21" />
          <Stop offset={1} stopColor="#fa1e26" />
        </LinearGradient>
        <Path
          d="M99.9 409.8L376.3 370.5 501.1 119.9 507.8 376.6 445.3 501.9 307.6 521.3z"
          fill="url(#o)"
        />
      </G>
      <G>
        <LinearGradient
          id="p"
          gradientUnits="userSpaceOnUse"
          x1={549.8358}
          y1={-313.3627}
          x2={870.8022}
          y2={-313.3627}
          gradientTransform="scale(-1 1) rotate(35.85 -931.99 -2075.187)"
        >
          <Stop offset={0} stopColor="#ad141a" />
          <Stop offset={0.216} stopColor="#b1151b" />
          <Stop offset={0.4521} stopColor="#bf161d" />
          <Stop offset={0.6978} stopColor="#d41920" />
          <Stop offset={0.9485} stopColor="#f31d25" />
          <Stop offset={1} stopColor="#fa1e26" />
        </LinearGradient>
        <Path
          d="M501.1 119.9L625.3 371.9 900.4 411.2 707.8 522 570 502 507.8 376.6z"
          fill="url(#p)"
        />
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
