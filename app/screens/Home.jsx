import { Text, View } from 'react-native';
import React, { useContext } from 'react';
import CustomButton from '../components/CustomButton';
import styles from './styles/home.style';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
const Home = ({ navigation = useNavigation() }) => {
  const { logout, userInfo } = useContext(AuthContext);
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text>Welcome {userInfo.name}</Text>
      <CustomButton
        styles={styles}
        label={'Sign Out'}
        isValid={true}
        onPress={() => {
          logout();
        }}/>
        <CustomButton
          styles={styles}
          label={'Go to SpyGame'}
          isValid={true}
          onPress={() => navigation.navigate('Spy Game')}
        />
    </View>
  );
};

export default Home;
