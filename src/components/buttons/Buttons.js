import React from 'react';
import { View, Text } from 'native-base';
import { TouchableOpacity, ImageBackground } from 'react-native';
export const RoundButton = ({ backgroundColor, color, height , value, onPress}) => (
    <TouchableOpacity style={{ height, width: "100%", backgroundColor, borderRadius: 50, alignItems: "center", justifyContent: "center" }} onPress={onPress} >
        {/* <ImageBackground source={btnimg} style={{width:"100%", height:"100%" , justifyContent:"center", alignItems:"stretch"}}>
           
     </ImageBackground> */}
        <Text style={{ textAlign: "center", alignSelf: 'center', justifyContent: "center", alignItems: "center", alignContent: "center", color }}>
            {value}
            </Text>
    </TouchableOpacity>
)

export const CustomButton = ({ backgroundColor, color, height, value, onPress }) => (
    <TouchableOpacity style={{ height, width: "100%", backgroundColor, justifyContent: "center", alignItems: "stretch" }} onPress={onPress}>
        <Text style={{ textAlign: "center", alignSelf: 'center', justifyContent: "center", alignItems: "center", alignContent: "center", color }}>
            {value}
        </Text>
    </TouchableOpacity>
)
