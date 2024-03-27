import { View, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const CustomDatePicker = ({ styles, label, icon, onChangeValue, value }) => {
  return (
    <View style={styles.dpContainer}>
      {icon}
      <Text style={styles.dpLabel}>{label}</Text>
      <DateTimePicker
        style={styles.dp}
        value={value}
        mode="date"
        is24Hour={false}
        display="spinner"
        onChange={onChangeValue}
      ></DateTimePicker>
    </View>
  );
};

export default CustomDatePicker;
