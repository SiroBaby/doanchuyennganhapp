import * as React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import IMAGES from './src/assets/images';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const LoginScreen = ({ onLogin }) => {
  const [scheduleID, setScheduleID] = useState('');
  const [vehicleID, setVehicleID] = useState('');

  const handleLoginPress = () => {
    if (!scheduleID || !vehicleID) {
      Alert.alert('Lỗi', 'Vui lòng nhập ScheduleID và VehicleID');
      return;
    }

    // Gọi endpoint với ScheduleID và VehicleID
    const url = `https://doanchuyennganhweb.onrender.com/trpc/vehicle.getBookingsByVehicleAndSchedule?input={"vehicle_id":${vehicleID},"schedule_id":${scheduleID}}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        const fetchedCustomers = data.result?.data.map((item) => ({
          fullName: item.User.full_name,
          bookingID: item.booking_id,
          status: item.booking_status,
        })) || [];
        
        // Gọi onLogin để truyền dữ liệu khách hàng lên App
        onLogin(fetchedCustomers);

        Alert.alert('Đăng nhập thành công', 'Dữ liệu khách hàng đã được tải.');
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Đăng nhập thất bại', 'Vui lòng kiểm tra lại thông tin và thử lại.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={IMAGES.LOGO} style={{ height: 300, width: 'auto', marginBottom: 100 }} />
      <TextInput
        style={styles.input}
        placeholder="ScheduleID"
        placeholderTextColor="gray"
        value={scheduleID}
        onChangeText={setScheduleID}
      />
      <TextInput
        style={styles.input}
        placeholder="VehicleID"
        placeholderTextColor="gray"
        value={vehicleID}
        onChangeText={setVehicleID}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const CheckinScreen = ({ onLogout, customers}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatedCustomers, setUpdatedCustomers] = useState(customers);
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  useEffect(() => {
    setUpdatedCustomers(customers);
  }, [customers]);

  useEffect(() => {
    setFilteredCustomers(
      updatedCustomers.filter((customer) =>
        customer.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [updatedCustomers, searchQuery]);

  const handleQRCodeScanned = ({ data }) => {
    if (data && data.includes('/checked/')) {
      const userId = data.split('/checked/')[1];

      fetch(`https://doanchuyennganhweb.onrender.com/api/checked/${userId}`, {
        method: 'POST',
      })
        .then((response) => response.json())
        .then(() => {
          setUpdatedCustomers((prevState) =>
            prevState.map((customer) =>
              customer.bookingID === parseInt(userId)
                ? { ...customer, status: 'CHECKED' }
                : customer
            )
          );
          Alert.alert('Check-in thành công', 'Người dùng đã được check-in.');
        })
        .catch((error) => {
          console.error('Error checking user:', error);
          Alert.alert('Đã có lỗi xảy ra', 'Vui lòng thử lại.');
        });
    } else {
      Alert.alert('Lỗi', 'Mã QR không hợp lệ.');
    }
  };


  return (
    <View style={styles.container1}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Nhập tên khách hàng"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.row}>
            <View style={styles.customerColumn}>
              <Text style={styles.label}>Tên Khách Hàng</Text>
              {filteredCustomers.map((customer, index) => (
                <Text key={index} style={styles.fullName}>
                  {customer.fullName}
                </Text>
              ))}
            </View>
            <View style={styles.checkInColumn}>
              <Text style={styles.label}>Check In</Text>
              {filteredCustomers.map((customer, index) => (
                <TouchableOpacity key={index} style={styles.checkInBox}>
                  {customer.status === 'CHECKED' ? (
                    <Text style={styles.checkInText}>✔</Text>
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
  
        {isScanning && (
          <View style={styles.cameraContainer}>
            <QRCodeScanner
              onRead={handleQRCodeScanned}
              flashMode={RNCamera.Constants.FlashMode.torch}
              bottomContent={
                <TouchableOpacity style={styles.buttonExit} onPress={() => setIsScanning(false)}>
                  <Text style={styles.buttonText1}>Hủy</Text>
                </TouchableOpacity>
              }
              cameraStyle={styles.cameraStyle}
            />
          </View>
          )}
          
  
        {!isScanning && (
          <View style={styles.scanButtonContainer}>
            <View style={styles.rowend}>
              <TouchableOpacity style={styles.scanButton}>
                <Image
                  source={IMAGES.HOME}
                  style={styles.image1}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.scanButton} onPress={() => setIsScanning(true)}>
                <Image
                  source={IMAGES.MAYANH}
                  style={styles.image}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.scanButton} onPress={onLogout}>
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

  const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [customers, setCustomers] = useState([]);
  
    // Định nghĩa handleLogout ở đây
    const handleLogout = () => {
      Alert.alert(
        'Xác nhận đăng xuất',
        'Bạn có muốn đăng xuất không?',
        [
          {
            text: 'Không',
            onPress: () => console.log('Đã hủy đăng xuất'),
            style: 'cancel',
          },
          {
            text: 'Có',
            onPress: () => {
              setIsLoggedIn(false);
              setCustomers([]); // Clear danh sách khách hàng khi đăng xuất
              console.log('Đã đăng xuất');
            },
          },
        ],
        { cancelable: false }
      );
    };
  
    const handleLogin = (fetchedCustomers) => {
      setCustomers(fetchedCustomers); 
      setIsLoggedIn(true);
    };
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {isLoggedIn ? (
          <CheckinScreen onLogout={handleLogout} 
          customers={customers} 
          setCustomers={setCustomers} />
        ) : (<LoginScreen onLogin={handleLogin} />)
        }
        
      </SafeAreaView>
    );
  };
  

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative',
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
    alignSelf: 'center', // Thêm thuộc tính này để căn giữa theo chiều dọc
  }, 
  checkInText: {
    fontSize: 15,
    color: 'green',
  },
  buttonExit: {
    backgroundColor: '#007AFF',
    height: 80,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 20,
    color: '#007AFF',
  },
  buttonText1: {
    fontSize: 20,
    color: '#FFF',
    marginTop : 10,
  },
  scanButtonContainer: {
    position: 'absolute',
    bottom : 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'gray',
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
    lineHeight: 20, // Thêm dòng này để căn chỉnh tên khách hàng
  }, 
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
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  cameraStyle: {
    height: '98%',
    width: '100%',  
    overflow: 'hidden',
  },
  cameraContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
  },
});

export default App;