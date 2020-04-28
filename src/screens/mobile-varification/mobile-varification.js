import React, { Component } from 'react';
import { View, Text, Header, Left, Body, Button, Icon, Picker } from 'native-base';
import { StyleSheet, TextInput, Image, Platform, TouchableOpacity, Keyboard } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { TextInputMask } from 'react-native-masked-text'
import { getUniqueId, getManufacturer, getModel, getProduct, getVersion, getDevice, getDeviceId } from 'react-native-device-info';
import { connect } from 'react-redux';
import { generateOtpMiddleWare } from '../../redux/generate-otp/generate-otp.middlewares'
import { countriesMiddleware } from '../../redux/countries/countries.middleware'

import flag from '../../assets/flag.png';
import messageOpen from '../../assets/message-open.png'
import CustomModal from '../../components/Modal/Modal';
import { CustomButton } from '../../components/buttons/Buttons';
const countriesJson = require('../../configs/countries.json')
import { colors } from '../../configs/colors'
import Loader from '../../components/loader/Loader';
// onChanged (text) {
//     this.setState({
//         mobile: text.replace(/[^0-9]/g, ''),
//     });
// }
const codes = [
    "PK", "SA", "US"
]
class MobileVerify extends Component {
    unsubscribe = null
    state = {
        modalVisible: false,
        phone: "",
        openPicker: false,
        country: ""
    }
    componentDidMount() {
        // console.log("NAVIGATION", this.props.navigation)

        this.props.getCountries()
    //    
    //     console.log(Platform.Version)
    //    console.log("Model", getModel())
    //    console.log("DEVICE",getDeviceId())
    //    getDeviceId().then(device => {
    //   });
    }
    verifyNumber = () => {
        // text = text.replace(/[^0-9]/g, '')
        const { phone, country } = this.state
        // if (phone.length >= 12) {
        //     const endphone = country.dialCode + phone.replace(/[^0-9]/g, '')
        //     console.log("END PHONE", endphone)
        //     // this.props.verifyMobile(phone)
        //     // console.log("VERIFICATION")
        //     // this.props.navigation.navigate("MapView")
            
        // }
        unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);
            
