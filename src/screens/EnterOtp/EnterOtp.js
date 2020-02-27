import React, { Component } from 'react';
import { View, Input, Header, Text } from 'native-base';
import { ImageBackground, StyleSheet, TextInput, Platform } from 'react-native';
import { colors } from '../../configs/colors';
import { RoundButton } from '../../components/buttons/Buttons'
import CustomModal from '../../components/Modal/Modal';
import success from '../../assets/success.png'
import { connect } from 'react-redux';
import { VerifyOtpMiddleWare } from '../../redux/verify-otp/verify-otp.middleware';


// onChanged (text) {
//     this.setState({
//         mobile: text.replace(/[^0-9]/g, ''),
//     });
// }
class EnterOtp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: "",
            focus1: true,
            focus2: false,
            focus3: false,
            focus4: false,
            modalVisible: false,
            freelancer: false
        }
    }
    render() {
        const { modalVisible, freelancer, focused, otp } = this.state
        console.log("OTP", otp)
        return (
            <View style={styles.container}>
                <Header transparent style={{ elevation: 0 }} androidStatusBarColor={colors.greybg} iosBarStyle="light-content" />
                <View style={styles.top}>
                    <Text style={styles.heading}>
                        Phone Verification
                    </Text>
                    <Text style={styles.shortText}>
                        Enter Your 4 digit OTP code here
                    </Text>
                </View>
                <View style={styles.otp}>
                    <TextInput keyboardType="number-pad"
                        onFocus={() => this.setState({ focused: true })}
                        maxLength={1}
                        style={{ ...styles.input }}
                        onChangeText={value => {
                            const num = value.replace(/[^0-9]/g, '')
                            if (num) {
                                let otp = this.state.otp
                                otp = otp + num
                                this.refs.otp2.focus();
                                this.setState({ otp })
                            }

                        }}
                        value={otp.slice(0, 1)}
                    />
                    <TextInput keyboardType="numeric"
                        maxLength={1}
                        style={{ ...styles.input }}
                        ref="otp2"
                        value={otp.slice(1, 2)}
                        onChangeText={value => {
                            const num = value.replace(/[^0-9]/g, '')
                            if (num) {
                                let otp = this.state.otp
                                otp = otp + num
                                this.refs.otp3.focus();
                                this.setState({ otp })
                            }

                        }}
                    />
                    <TextInput keyboardType="numeric"
                        maxLength={1}
                        style={{ ...styles.input }}
                        ref="otp3"
                        value={otp.slice(2, 3)}
                        onChangeText={value => {
                            const num = value.replace(/[^0-9]/g, '')
                            if (num) {
                                let otp = this.state.otp
                                otp = otp + num
                                this.refs.otp4.focus();
                                this.setState({ otp })
                            }

                        }}
                    />
                    <TextInput keyboardType="numeric"
                        maxLength={1}
                        style={{ ...styles.input }}
                        ref="otp4"
                        value={otp.slice(3, 4)}
                        onChangeText={value => {
                            const num = value.replace(/[^0-9]/g, '')
                            if (num) {
                                let otp = this.state.otp
                                otp = otp + num
                                this.setState({ otp })
                            }

                        }}
                    />
                </View>
                <View style={{ justifyContent: "space-between", width: "70%", height: 200, alignSelf: "center", marginTop: "8%" }}>
                    {!focused && <Text style={styles.shortText}>
                        Didn't you recieve any code?
                    </Text>}
                    {!focused && <RoundButton color="black" backgroundColor="white" height={60} value="Resend a new code" />}
                    <RoundButton color="white" backgroundColor={colors.primaryBtn} height={60} value="Verify" onPress={() => { this.props.navigation.navigate(freelancer ? 'RegisterFreelancer' : 'Register') }} />
                </View>
                <CustomModal modalVisible={modalVisible}
                    img={success}
                    height={60}
                    width={60}
                    text="You have successfully logged in" />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.greybg,
        alignItems: "center"
    },
    top: {
        height: "20%",
        marginTop: "3%",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor:"blue"
    },
    heading: {
        width: "100%",
        flexWrap: 'nowrap',
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 22,
        color: "white"
    },
    shortText: {
        fontSize: 12,
        marginTop: 10,
        color: "white",
        textAlign: "center"
    },
    otp: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "85%",
    },
    input: {
        width: "18%",
        borderBottomWidth: 1,
        borderBottomColor: "white",
        fontSize: 25,
        textAlign: "center",
        color: "white"
    }
})
const mapStateToProps = ({ generateOtp }) => (
    {
        generateOtp
    }
)
const mapDispatchToProps = dispatch => (
    {
        verifyOtp: data => dispatch(VerifyOtpMiddleWare(data))
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(EnterOtp);