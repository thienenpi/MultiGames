import { Text, View } from 'react-native';
import React, { useContext } from 'react';
import CustomButton from '../components/CustomButton';
import styles from './styles/home.style';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
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
        }}
      ></CustomButton>
    </View>
  );
};

export default Home;
