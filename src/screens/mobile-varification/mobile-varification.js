import React, { Component } from 'react';
import { View, Text, Header, Left, Body, Button, Icon, Picker  } from 'native-base';
import { StyleSheet, TextInput, Image, Platform , TouchableOpacity, Keyboard } from 'react-native';

import { connect } from 'react-redux';
import { generateOtpMiddleWare } from '../../redux/generate-otp/generate-otp.middlewares'
import {countriesMiddleware } from '../../redux/countries/countries.middleware'

import flag from '../../assets/flag.png';
import messageOpen from '../../assets/message-open.png'
import CustomModal from '../../components/Modal/Modal';
import { CustomButton } from '../../components/buttons/Buttons';
const countriesJson = require('../../configs/countries.json')
import {colors} from '../../configs/colors'
// onChanged (text) {
//     this.setState({
//         mobile: text.replace(/[^0-9]/g, ''),
//     });
// }
const codes = [
    "PK", "SA", "US"
]
class MobileVerify extends Component {
    state = {
        modalVisible: false,
        phone: "",
        openPicker:false,
        country:""
    }
    componentDidMount() {
        // console.log("NAVIGATION", this.props.navigation)
        
        this.props.getCountries()
    }
    verifyNumber = () => {
        // text = text.replace(/[^0-9]/g, '')
        Keyboard.dismiss()
        const {phone} = this.state
        if (phone.length >= 12) {
            this.props.verifyMobile(phone)
            // console.log("VERIFICATION")
            // this.props.navigation.navigate("MapView")

        }
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
            this.setState({ modalVisible: true })
            this.props.navigation.navigate("EnterOtp")
        setTimeout(() => {
            this.setState({ modalVisible: false })
        }, 3000)
    }
    if(this.props.countries !== prevProps.countries ){
        this.getFlags(this.props.countries)
    }
    }
    getFlags = ({countries}) =>{
       if(countries.length){
        const flags =  countries.map(country =>  countriesJson.find(countryJson => countryJson.code === country.code))
        console.log("FLAGAS", flags)
        this.setState({
            flags,
            country:flags[0],
            phone:flags[0].dialCode
        })
       }
    }
    render() {
        const { modalVisible, phone, openPicker , flags } = this.state
        // console.log("COUNTRIES", this.props.countries)
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
                   <View style={{height:"100%", width:"80%"}}>
                   <TextInput
                        style={styles.input}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad" maxLength={15}
                        value={phone}
                        // onChangeText={this.verifyNumber} 
                        onChangeText={(text)=> this.setState({phone:text})} 
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
                        // style={{width:"100%"}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ country: itemValue,  phone:itemValue.dialCode })
                        }>
                        {/* <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" /> */}
                        {flags && flags.map(flag => <Picker.Item label={`${flag.emoji}`} value={flag}/>)}
                    </Picker>
                    <Icon  name="send" style={styles.send} onPress={this.verifyNumber}/>
                   </View>
                    {/* <View style={{width:"70%"}}><CustomButton color="white" backgroundColor={colors.primaryBtn} height={60} value="Submit"  /></View> */}
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
            width:"100%",
            height:"20%",
            alignItems: "center",
            // backgroundColor:"green",
            justifyContent:"space-between"
        },
        input: {
            // width: "80%",
            borderBottomWidth: 1,
            borderBottomColor: "grey",
            paddingLeft: "10%",
            fontSize: 18,
            fontWeight: "bold",
            // backgroundColor:"green"
        },
        flag: {
            // width: 35,
            height: 50,
            width:85,
            position: "absolute",
            top: Platform.OS === "android" ? "0.5%" : -35,
            right: Platform.OS === "android" ? "75%" : "75%",
            backgroundColor:"transparent",
            // zIndex:-1,
            // backgroundColor:"green"
        },
        send:{
            position:"absolute", 
            top: Platform.OS === "android" ? 10 : -8,
            right:Platform.OS === "android" ? 0 :0,
        }
    }
)
const mapStateToProps = ({ generateOtp, countries }) => {
    console.log("STATE", generateOtp)
    return { generateOtp, countries }
}
const mapDispatchToProps = (dispatch) => ({
    verifyMobile: phone => dispatch(generateOtpMiddleWare(phone)),
    getCountries: () => dispatch(countriesMiddleware())
})
export default connect(mapStateToProps, mapDispatchToProps)(MobileVerify);