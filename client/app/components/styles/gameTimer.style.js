import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  timerContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    padding: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
  },
  timerText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
