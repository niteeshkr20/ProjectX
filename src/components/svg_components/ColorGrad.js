import React from 'react'
import Svg, { LinearGradient, Stop, Path } from 'react-native-svg'

const ColorGrad = props => (
  <Svg viewBox="0 0 10 10" {...props}>
    <LinearGradient
      id="prefix__a"
      gradientUnits="userSpaceOnUse"
      x1={0}
      y1={5}
      x2={10}
      y2={5}
    >
      <Stop offset={0} stopColor="#5887f9" />
      <Stop offset={1} stopColor="#60c3ff" />
    </LinearGradient>
    <Path fill="url(#prefix__a)" d="M0 0h10v10H0z" />
  </Svg>
)

export default ColorGrad
