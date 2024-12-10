import React from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';

const SwitchComponent = ({ label, value, onValueChange, emoji }) => {
  return (
    <View style={styles.switchContainer}> 
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={value ? '#f5dd4b' : '#f4f3f4'}    
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
      />
      <View style={styles.switchLabelContainer}>
        <Text style={styles.text}>{value ? 'ON' : 'OFF'}</Text>
        <Text style={styles.switchLabel}>{emoji}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    backgroundColor: 'rgba(175, 238, 238, 0.8)',
    width: 150,
    marginVertical: 10,
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
  },
  switchLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontStyle: 'normal',
    marginRight: 5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SwitchComponent;