            if (state.isConnected) {
                if (phone.length >= 12) {
                    Keyboard.dismiss()
                    const endphone = country.dialCode + phone.replace(/[^0-9]/g, '')
                    console.log("END PHONE", endphone)
                    // alert("HIT OTP SERVICE")
                    unsubscribe()
                    this.props.verifyMobile(endphone)
                    // console.log("VERIFICATION")
                    // this.props.navigation.navigate("MapView")

                }
            }
            else {
                alert("Internet in not available")
            }
        });
    }
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     console.log("NEXT PROPS", nextProps)
    //     if (nextProps.generateOtp.success) {
    //         this.setState({ modalVisible: true })
    //         this.props.navigation.navigate("EnterOtp")
    //     setTimeout(() => {
    //         this.setState({ modalVisible: false })
    //     }, 3000)
    //     return
    // }
    // if(nextProps.countries){
    //     this.getFlags(nextProps.countries)
    //     return
    // }
    // }
    // static getDerivedStateFromProps(props, state){
    //     if(props.countries){
    //         console.log("DERIVED STATE")
    //         return { countries: props.countries}
    //     }
    // }
    componentDidUpdate(prevProps) {
        // console.log("NEXT PROPS", prevProps.countries)
        if (this.props.generateOtp !== prevProps.generateOtp) {
            const { generateOtp } = this.props
            if(generateOtp.message === "otp generated successfully"){
                this.setState({ modalVisible: true })
                this.props.navigation.navigate("EnterOtp")
                setTimeout(() => {
                    this.setState({ modalVisible: false })
                }, 3000)
            }
            else if (generateOtp.message === "error in generating otp"){
                this.setState({modalVisible:false, error:generateOtp.message})
            }
        }
        if (this.props.countries !== prevProps.countries) {
            this.getFlags(this.props.countries)
        }
    }
    getFlags = ({ countries }) => {
        if (countries.length) {
            const flags = countries.map(country => countriesJson.find(countryJson => countryJson.code === country.code))
            // console.log("FLAGAS", flags)
            this.setState({
                flags,
                country: flags[0],
                // phone: flags[0].dialCode
            })
        }
    }
    render() {
        const { modalVisible, phone, openPicker, flags } = this.state
        // console.log("COUNTRIES", this.state.country)
        const {isloading} = this.props.generateOtp
        return (
            <View style={styles.container}>
                <Header style={styles.header} androidStatusBarColor="white" iosBarStyle="dark-content" >
                    <Left >
                        <Button transparent onPress={()=> this.props.navigation.goBack()}>
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
                    <View style={{
                        width: "80%", borderBottomWidth: 1,
                        borderBottomColor: "grey"
                    }}>
                        {/* <TextInput
                        style={styles.input}
                        keyboardType="phone-pad" maxLength={15}
                        // onChangeText={this.verifyNumber} 
                        onChangeText={(text)=> this.setState({phone:text})} 
                    /> */}
                        <TextInputMask
                            value={phone}
                            placeholder="Enter phone number"
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                // withDDD: true,
                                dddMask: '999 999 9999'
                            }}
                            maxLength={13}
                            value={phone}
                            onChangeText={text => {
                                console.log("TEXT", text)
                                text.indexOf(0) === 0 && (text = text.slice(1))
                                this.setState({
                                    phone: text
                                })
                            }}
                            style={styles.input}
                        />
                        {/* <TouchableOpacity style={styles.flag} onPress={()=>this.setState({openPicker:true})}> */}
                        {/* <TE source={flag} style={styles.flag} /> */}
                        {/* <Text>{countries.find(country => country.code === "PK").emoji}</Text> */}
                        {/* <Text>{this.state.country.emoji}</Text> */}
                        {/* </TouchableOpacity> */}
                        <Picker
                            mode='dialog'
                            selectedValue={this.state.country}
                            style={styles.flag}
                            itemTextStyle={{
                                fontSize: 16,
                                fontWeight: "bold", textAlign: "center"
                            }}
                            textStyle={{
                                fontSize: 18,
                                fontWeight: "bold", textAlign: "center"
                            }}
                            // style={{width:"100%"}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ country: itemValue, phone: "" })
                            }>
                            {/* <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" /> */}
                            {flags && flags.map(flag => <Picker.Item label={`${flag.emoji} ${flag.dialCode}`} value={flag} />)}
                        </Picker>
                        {!isloading && <Icon name="send" style={styles.send} onPress={this.verifyNumber} />}
                    </View>
                    {/* <View style={{width:"70%"}}><CustomButton color="white" backgroundColor={colors.primaryBtn} height={60} value="Submit"  /></View> */}
                {isloading && <Loader/>}
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
            backgroundColor: "white",

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
            // backgroundColor:"green",
            width: "100%",
            height: "20%",
            alignItems: "center",
            // backgroundColor:"green",
            justifyContent: "space-between"
        },
        input: {
            // width: "80%",
            paddingTop:Platform.OS === "android" ? 12 : 0,
            paddingLeft: "25%",
            marginBottom: 2,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "left"
        },
        flag: {
            // width: 90,
            // height: 50,
            width: 115,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: Platform.OS === "android" ? "0.5%" : -35,
            right: Platform.OS === "android" ? "60%" : "70%",
            backgroundColor: "transparent",
            // zIndex:-1,
            fontSize: 18,
            fontWeight: "bold",
            // backgroundColor:"green"
        },
        send: {
            position: "absolute",
            top: Platform.OS === "android" ? 10 : -8,
            right: Platform.OS === "android" ? 0 : 0,
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
export default connect(mapStateToProps, mapDispatchToProps)(MobileVerify);