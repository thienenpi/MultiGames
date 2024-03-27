import { View, Text, Platform } from 'react-native';
import React from 'react';
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';

const IS_ANDROID = Platform.OS == 'android';

const CustomDatePicker = ({ styles, label, icon, onChangeValue, value }) => {
  return (
    <View style={styles.dpContainer}>
      {icon}
      <Text style={styles.dpLabel}>{label}</Text>
      {/* {IS_ANDROID ? (
        <DateTimePickerAndroid></DateTimePickerAndroid>
      ) : (
        <RNDateTimePicker
          style={styles.dp}
          value={value}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeValue}
        ></RNDateTimePicker>
      )} */}
      <DateTimePickerAndroid
        style={styles.dp}
        value={value}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChangeValue}
      ></DateTimePickerAndroid>
    </View>
  );
};

export default CustomDatePicker;
