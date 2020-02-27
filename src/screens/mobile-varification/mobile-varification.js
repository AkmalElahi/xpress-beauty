import React, { Component } from 'react';
import { View, Text, Header, Left, Body, Button, Icon } from 'native-base';
import { StyleSheet, TextInput, Image, Platform } from 'react-native';

import { connect } from 'react-redux';
import { generateOtpMiddleWare } from '../../redux/generate-otp/generate-otp.middlewares'

import flag from '../../assets/flag.png';
import messageOpen from '../../assets/message-open.png'
import CustomModal from '../../components/Modal/Modal';

// onChanged (text) {
//     this.setState({
//         mobile: text.replace(/[^0-9]/g, ''),
//     });
// }
class MobileVerify extends Component {
    state = {
        modalVisible: false,
        phone:""
    }
    componentDidMount() {
        // console.log("NAVIGATION", this.props.navigation)
        
    }
    verifyNumber = (text) => {
        text = text.replace(/[^0-9]/g, '')
        this.setState({ phone:text })
        if (text && text.length === 11) {
            this.props.verifyMobile(text)
        }


    }
    componentWillReceiveProps(nextProps){
        console.log("NEXT PROPS", nextProps.generateOtp.success)
        if(nextProps.generateOtp.success){
            this.setState({modalVisible:true})
        }
        setTimeout(()=> {
            this.setState({modalVisible:false}),
            this.props.navigation.navigate("EnterOtp")
        }, 3000)
    }
    render() {
        const { modalVisible, phone } = this.state
        return (
            <View style={styles.container}>
                <Header style={styles.header} androidStatusBarColor="white" iosBarStyle="dark-content" >
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
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad" maxLength={12}
                        value={phone}
                        onChangeText={this.verifyNumber} />
                    <Image source={flag} style={styles.flag} />
                </View>
                <CustomModal modalVisible={modalVisible}
                    width={60}
                    height={50}
                    img={messageOpen}
                    text="We have sent you an SMS with OTP code  for your number" />
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: "white"
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
            fontSize: 18,
            fontWeight: "bold"
        },
        flag: {
            width: 30,
            height: 20,
            position: "absolute",
            top: Platform.OS === "android" ? "30%" : 0,
            right: "80%",
        }
    }
)
const mapStateToProps = ({generateOtp}) => {
    console.log("STATE",generateOtp)
    return {generateOtp}
}
const mapDispatchToProps = (dispatch) => ({
    verifyMobile: phone => dispatch(generateOtpMiddleWare(phone))
})
export default connect(mapStateToProps, mapDispatchToProps)(MobileVerify);