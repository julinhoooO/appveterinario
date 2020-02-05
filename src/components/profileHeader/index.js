import React from 'react';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import { Container } from './styles';

export default function profileHeader({
  leftTopIconOnPress,
  rightTopIconOnPress,
  title,
  image,
  backgroundColor,
}) {
  return (
    <StickyParallaxHeader
      headerType="AvatarHeader"
      leftTopIcon={props => <Icon {...props} name="arrow-left" />}
      rightTopIcon={props => <Icon {...props} name="dots-vertical" />}
      leftTopIconOnPress={leftTopIconOnPress}
      rightTopIconOnPress={rightTopIconOnPress}
      title={title}
      image={image}
      backgroundColor={backgroundColor ? backgroundColor : '#001523'}
    />
  );
}
