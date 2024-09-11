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
      d="M500 64.6L583.3 298.9 807.8 192.2 701.1 416.7 935.4 500 701.1 583.3 807.8 807.8 583.3 701.1 500 935.4 416.7 701.1 192.2 807.8 298.9 583.3 64.6 500 298.9 416.7 192.2 192.2 416.7 298.9z"
      fill="#707070"
    />
    <Path
      d="M500 64.6l83.3 234.2 224.5-106.7-106.7 224.6L935.4 500l-234.2 83.3 106.7 224.5-224.6-106.7L500 935.4l-83.3-234.2-224.5 106.6 106.7-224.5L64.6 500l234.2-83.3-106.6-224.5 224.5 106.7L500 64.6m0-5c-2.1 0-4 1.3-4.7 3.3l-81.4 229-219.6-104.3c-.7-.3-1.4-.5-2.1-.5-1.3 0-2.6.5-3.5 1.5-1.5 1.5-1.9 3.8-1 5.7L292 413.8 63 495.3c-2 .7-3.3 2.6-3.3 4.7s1.3 4 3.3 4.7l229 81.4-104.4 219.6c-.9 1.9-.5 4.2 1 5.7 1 1 2.2 1.5 3.5 1.5.7 0 1.5-.2 2.1-.5L413.8 708l81.4 229c.7 2 2.6 3.3 4.7 3.3s4-1.3 4.7-3.3L586 708l219.5 104.3c.7.3 1.4.5 2.1.5 1.3 0 2.6-.5 3.5-1.5 1.5-1.5 1.9-3.8 1-5.7L708 586.2l229-81.4c2-.7 3.3-2.6 3.3-4.7s-1.3-4-3.3-4.7L708 414l104.3-219.4c.4-.7.6-1.5.6-2.3 0-2.7-2.2-4.9-4.9-5h-.5c-.7.1-1.3.2-1.8.5L586.2 292 504.7 63c-.7-2-2.6-3.4-4.7-3.4z"
      fill="#707070"
    />
    <LinearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1={64.6}
      y1={500}
      x2={935.4}
      y2={500}
      gradientTransform="matrix(1 0 0 -1 0 1000)"
    >
      <Stop offset={0} stopColor="#aaa" />
      <Stop offset={0.3839} stopColor="#d0d0d0" />
      <Stop offset={0.7829} stopColor="#f2f2f2" />
      <Stop offset={1} stopColor="#fff" />
    </LinearGradient>
    <Path
      d="M500 64.6L583.3 298.9 807.8 192.2 701.1 416.7 935.4 500 701.1 583.3 807.8 807.8 583.3 701.1 500 935.4 416.7 701.1 192.2 807.8 298.9 583.3 64.6 500 298.9 416.7 192.2 192.2 416.7 298.9z"
      fill="url(#a)"
    />
    <G>
      <LinearGradient
        id="b"
        gradientUnits="userSpaceOnUse"
        x1={498.5}
        y1={700.5}
        x2={575.5}
        y2={700.5}
        gradientTransform="matrix(1 0 0 -1 0 1000)"
      >
        <Stop offset={0} stopColor="#ff31d4" />
        <Stop offset={1} stopColor="#fff" />
      </LinearGradient>
      <Path d="M499.5 99.5L498.5 499.5 575.5 314.5z" fill="url(#b)" />
      <LinearGradient
        id="c"
        gradientUnits="userSpaceOnUse"
        x1={498.5}
        y1={642}
        x2={781.5}
        y2={642}
        gradientTransform="matrix(1 0 0 -1 0 1000)"
      >
        <Stop offset={0} stopColor="#ff31d4" />
        <Stop offset={1} stopColor="#fff" />
      </LinearGradient>
      <Path d="M498.5 499.5L575.5 314.5 781.5 216.5z" fill="url(#c)" />
      <LinearGradient
        id="d"
        gradientUnits="userSpaceOnUse"
        x1={498.5}
        y1={642}
        x2={781.5}
        y2={642}
        gradientTransform="matrix(1 0 0 -1 0 1000)"
      >
        <Stop offset={0} stopColor="#ff7ee4" />
        <Stop offset={0.14} stopColor="#ff87e6" />
        <Stop offset={0.3681} stopColor="#ff9feb" />
        <Stop offset={0.6558} stopColor="#ffc7f3" />
        <Stop offset={0.989} stopColor="#fffdff" />
        <Stop offset={1} stopColor="#fff" />
      </LinearGradient>
      <Path d="M498.5 499.5L683.5 422.5 781.5 216.5z" fill="url(#d)" />
      <LinearGradient
        id="e"
        gradientUnits="userSpaceOnUse"
        x1={570.2365}
        y1={433.9175}
        x2={834.1887}
        y2={570.4048}
        gradientTransform="matrix(1 0 0 -1 0 1000)"
      >
        <Stop offset={0} stopColor="#ff31d4" />
        <Stop offset={0.1742} stopColor="#ff4fda" />
        <Stop offset={0.5555} stopColor="#ff9deb" />
        <Stop offset={1} stopColor="#fff" />
      </LinearGradient>
      <Path d="M498.5 499.5L899.5 499.5 683.5 422.5z" fill="url(#e)" />
      <LinearGradient
        id="f"
        gradientUnits="userSpaceOnUse"
        x1={498.5}
        y1={462.5}
        x2={899.5}
        y2={462.5}
        gradientTransform="matrix(1 0 0 -1 0 1000)"
      >
        <Stop offset={0} stopColor="#cc27aa" />
        <Stop offset={0.1213} stopColor="#d73ab7" />
        <Stop offset={0.3498} stopColor="#e858ca" />
        <Stop offset={0.5754} stopColor="#f56dd9" />
        <Stop offset={0.7946} stopColor="#fc7ae1" />
        <Stop offset={1} stopColor="#ff7ee4" />
      </LinearGradient>
      <Path d="M498.5 499.5L683.5 575.5 899.5 499.5z" fill="url(#f)" />
      <LinearGradient
        id="g"
        gradientUnits="userSpaceOnUse"
        x1={516.5009}
        y1={406.6497}
        x2={780.8879}
        y2={305.7115}
        gradientTransform="matrix(1 0 0 -1 0 1000)"
      >
        <Stop offset={0} stopColor="#cc27aa" />
        <Stop offset={0.1241} stopColor="#d13bb2" />
        <Stop offset={0.3776} stopColor="#dd6ec6" />
        <Stop offset={0.7343} stopColor="#f0bee6" />
        <Stop offset={1} stopColor="#fff" />
      </LinearGradient>
      <Path d="M498.5 499.5L781.5 781.5 683.5 575.5z" fill="url(#g)" />
      <LinearGradient
        id="h"
        gradientUnits="userSpaceOnUse"
        x1={498.5}
        y1={359.5}
        x2={781.5}
        y2={359.5}
        gradientTransform="matrix(1 0 0 -1 0 1000)"
      >
        <Stop offset={0} stopColor="#cc27aa" />
        <Stop offset={0.0937684} stopColor="#d329b0" />
        <Stop offset={0.2344} stopColor="#e82ec1" />
        <Stop offset={0.3553} stopColor="#ff33d4" />
        <Stop offset={0.4198} stopColor="#ff3bd6" />
        <Stop offset={0.5214} stopColor="#ff52da" />
        <Stop offset={0.6473} stopColor="#ff77e2" />
        <Stop offset={0.7926} stopColor="#ffaaed" />
        <Stop offset={0.9523} stopColor="#ffeafb" />
        <Stop offset={1} stopColor="#fff" />
      </LinearGradient>
      <Path d="M498.5 499.5L575.5 683.5 781.5 781.5z" fill="url(#h)" />
      <LinearGradient
        id="i"
        gradientUnits="userSpaceOnUse"
        x1={498.5}
        y1={301}
        x2={575.5}
        y2={301}
        gradientTransform="matrix(1 0 0 -1 0 1000)"
      >
        <Stop offset={0} stopColor="#ff31d4" />
        <Stop offset={0.1119} stopColor="#ff36d5" />
        <Stop offset={0.2528} stopColor="#ff46d8" />
        <Stop offset={0.4091} stopColor="#ff60de" />
        <Stop offset={0.5767} stopColor="#ff84e5" />
        <Stop offset={0.7533} stopColor="#ffb2ef" />
        <Stop offset={0.9347} stopColor="#ffe9fa" />
        <Stop offset={1} stopColor="#fff" />
      </LinearGradient>
      <Path d="M498.5 499.5L499.5 898.5 575.5 683.5z" fill="url(#i)" />
      <G>
        <LinearGradient
          id="j"
          gradientUnits="userSpaceOnUse"
          x1={422.5}
          y1={301}
          x2={499.5}
          y2={301}
          gradientTransform="matrix(1 0 0 -1 0 1000)"
        >
          <Stop offset={0} stopColor="#ff31d4" />
          <Stop offset={1} stopColor="#cc27aa" />
        </LinearGradient>
        <Path d="M498.5 499.5L422.5 683.5 499.5 898.5z" fill="url(#j)" />
      </G>
      <G>
        <LinearGradient
          id="k"
          gradientUnits="userSpaceOnUse"
          x1={216.5}
          y1={359.5}
          x2={498.5}
          y2={359.5}
          gradientTransform="matrix(1 0 0 -1 0 1000)"
        >
          <Stop offset={0} stopColor="#ff31d4" />
          <Stop offset={1} stopColor="#cc27aa" />
        </LinearGradient>
        <Path d="M498.5 499.5L216.5 781.5 422.5 683.5z" fill="url(#k)" />
      </G>
      <G>
        <LinearGradient
          id="l"
          gradientUnits="userSpaceOnUse"
          x1={238.53}
          y1={309.5945}
          x2={496.5122}
          y2={423.4769}
          gradientTransform="matrix(1 0 0 -1 0 1000)"
        >
          <Stop offset={0} stopColor="#ff31d4" />
          <Stop offset={0.1407} stopColor="#f72fcd" />
          <Stop offset={0.3642} stopColor="#e02bba" />
          <Stop offset={0.6425} stopColor="#ba249b" />
          <Stop offset={0.962} stopColor="#871a70" />
          <Stop offset={1} stopColor="#80196a" />
        </LinearGradient>
        <Path d="M498.5 499.5L314.5 575.5 216.5 781.5z" fill="url(#l)" />
      </G>
      <G>
        <LinearGradient
          id="m"
          gradientUnits="userSpaceOnUse"
          x1={99.5}
          y1={462.5}
          x2={498.5}
          y2={462.5}
          gradientTransform="matrix(1 0 0 -1 0 1000)"
        >
          <Stop offset={0} stopColor="#ff31d4" />
          <Stop offset={0.1436} stopColor="#f52fcc" />
          <Stop offset={0.3851} stopColor="#db2ab6" />
          <Stop offset={0.6926} stopColor="#b12293" />
          <Stop offset={1} stopColor="#80196a" />
        </LinearGradient>
        <Path d="M498.5 499.5L99.5 499.5 314.5 575.5z" fill="url(#m)" />
      </G>
      <G>
        <LinearGradient
          id="n"
          gradientUnits="userSpaceOnUse"
          x1={190.4809}
          y1={541.9621}
          x2={486.0662}
          y2={488.9592}
          gradientTransform="matrix(1 0 0 -1 0 1000)"
        >
          <Stop offset={0} stopColor="#ff31d4" />
          <Stop offset={0.157} stopColor="#f22fc9" />
          <Stop offset={0.447} stopColor="#d028ad" />
          <Stop offset={0.8351} stopColor="#991e7f" />
          <Stop offset={1} stopColor="#80196a" />
        </LinearGradient>
        <Path d="M498.5 499.5L99.5 499.5 314.5 422.5z" fill="url(#n)" />
      </G>
      <G>
        <LinearGradient
          id="o"
          gradientUnits="userSpaceOnUse"
          x1={240.3592}
          y1={697.6528}
          x2={473.3062}
          y2={538.7198}
          gradientTransform="matrix(1 0 0 -1 0 1000)"
        >
          <Stop offset={0} stopColor="#ff31d4" />
          <Stop offset={0.1984} stopColor="#eb2dc3" />
          <Stop offset={0.6013} stopColor="#b82499" />
          <Stop offset={1} stopColor="#80196a" />
        </LinearGradient>
        <Path d="M498.5 499.5L216.5 216.5 314.5 422.5z" fill="url(#o)" />
      </G>
      <G>
        <LinearGradient
          id="p"
          gradientUnits="userSpaceOnUse"
          x1={237.4253}
          y1={692.1258}
          x2={497.6601}
          y2={583.4895}
          gradientTransform="matrix(1 0 0 -1 0 1000)"
        >
          <Stop offset={0} stopColor="#ff31d4" />
          <Stop offset={0.524} stopColor="#e62cc0" />
          <Stop offset={1} stopColor="#cc27aa" />
        </LinearGradient>
        <Path d="M498.5 499.5L422.5 314.5 216.5 216.5z" fill="url(#p)" />
      </G>
      <G>
        <LinearGradient
          id="q"
          gradientUnits="userSpaceOnUse"
          x1={422.5}
          y1={700.5}
          x2={499.5}
          y2={700.5}
          gradientTransform="matrix(1 0 0 -1 0 1000)"
        >
          <Stop offset={0} stopColor="#ff31d4" />
          <Stop offset={0.3612} stopColor="#fc30d2" />
          <Stop offset={0.5964} stopColor="#f42fcb" />
          <Stop offset={0.7956} stopColor="#e52cbe" />
          <Stop offset={0.9738} stopColor="#d028ad" />
          <Stop offset={1} stopColor="#cc27aa" />
        </LinearGradient>
        <Path d="M498.5 499.5L499.5 99.5 422.5 314.5z" fill="url(#q)" />
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
