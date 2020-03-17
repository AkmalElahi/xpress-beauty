import React from 'react'
import { Container, Content, View, Text, Card, CardItem } from 'native-base';
import { Image, StyleSheet, FlatList } from 'react-native';
import clock from '../../assets/clock.png'
import facial from '../../assets/facial.png'
import { colors } from '../../configs/colors';

const NotFound = ({from}) => (
    <Container >
        <Content scrollEnabled={false} >
            {/* Image View */}
            <View style={{
                // height:"50%",
                marginTop:"5%",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <Image source={from === 'schedule' ? `${clock}` : `${facial}`} style={{
                    height:200,
                    width:200
                }}/>
            </View>
            {/* Text View */}
            <View style={{
                justifyContent:"space-between",
                alignItems:"center",
                width:"60%",
                marginTop:"5%",
                alignSelf:"center",
                height:"50%"
            }}>
            <Text style={{fontSize:25, textAlign:"center"}}>
                {from === "schedule" ? `You don't have any Bookings `: `You don't have any history `}
            </Text>
            <Text style={{color:colors.greybg}}>
                Let's do something about that.
            </Text>
            <Text style={{color:colors.cl2}}>
                BOOK NOW
            </Text>

            </View>
        </Content>
    </Container>
    )

    export default NotFound