import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../CustomButton'

const SocialSignInButtons = () => {
    const onSignInFacebook =() =>{
        console.warn("Dữ liệu Facebook");
      }
      const onSignInGoogle =() =>{
        console.warn("Dữ liệu Google");
      }
  return (
    <>
      <CustomButton 
      text="Đăng nhập bằng Facebook" 
      onPress={onSignInFacebook}
      bgColor="#fff"
      fgColor="#1E90FF"
      />
    <CustomButton 
      text="Đăng nhập bằng Google" 
      onPress={onSignInGoogle}  
      bgColor="#fff"
      fgColor="#DD4D44"
      />
    
    </>
  )
}

export default SocialSignInButtons