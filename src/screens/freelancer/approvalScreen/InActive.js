import React from 'react'
import { Container, Content, View, Text, } from 'native-base';
import { Image, } from 'react-native';
import booking from '../../../assets/Booking.png'
import history from '../../../assets/History.png'
import { colors } from '../../../configs/colors';

const InActive = ({ from }) => (
    <View style={{justifyContent: "center", flex: 1 }}>
        <View style={{
            // height:"50%",
            // marginTop: "5%",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor:"green"
        }}>
            <Image source={booking} style={{
                height: 150,
                width: 150
            }} />
        </View>
        {/* Text View */}
        <View style={{
            // justifyContent:"space-between",
            alignItems: "center",
            width: "80%",
            marginTop: "5%",
            alignSelf: "center",
            // height: "50%"
        }}>
            <Text style={{ fontSize: 25, textAlign: "center" }}>
                Alert!
            </Text>
            <Text style={{ color: colors.greybg, textAlign:"center" }}>
                You are currently inactive.
            </Text>
            <Text style={{ color: colors.greybg, textAlign:"center" }}>
                Please toggle the button on top to make yourself active on work.
            </Text>
        </View>
    </View>
)

export default InActive