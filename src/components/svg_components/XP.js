import React from 'react'
import Svg, { LinearGradient, Stop, Path, G } from 'react-native-svg'

const XP = props => (
  <Svg viewBox="0 0 1000 1000" width={props.width}
  height={props.height}>
    <LinearGradient
      id="prefix__a"
      gradientUnits="userSpaceOnUse"
      x1={98.471}
      y1={499.991}
      x2={877.45}
      y2={499.991}
    >
      <Stop offset={0} stopColor="#5887f9" />
      <Stop offset={1} stopColor="#60c3ff" />
    </LinearGradient>
    <Path
      fill="url(#prefix__a)"
      d="M500.61 100.96l114.51 283.37 304.86 21.61L685.87 602.4l73.65 296.62-259.19-161.94-259.34 161.71 73.92-296.55L80.97 405.56l304.88-21.34z"
    />
    <G fill="#FFF">
      <Path d="M524.72 630.12h-46.54l-44.7-71.78-44.7 71.78h-43.65l63.77-97.87-59.69-91.9h44.97l41.42 68.28 40.63-68.28h43.91l-60.35 94.11 64.93 95.66zM681.7 499.54c0 20.42-6.46 36.04-19.39 46.86s-31.31 16.23-55.16 16.23h-17.49v67.5H548.9V440.34h61.4c23.31 0 41.04 4.95 53.18 14.86 12.15 9.92 18.22 24.69 18.22 44.34zm-92.03 30.11h13.41c12.53 0 21.91-2.44 28.14-7.33 6.22-4.89 9.33-12.01 9.33-21.35 0-9.43-2.61-16.4-7.82-20.9-5.22-4.5-13.39-6.75-24.52-6.75h-18.54v56.33z" />
    </G>
  </Svg>
)

export default XP;
