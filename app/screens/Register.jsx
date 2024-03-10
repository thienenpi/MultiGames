import { Text, View } from 'react-native';
import React from 'react';
import styles from './styles/register.style';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

const Register = () => {
  return (
    <View style={styles.container}>
      <Text>Register Screen</Text>

      <InputField label={'Your name'} styles={styles}></InputField>

      <View style={{ height: 20 }}></View>

      <InputField label={'Email'} styles={styles}></InputField>

      <View style={{ height: 20 }}></View>

      <InputField label={'Password'} styles={styles}></InputField>

      <View style={{ height: 20 }}></View>

      <CustomButton
        label={'Create account'}
        styles={styles}
        isValid={true}
      ></CustomButton>
    </View>
  );
};

export default Register;
