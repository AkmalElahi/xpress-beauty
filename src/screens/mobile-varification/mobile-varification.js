import React from 'react';
import { View, Text, Header, Left, Body, Button, Icon } from 'native-base';
import { StyleSheet, TextInput, Image } from 'react-native';
import flag from '../../assets/flag.png'
const MobileVerify = () => (
    <View style={styles.container}>
        <Header style={styles.header} >
            <Left >
                <Button transparent>
                    <Icon name='arrow-back' style={{ color: "black" }} />
                </Button>
            </Left>
            <Body />
        </Header>
        <View style={styles.top}>
            <Text style={styles.heading}>
                ENTER YOUR PHONE NUMBER
            </Text>
            <Text style={styles.shortText}>
                You will get code via sms
            </Text>
        </View>
        <View style={styles.body}>
            <TextInput style={styles.input} placeholder="Enter your phone number" keyboardType="phone-pad" maxLength={11}/>
            <Image source={flag}  style={styles.flag} />
        </View>
    </View>
)

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
        },
        header: {
            backgroundColor: "transparent",
            elevation: 0
        },
        top: {
            height: "20%",
            marginTop: "3%",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor:"blue"
        },
        heading: {
            width: "40%",
            flexWrap: 'nowrap',
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18
        },
        shortText: {
            fontSize: 12,
            marginTop: 5
        },
        body: {
            alignItems: "center",
            // backgroundColor:"green"
        },
        input: {
            width: "75%",
            borderBottomWidth: 1,
            borderBottomColor: "grey",
            paddingLeft: "10%",
            fontSize:18,
            fontWeight:"bold"
        },
        flag:{
            width:30,
            height:20,
            position:"absolute",
            top:"30%",
            right:"80%"
        }
    }
)

export default MobileVerify;