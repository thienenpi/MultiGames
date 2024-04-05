import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';

const InputField = ({
  styles,
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText,
  onSubmitEditing,
}) => {
  return (
    <View style={styles.ipfContainer}>
      {icon}
      {inputType === 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={styles.ipfTextInput}
          secureTextEntry={true}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          autoCapitalize="none"
        ></TextInput>
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={styles.ipfTextInput}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          autoCapitalize="none"
        ></TextInput>
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{}}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputField;
