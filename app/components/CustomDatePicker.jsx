import { View, Text } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';


const CustomDatePicker = ({ styles, label, icon, onChangeValue, value }) => {
  return (
    <View style={styles.dpContainer}>
      {icon}
      <Text style={styles.dpLabel}>{label}</Text>
      <RNDateTimePicker
        style={styles.dp}
        value={value}
        mode="date"
        is24Hour={false}
        display="default"
        onChange={onChangeValue}
      ></RNDateTimePicker>
    </View>
  );
};

export default CustomDatePicker;
