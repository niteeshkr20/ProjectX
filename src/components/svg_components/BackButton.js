import React from 'react'
import Svg, { Path } from 'react-native-svg'

const BackButton = props => (
  <Svg style={props.style} viewBox="0 0 100 200">
    <Path
      fill="#FFF"
      d="M12.1 94.9l59-59c2.8-2.8 7.5-2.8 10.3 0l6.9 6.9c2.8 2.8 2.8 7.4 0 10.3l-46.7 47 46.7 47c2.8 2.8 2.8 7.4 0 10.3l-6.9 6.9c-2.8 2.8-7.5 2.8-10.3 0l-59-59c-2.8-2.9-2.8-7.5 0-10.4z"
    />
  </Svg>
)

export default BackButton
