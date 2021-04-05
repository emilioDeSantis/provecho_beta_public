import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
  } from 'react-native-svg';
   
  import React from 'react';
  import { View } from 'react-native';
  import style from '../style';
  import * as colors from '../../constants';

   
  const Create = (props) => {
      return (
          <View style={style.like_icon_view}>
          <View style={style.icon_inner_view}>
                <Svg viewBox="0 0 100 100">
                    {!props.is_liked && <Path d="M49.961,69.97l-3.2-2.9c-11.3-10.2-18.8-16.9-18.8-25.1c-0.1-6.6,5.2-11.9,11.9-12
                        c0.1,0,0.2,0,0.2,0c3.8,0,7.4,1.7,9.9,4.6c2.5-2.9,6.1-4.5,9.9-4.6c6.6-0.1,12,5.2,12.1,11.8c0,0.1,0,0.2,0,0.2
                        c0,8.2-7.5,15-18.8,25.2L49.961,69.97z"
                        fill="#ffcc4d"
                    />}
                    {props.is_liked && <Path d="M49.961,69.97l-3.2-2.9c-11.3-10.2-18.8-16.9-18.8-25.1c-0.1-6.6,5.2-11.9,11.9-12
                        c0.1,0,0.2,0,0.2,0c3.8,0,7.4,1.7,9.9,4.6c2.5-2.9,6.1-4.5,9.9-4.6c6.6-0.1,12,5.2,12.1,11.8c0,0.1,0,0.2,0,0.2
                        c0,8.2-7.5,15-18.8,25.2L49.961,69.97z"
                        fill="#ff1177"
                    />}
                </Svg>
                </View>
          </View>
      )
  }
  
  export default Create