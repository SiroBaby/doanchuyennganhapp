import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
const Header = ()=>{
    return (
    <View style ={styles.container}>
        <View >
            <Text style={styles.title}> Nhom2day </Text>
        </View>
        <View>
            <Image source={require('../assets/images/logo.png')}/>
        </View>
    </View>  
    );
}
const styles = StyleSheet.create({
    container :{
        marginTop:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    title:{
        color:'#505254',
        fontWeight:'700',
        fontSize:14,
        textTransform:'uppercase'
    }
})

export default Header;