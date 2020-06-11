import React, { Component } from 'react';
import { View, Text, Header, Left, Body, Button, Icon, Picker, Title, Right } from 'native-base';
import { StyleSheet, TextInput, Image, Platform, TouchableOpacity, Keyboard, Dimensions, Linking, ImageBackground } from 'react-native';
import { connect } from 'react-redux';


import icon from '../../assets/Logo.png';
import m3Logo from '../../assets/M3-Logo.png';
import aboutUs from '../../assets/about-us.png';

import messageOpen from '../../assets/message-open.png'
import CustomModal from '../../components/Modal/Modal';
import { CustomButton } from '../../components/buttons/Buttons';
const countriesJson = require('../../configs/countries.json')
import { colors } from '../../configs/colors'
import Loader from '../../components/loader/Loader';
import { version } from '../../configs/appversion';
// onChanged (text) {
//     this.setState({
//         mobile: text.replace(/[^0-9]/g, ''),
//     });
// }
const width = Dimensions.get('window').width

const AboutUs = ({ navigation }) => {
    return (
        <ImageBackground source={aboutUs} style={styles.container}>
            <Header style={styles.header} androidStatusBarColor={colors.clr3} iosBarStyle="dark-content" >
                <Left style={{flex:1}}>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back' style={{ color: "black" }} />
                    </Button>
                </Left>
                <Body style={{flex:0}} ><Title style={{color:'black'}}>About Us</Title></Body>
                <Right/>
            </Header>
            <View style={styles.body}>
                <TouchableOpacity style={{ alignSelf: 'center', justifyContent: "center", }} onPress={() => Linking.openURL('http://beta.xpressbeauty.pk/')}  >
                    <Image source={icon} style={{ width: 120, height: 120 }} />
                    <Text style={{ fontSize: 10, textAlign: "center", width: 135 }} >version: {version.latest}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.m3tech.com.pk/')} style={{
                    flexDirection: "row",
                    backgroundColor: 'white',
                    borderColor: colors.primaryBtn,
                    borderRadius: 15,
                    borderWidth: 1,
                    width: "85%",
                    alignSelf: "center",
                    padding: 4,
                    justifyContent: 'space-around',
                    alignItems: "center"
                }}>
                    <Image source={m3Logo} style={{ width: 20, height: 20 }} />
                    <Text  style={{ fontSize: 12, textAlign: "center" }}>Powered by M3 Technologies Pakistan (Pvt.) Ltd</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: colors.clr3,
            justifyContent: "space-between"

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
            width: "100%",
            height: "40%",
            alignItems: "center",
            // backgroundColor:"green",
            // justifyContent: "space-between"
        },
        footer: {
            justifyContent: "center",
            height: "10%"
        }
    }
)
const mapStateToProps = ({ generateOtp, countries }) => {
    console.log("STATE IN GENERATE OTP", generateOtp)
    return { generateOtp, countries }
}
const mapDispatchToProps = (dispatch) => ({
    verifyMobile: phone => dispatch(generateOtpMiddleWare(phone)),
    getCountries: () => dispatch(countriesMiddleware())
})
// export default connect(mapStateToProps, mapDispatchToProps)(MobileVerify);
export default AboutUs