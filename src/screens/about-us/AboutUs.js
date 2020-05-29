import React, { Component } from 'react';
import { View, Text, Header, Left, Body, Button, Icon, Picker } from 'native-base';
import { StyleSheet, TextInput, Image, Platform, TouchableOpacity, Keyboard, Dimensions, Linking } from 'react-native';
import { connect } from 'react-redux';


import icon from '../../assets/appIcon.png';
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
        <View style={styles.container}>
            <Header style={styles.header} androidStatusBarColor={colors.clr3} iosBarStyle="dark-content" >
                <Left >
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back' style={{ color: "black" }} />
                    </Button>
                </Left>
                <Body />
            </Header>
            <View style={styles.body}>
                <TouchableOpacity onPress={() => Linking.openURL('http://beta.xpressbeauty.pk/')}  >
                    <Image source={icon} style={{ width: 80, height: 80 }} />
                    <Text style={{ fontSize: 10, textAlign: "center", width: 80 }} >version: {version.latest}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={{ borderColor: colors.primaryBtn, borderRadius: 5, borderWidth: 1, width: "80%", alignSelf: "center", padding: 3 }}>
                    <Text onPress={() => Linking.openURL('https://www.m3tech.com.pk/')} style={{ fontSize: 12, textAlign: "center" }}>Powered by M3 Technologies Pakistan (Pvt.) Ltd</Text>
                </TouchableOpacity>
            </View>
        </View>
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