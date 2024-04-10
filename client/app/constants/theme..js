import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const COLORS = {
  text: '#0D0D0D',
  primary: '#F2F2F2',
  background: '#F2F2F2',
  secondary: '#8C281F',
  disable: '#8C8C87',
  button: '#D94A4A',
};

const SIZES = {
  xSmall: 10, // description, note
  small: 12, // normal text
  medium: 16, // section heading
  large: 20, // screen heading
  xLarge: 24,
  xxLarge: 44,
  height,
  width,
};

const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, SIZES, SHADOWS };
