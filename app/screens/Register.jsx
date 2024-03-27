import { ScrollView, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import styles from './styles/register.style';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import CustomDatePicker from '../components/CustomDatePicker';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const checkBirthEntered = (birth) => {
  const today = new Date();

  return !(
    today.getDate() === birth.getDate() &&
    today.getMonth() === birth.getMonth() &&
    today.getFullYear() === birth.getFullYear()
  );
};

const checkBirthValid = (birth) => {
  const today = new Date();

  if (today.getFullYear() < birth.getFullYear()) {
    return false;
  } else if (today.getMonth() < birth.getMonth()) {
    return false;
  } else {
    return today.getDate() >= birth.getDate();
  }
};

const Register = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birth, setBirth] = useState(new Date());

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || birth;
    setBirth(currentDate);
    console.log(currentDate);
  };

  const handleSubmit = () => {
    if (checkBirthValid(birth)) {
      const data = {
        name: name,
        email: email,
        password: password,
        birth: checkBirthEntered(birth) ? birth : null,
        role_id: 'a',
        status: 'a',
      };

      register({ data: data });
    } else {
      console.log('Invalid birthday');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register Screen</Text>

      <InputField
        icon={<Ionicons name="person" size={24}></Ionicons>}
        label={'Your (user)name'}
        styles={styles}
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        onSubmitEditing={handleSubmit}
      ></InputField>

      <View style={{ height: 20 }}></View>

      <InputField
        icon={<Ionicons name="mail" size={24}></Ionicons>}
        label={'Email'}
        value={email}
        styles={styles}
        keyboardType={'email-address'}
        onChangeText={(text) => {
          setEmail(text);
        }}
        onSubmitEditing={handleSubmit}
      ></InputField>

      <View style={{ height: 20 }}></View>

      <InputField
        icon={<Ionicons name="keypad" size={24}></Ionicons>}
        label={'Password'}
        value={password}
        styles={styles}
        inputType={'password'}
        onChangeText={(text) => {
          setPassword(text);
        }}
        onSubmitEditing={handleSubmit}
      ></InputField>

      <View style={{ height: 20 }}></View>

      <CustomDatePicker
        icon={<Ionicons name="calendar-number" size={24}></Ionicons>}
        label="Your birthday"
        styles={styles}
        value={birth}
        onChangeValue={onChangeDate}
      ></CustomDatePicker>

      <View style={{ height: 20 }}></View>

      <CustomButton
        label={'Create account'}
        styles={styles}
        isValid={true}
        onPress={handleSubmit}
      ></CustomButton>
    </View>
  );
};

export default Register;
