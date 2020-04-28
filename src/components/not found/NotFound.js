import React from 'react'
import { Container, Content, View, Text, Card, CardItem } from 'native-base';
import { Image, StyleSheet, FlatList } from 'react-native';
import booking from '../../assets/Booking.png'
import history from '../../assets/History.png'
import { colors } from '../../configs/colors';

const NotFound = ({from}) => (
    <Container >
        <Content scrollEnabled={false} contentContainerStyle={{ height:"80%", justifyContent:"center"}}>
            {/* Image View */}
            <View style={{
                // height:"50%",
                marginTop:"5%",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <Image source={from === 'schedule' ? `${booking}` : `${history}`} style={{
                    height:120,
                    width:120
                }}/>
            </View>
            {/* Text View */}
            <View style={{
                justifyContent:"space-between",
                // backgroundColor:"blue",
                alignItems:"center",
                // width:"60%",
                marginTop:"5%",
                alignSelf:"center",
                height:"25%"
                // flex:1
            }}>
            {/* <Text style={{fontSize:25, textAlign:"center"}}>
                {from === "schedule" ? `You don't have any Bookings `: `You don't have any history `}
            </Text> */}
            {from === "schedule" && <Text style={{fontSize:22, textAlign:"center", width:280,}}>
                You don't have any Bookings
            </Text>}
            {from === "history" && <Text style={{fontSize:22, textAlign:"center", width:280,}}>
                You don't have any History
            </Text>}
            {from === "notifications" && <Text style={{fontSize:20, textAlign:"center", width:280,}}>
                You don't have any assigned jobs yet!
            </Text>}
            {/* <Text style={{color:colors.greybg, textAlign:"center"}}>
                Let's do something about that.
            </Text>
            <Text style={{color:colors.cl2}}>
                BOOK NOW
            </Text> */}

            </View>
        </Content>
    </Container>
    )

    export default NotFound