import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import IMAGES from '../assets/images';
const CheckInScreen = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    requestCameraPermission();
  }, []);
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const handleLogout = (query) => {
    Logout(query);
  };
  const handleHome = (query) => {
    Home(query);
  };
  const requestCameraPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.CAMERA);
    if (result !== RESULTS.GRANTED) {
      Alert.alert("Cần cấp quyền camera để quét mã QR.");
    }
  };

  const handleQRCodeScanned = (qrData) => {
    // Extract ID from QR Code URL
    const userId = qrData.split('/checked/')[1];
  
    // Gửi POST request tới server
    fetch(`https://doanchuyennganhweb.onrender.com/api/checked/${userId}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('User checked successfully:', data);
      })
      .catch((error) => {
        console.error('Error checking user:', error);
      });
  };

  const handleScanPress = () => {
    setIsScanning(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <View style={styles.findCustomer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Nhập tên khách hàng"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.customerColumn}>
            <Text style={styles.label}>Tên Khách Hàng</Text>
            <Text style={styles.fullName}>Nguyễn Văn A</Text>
            <Text style={styles.fullName}>Nguyễn Văn B</Text>
            <Text style={styles.fullName}>Nguyễn Văn C</Text>
            <Text style={styles.fullName}>Nguyễn Văn D</Text>
          </View>
          <View style={styles.checkInColumn}>
            <Text style={styles.label}>Check In</Text>
            <TouchableOpacity style={styles.checkInBox}>
              {isCheckedIn ? <Text style={styles.checkInText}>✔</Text> : null}
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkInBox}>
              {isCheckedIn ? <Text style={styles.checkInText}>✔</Text> : null}
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkInBox}>
              {isCheckedIn ? <Text style={styles.checkInText}>✔</Text> : null}
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkInBox}>
              {isCheckedIn ? <Text style={styles.checkInText}>✔</Text> : null}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {isScanning && (
        <QRCodeScanner
            onRead={handleQRCodeScanned}
            topContent={<Text style={styles.qrText}>Quét mã QR</Text>}
            bottomContent={
              <TouchableOpacity style={styles.button} onPress={() => setIsScanning(false)}>
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
          }
        />
      )}

      {!isScanning && (
        <View style={styles.scanButtonContainer}>
          <View style={styles.rowend}>
            <TouchableOpacity style={styles.scanButton} onPress={handleHome}>
              <Image
                source={IMAGES.HOME}
                style={styles.image1}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
            <Image
              source={IMAGES.MAYANH}
              style={styles.image}
              resizeMode="contain"
            />
            </TouchableOpacity>
            <TouchableOpacity style={styles.scanButton} onPress={handleLogout}>
            <Image
              source={IMAGES.PROFILE}
              style={styles.image1}
              resizeMode="contain"
            />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
  },
  searchInput: { 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 5, 
    paddingHorizontal: 10,
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  rowend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
  },
  customerColumn: { 
    justifyContent: 'center', 
    alignItems: 'flex-start',
  },
  checkInColumn: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
  },
  image1: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  checkInBox: {
    width: 20,
    height: 20,
    margin: 10,
    marginRight: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  checkInText: {
    fontSize: 24,
    color: 'green',
  },
  qrText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#007AFF',
  },
  scanButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'gray',
    marginTop: 590,
  },
  scanButton: {
    padding: 10,
  },
  scanButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  fullName: {
    fontSize: 16,
    margin: 10,
    marginLeft: 35,
  },
});

export default CheckInScreen;
