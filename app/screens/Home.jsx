import { Text, View } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CustomButton } from '../components';
import styles from './styles/home.style';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation()

const Home = ({ navigation = useNavigation()}) => {
  const { logout, userInfo } = useContext(AuthContext);
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text>Welcome {userInfo.name}</Text>
      <CustomButton
        styles={styles}
        label={'Drawing & Guessing'}
        isValid={true}
        onPress={() => navigation.navigate("Guessing Word")}
      ></CustomButton>
       <CustomButton
        styles={styles}
        label={'DrawScreen'}
        isValid={true}
        onPress={() => {
          navigation.navigate('Draw Screen')
        }}
      ></CustomButton>
    </View>
  );
};

export default Home;
