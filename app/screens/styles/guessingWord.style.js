import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  whiteBoard: {
    flex: 1,
    width: SIZES.width,
    backgroundColor: COLORS.background,
  },

  chatBox: {
    flex: 1,
    width: SIZES.width,
    backgroundColor: COLORS.disable,
  },
});

export default styles;
