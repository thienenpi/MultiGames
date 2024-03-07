import { Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from './styles/login.style';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    login()
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>

      <InputField
        styles={styles}
        label={'Email'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
        onSubmitEditing={handleSubmit}
      ></InputField>

      <View style={{ height: 20 }}></View>

      <InputField
        styles={styles}
        label={'Password'}
        inputType={'password'}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
        onSubmitEditing={handleSubmit}
      ></InputField>

      <View style={{ height: 20 }}></View>

      <CustomButton
        styles={styles}
        isValid={true}
        label={'Login'}
        onPress={() => {
          login();
        }}
      ></CustomButton>

      <View style={{ height: 20 }}></View>

      <CustomButton
        styles={styles}
        isValid={true}
        label={'Register'}
      ></CustomButton>
    </View>
  );
};

export default Login;
