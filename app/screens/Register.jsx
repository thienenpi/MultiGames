import { Platform, Text, View, Keyboard, TouchableWithoutFeedback, Pressable, TextInput, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import styles from './styles/register.style';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      
      if (Platform.OS === "android") {
        toggleDatapicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatapicker();
    }
  };

  const handleSubmit = () => {
    if (checkBirthValid(dateOfBirth)) {
      const data = {
        name: name,
        email: email,
        password: password,
        birth: checkBirthEntered(dateOfBirth) ? dateOfBirth : null,
        role_id: 'a',
        status: 'a',
      };

      register({ data: data });
    } else {
      console.log('Invalid birthday');
    }
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const toggleDatapicker = () => {
    setShowPicker(!showPicker);
  };

  const checkBirthEntered = () => {
    return dateOfBirth !== '';
  };
  
  const checkBirthValid = () => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
  
    if (today.getFullYear() < birthDate.getFullYear()) {
      return false;
    } else if (today.getMonth() < birthDate.getMonth()) {
      return false;
    } else {
      return today.getDate() >= birthDate.getDate();
    }
  };

  const confirmIOSDate = () => {
    setDateOfBirth(date.toDateString());
    toggleDatapicker();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
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
        
        {showPicker && (
          <DateTimePicker
            mode="date"
            value={date}
            display="spinner"
            onChange={onChange}
          ></DateTimePicker>
        )}
        
        <Pressable
          onPress={toggleDatapicker}>
          <View style={styles.dpContainer}>
            <Ionicons name="calendar-number" size={24}></Ionicons>
            <TextInput
              style={styles.dpLabel}
              placeholder="Your birthday"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              editable={false}
              onPressIn={toggleDatapicker}>
            </TextInput>
          </View>
        </Pressable>
        
        <View style={{ height: 20 }}></View>

        {showPicker && Platform.OS === "ios" && (
          <View
            style={{ flexDirection: "row", 
             justifyContent: "space-around" }}>
            
            <CustomButton
              label={'Cancel'}
              styles={styles}
              isValid={true}
              onPress={toggleDatapicker}
            ></CustomButton>
            
            <CustomButton
              label={'Confirm'}
              styles={styles}
              isValid={true}
              onPress={confirmIOSDate}
            ></CustomButton>
          </View>
        )}

        <View style={{ height: 20 }}></View>

        <CustomButton
          label={'Create account'}
          styles={styles}
          isValid={true}
          onPress={handleSubmit}
        ></CustomButton>
        
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
