import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
  btnContainer: (backgroundColor) => ({
    backgroundColor: backgroundColor,
    borderRadius: 99,
    width: SIZES.width - SIZES.xxLarge * 2,
    height: SIZES.xxLarge,
    alignItems: 'center',
    justifyContent: 'center',
  }),

  btnLabel: {
    fontFamily: 'sfProBold',
    fontSize: SIZES.large,
    color: COLORS.text,
  },
});

export default styles;
