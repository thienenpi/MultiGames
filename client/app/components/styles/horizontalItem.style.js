import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 16,
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centeredTitleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  index: {
    fontSize: 14,
    marginRight: 8,
    opacity: 0.8,
    color: 'gray',
  },
  icon: {
    fontSize: 16,
    opacity: 0.5,
    color: 'gray',
  },
});

export default styles;