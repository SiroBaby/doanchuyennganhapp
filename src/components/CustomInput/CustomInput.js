import { View, TextInput, Text,onInputChange, StyleSheet } from 'react-native';
import React from 'react';

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, errorMessage }) => {
  const handleInputChange = (text) => {
    setValue(text);
    // Xóa errorMessage khi giá trị thay đổi
    if (errorMessage) {   
      onInputChange && onInputChange();
    }
  };
  const handleInputFocus = () => {
    // Xóa errorMessage khi TextInput được tập trung (focus)
    if (errorMessage) {
      onInputChange && onInputChange();
    }
  };
  return (
    <View style={[styles.container, errorMessage && styles.errorContainer]}>
      <TextInput
        value={value}
        onChangeText={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  input: {},
  errorContainer: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
  },
});

export default CustomInput;