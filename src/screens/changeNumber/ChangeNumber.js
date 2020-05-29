import React, { Component } from 'react';
import { View, Text, Header, Left, Body, Button, Icon, Picker, Title, Toast, Container, Content, Right } from 'native-base';
import { StyleSheet, TextInput, Image, Platform, TouchableOpacity, Keyboard, Dimensions } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { TextInputMask } from 'react-native-masked-text'
import { getUniqueId, getManufacturer, getModel, getProduct, getVersion, getDevice, getDeviceId } from 'react-native-device-info';
import { connect } from 'react-redux';
import { generateOtpMiddleWare, changeUserMobileMiddleWare } from '../../redux/generate-otp/generate-otp.middlewares'
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
const width = Dimensions.get('window').width
const codes = [
    "PK", "SA", "US"
]
class ChangeNumber extends Component {
    unsubscribe = null
    state = {
        modalVisible: false,
        oldPhone: "",
        newPhone: "",
        openPicker: false,
        country: ""
    }
    componentDidMount() {
        // console.log("NAVIGATION", this.props.navigation)
        if (!!this.props.countries.length) {
            this.getFlags(this.props.countries)
            return
        }
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
        const { oldPhone, country, newPhone } = this.state
        const { user } = this.props
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
                if (oldPhone.length >= 12 && newPhone.length >= 12) {
                    Keyboard.dismiss()
                    const mobile = country.dialCode + oldPhone.replace(/[^0-9]/g, '')
                    const newMobile = country.dialCode + newPhone.replace(/[^0-9]/g, '')
                    console.log("END PHONE", mobile, newMobile)
                    // alert("HIT OTP SERVICE")
                    this.props.verifyMobile({ mobile, newMobile, appuid: user.appuid, token: user.token })
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
    // componentWillUnmount(){
    //     unsubscribe()
    // }
    componentDidUpdate(prevProps) {
        // console.log("NEXT PROPS", prevProps.countries)
        if (this.props.generateOtp !== prevProps.generateOtp) {
            const { generateOtp } = this.props
            if (generateOtp.message === "otp generated successfully") {
                this.setState({ modalVisible: true })
                this.props.navigation.navigate("EnterOtp", {
                    from: "changeNumber"
                })
                setTimeout(() => {
                    this.setState({ modalVisible: false })
                }, 3000)
            }
            else if (generateOtp.message === "error in generating otp") {
                this.setState({ modalVisible: false, error: generateOtp.errMessage })
                console.log("ERROR IN GENERATE OTp")
                Toast.show({
                    text: generateOtp.errMessage,
                    textStyle: { textAlign: "center" },
                    position: "bottom",
                    type: 'warning',
                    duration: 2000
                })
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
        const { modalVisible, oldPhone, openPicker, flags, newPhone } = this.state
        // console.log("PHONE", this.state.phone)
        const { isloading } = this.props.generateOtp
        return (
            <Container contentContainerStyle={styles.container}>
                <Header style={styles.header} androidStatusBarColor="white" iosBarStyle="dark-content" >
                    <Left >
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{ color: "black" }} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 2 }}>
                        <Title style={{ color: 'black' }}>Change Number</Title>
                    </Body>
                    <Right  style={{ flex: 1 }}/>
                </Header>
                <View style={styles.top}>
                    <Text style={styles.heading}>
                        Changing your phone number will migrate your account info.
                    </Text>
                    {/* <Text style={styles.shortText}>
                        Before proceeding make sure you are able to recieve SMS and calls at your new number.
                    </Text> */}
                </View>
                <Content contentContainerStyle={{ marginTop: 5 }}>
                    <View style={styles.body}>
                        <Text style={styles.subHead}>Enter your old Phone Nnumber</Text>
                        <View style={{
                            width: "95%", borderBottomWidth: 1,
                            borderBottomColor: "grey",
                        }}>
                            {/* <TextInput
                        style={styles.input}
                        keyboardType="phone-pad" maxLength={15}
                        // onChangeText={this.verifyNumber} 
                        onChangeText={(text)=> this.setState({phone:text})} 
                    /> */}
                            <TextInputMask
                                value={oldPhone}
                                placeholder="Enter phone number"
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    // withDDD: true,
                                    dddMask: '999 999 9999'
                                }}
                                maxLength={12}
                                onChangeText={text => {
                                    console.log("TEXT", text)
                                    text.indexOf(0) === 0 && (text = text.slice(1))
                                    this.setState({
                                        oldPhone: text
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
                                    this.setState({ country: itemValue, oldPhone: "", newPhone: "" })
                                }>
                                {/* <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" /> */}
                                {flags && flags.map(flag => <Picker.Item label={`${flag.emoji} ${flag.dialCode}`} value={flag} />)}
                            </Picker>
                        </View>

                        {/* <View style={{width:"70%"}}><CustomButton color="white" backgroundColor={colors.primaryBtn} height={60} value="Submit"  /></View> */}
                        {/* <View>
                </View> */}
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.subHead}>Enter your new Phone Nnumber</Text>
                        <View style={{
                            width: "95%", borderBottomWidth: 1,
                            borderBottomColor: "grey",
                        }}>
                            {/* <TextInput
                        style={styles.input}
                        keyboardType="phone-pad" maxLength={15}
                        // onChangeText={this.verifyNumber} 
                        onChangeText={(text)=> this.setState({phone:text})} 
                    /> */}
                            <TextInputMask
                                value={newPhone}
                                placeholder="Enter phone number"
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    // withDDD: true,
                                    dddMask: '999 999 9999'
                                }}
                                maxLength={12}
                                onChangeText={text => {
                                    console.log("TEXT", text)
                                    text.indexOf(0) === 0 && (text = text.slice(1))
                                    this.setState({
                                        newPhone: text
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
                                    this.setState({ country: itemValue, oldPhone: "", newPhone: "" })
                                }>
                                {/* <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" /> */}
                                {flags && flags.map(flag => <Picker.Item label={`${flag.emoji} ${flag.dialCode}`} value={flag} />)}
                            </Picker>
                        </View>
                    </View>

                    {!!isloading ? <Loader /> :
                        <View style={{ width: "70%", alignSelf: "center", marginTop: 20 }}>
                            <CustomButton
                                backgroundColor={colors.primaryBtn}
                                height={50}
                                value='Next'
                                color='white'
                                onPress={this.verifyNumber}
                            />
                        </View>}
                </Content>
                <CustomModal
                    modalVisible={modalVisible}
                    width={60}
                    height={50}
                    img={messageOpen}
                    text="We have sent you an SMS with OTP code for your new number" />
            </Container>
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
            height: "16%",
            // marginTop: "3%",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor:"blue"
        },
        heading: {
            width: "95%",
            padding: 2,
            // flexWrap: 'nowrap',
            // textAlign: "center",
            fontWeight: "bold",
            // fontSize: 16
        },
        shortText: {
            fontSize: 12,
            marginTop: 5,
            width: "95%"
        },
        body: {
            // backgroundColor:"blue",
            marginTop: 15,
            width: "100%",
            // height: "40%",
            alignItems: "center",
            // backgroundColor:"green",
            justifyContent: "space-between"
        },
        input: {
            // width: "80%",
            paddingTop: Platform.OS === "android" ? 12 : 0,
            paddingLeft: "31%",
            marginBottom: 2,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "left"
        },
        flag: {
            // width: 90,
            // height: 50,
            width: 110,
            display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            position: "absolute",
            top: Platform.OS === "android" ? "0.5%" : -35,
            right: Platform.OS === "android" ? "70%" : "70%",
            backgroundColor: "transparent",
            // zIndex:-1,
            fontSize: 18,
            fontWeight: "bold",
            // backgroundColor:"green",
        },
        send: {
            position: "absolute",
            top: Platform.OS === "android" ? 10 : -8,
            right: Platform.OS === "android" ? 0 : 0,
        },
        subHead: {
            width: "95%"
        }
    }
)
const mapStateToProps = ({ generateOtp, countries, user }) => {
    return { generateOtp, countries, user }
}
const mapDispatchToProps = (dispatch) => ({
    verifyMobile: data => dispatch(changeUserMobileMiddleWare(data)),
    getCountries: () => dispatch(countriesMiddleware())
})
export default connect(mapStateToProps, mapDispatchToProps)(ChangeNumber);