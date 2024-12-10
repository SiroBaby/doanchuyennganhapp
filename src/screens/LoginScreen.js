import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import IMAGES from '../assets/images';

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={IMAGES.LOGO} style={{ height: 300, width: 'auto', marginBottom: 100 }} />
      <TextInput
        style={styles.input}
        placeholder="SchemaID"
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="VehicleID"
        placeholderTextColor="gray"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={() => { /* Thêm logic đăng nhập ở đây */ }}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    maxHeight: 50,
    minHeight: 50,
    fontSize: 16,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default LoginScreen;