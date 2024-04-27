import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatarContainer: {
      marginRight: 12,
    },
    avatar: {
      width: 45,
      height: 45,
      borderRadius: 25,
    },
    textContainer: {
      flexDirection: 'column',
    },
    moneyContainer: {
      width: 70,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      backgroundColor: 'rgba(183, 244, 216, 0.5)',
      marginVertical: 5,
    },
    icon: {
      marginRight: 5,
      color: '#00BB00',
    },
    moneyText: {
      fontSize: 16,
      color: '#00BB00',
    },
    nameText: {
      fontSize: 16,  
      color: '#333333',
    },
    rightContainer: {
      alignItems: 'center',
    },
    eventContainer: {
      alignItems: 'center',
    },
    eventText: {
      fontSize: 14,
      color: '#333333',
    },
  });

  export default styles;