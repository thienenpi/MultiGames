import {  Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import styles from './styles/profile.style';
import { AuthContext } from '../context/AuthContext';
import { CustomButton, InputField } from '../components';
import axios from 'axios';

const Profile = () => {
  const [firstNum, setFirstNum] = useState();
  const [secondNum, setSecondNum] = useState();
  const [result, setResult] = useState();
  const { logout } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <InputField
          onChangeText={(text) => setFirstNum(text)}
          value={firstNum}
          styles={styles}
        ></InputField>
        <Text> + </Text>
        <InputField
          onChangeText={(text) => setSecondNum(text)}
          value={secondNum}
          styles={styles}
        ></InputField>
        <Text> = </Text>
        <InputField value={result} styles={styles}></InputField>
      </View>
      <CustomButton
        styles={styles}
        label="Calculate"
        isValid={true}
        onPress={() => {
          const calculate = async ({ firstNum, secondNum }) => {
            firstNum = parseInt(firstNum);
            secondNum = parseInt(secondNum);
            const url = 'https://multigames.azurewebsites.net/api/calculate';
            const data = {
              a: firstNum,
              b: secondNum,
            };

            const res = await axios.post(url, data);
            console.log(res.data)
            setResult(JSON.stringify(res.data))
          };

          calculate({ firstNum: firstNum, secondNum: secondNum });
        }}
      ></CustomButton>
      {/* <ScrollView style={styles.body}></ScrollView> */}
      <View style={{height: 20}}></View>
      {/* <CustomButton
        styles={styles}
        label={'Sign Out'}
        isValid={true}
        onPress={() => {
          logout();
        }}
      ></CustomButton> */}
    </View>
  );
};

export default Profile;
