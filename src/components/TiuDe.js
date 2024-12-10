import React from "react";
import { Text, View } from "react-native";

const TiuDe = ({ tie }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
            <View><Text style={{ color: 'black', fontWeight: 'bold' }}>{tie}</Text></View>
            <View><Text>Xem Thêm</Text></View>
        </View>
    );
};

export default TiuDe;
