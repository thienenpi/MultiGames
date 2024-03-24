import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from './styles/login.style';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const data = {
      email: email,
      password: password,
    };

    login({ data: data });
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <Text>Login Screen</Text>

        <InputField
          icon={<Ionicons name="mail" size={24}></Ionicons>}
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
          icon={<Ionicons name="keypad" size={24}></Ionicons>}
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
            handleSubmit();
          }}
        ></CustomButton>

        <View style={{ height: 20 }}></View>

        <CustomButton
          styles={styles}
          isValid={true}
          label={'Register'}
          onPress={() => navigation.navigate('Register')}
        ></CustomButton>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
