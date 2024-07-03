import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.width,
  },

  btnContainer: () => ({
    borderRadius: SIZES.medium,
    width: SIZES.width - SIZES.xxLarge * 6,
    height: SIZES.xxLarge,
    alignItems: 'center',
    justifyContent: 'center',
  }),

  btnLabel: {
    fontFamily: 'sfProBold',
    fontSize: SIZES.large,
    color: 'white',
  },

  ipfContainer: {
    flexDirection: 'row',
    width: SIZES.width - SIZES.xxLarge * 2,
    alignItems: 'center',
    borderRadius: SIZES.medium,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.small,
    backgroundColor: 'white',
  },

  ipfTextInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },

  dpContainer: {
    flexDirection: 'row',
    width: SIZES.width - SIZES.xxLarge * 2,
    alignItems: 'center',
    paddingHorizontal: SIZES.small,
  },

  dpLabel: {
    paddingHorizontal: 10,
    fontSize: SIZES.medium,
    color: COLORS.disable,
  },

  dp: {
    flex: 1,
  },
  
});

export default styles;
