import React, { Component } from 'react';
import { View, Input, Header, Text, Content, Container } from 'native-base';
import { ImageBackground, StyleSheet, TextInput, Platform, Keyboard } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { colors } from '../../configs/colors';
import { RoundButton } from '../../components/buttons/Buttons'
import CustomModal from '../../components/Modal/Modal';
import success from '../../assets/success.png'
import { connect } from 'react-redux';
import { VerifyOtpMiddleWare, verifyOtpForNewMobileMiddleWare } from '../../redux/verify-otp/verify-otp.middleware';
import { setUserMobile } from '../../redux/user/user.actions'
import { generateOtpMiddleWare } from '../../redux/generate-otp/generate-otp.middlewares'
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
            mobile: "",
            focused: false,
            modalVisible: false,
            freelancer: false,
            error: false,
            modalText: "",
            user_type: "",
            enable: false,
            time: 0
        }
    }
    unsubscribe = null
    componentDidMount() {
        const from = this.props.navigation.getParam("from")
        console.log("PROPS IN ENTER OTP", this.props.generateOtp, this.props.user.user_type, from)
        const { phone } = this.props.generateOtp
        const { user_type } = this.props.user
        this.setState({
            mobile: phone,
            user_type
        })
        this.resendOtp()
        // var eventTime = 1366549200; // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
        // var currentTime = 1366547400; // Timestamp - Sun, 21 Apr 2013 12:30:00 GMT
        // var diffTime = eventTime - currentTime;
        // var duration = moment.duration(diffTime * 1000, 'milliseconds');
        // var interval = 1000;

        // setInterval(function () {
        //     duration = moment.duration(duration - interval, 'milliseconds');
        //     // $('.countdown').text(duration.hours() + ":" + duration.minutes() + ":" + duration.seconds())
        //     console.log("DURATION ", duration)
        // }, interval);
    }
    verify = () => {
        unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);

            if (state.isConnected) {
                const { otp, mobile, user_type } = this.state
                const { user, verifyNumberOtp, verifyOtpForNewNumber } = this.props
                const from = this.props.navigation.getParam("from")
                if (otp.length && mobile) {
                    Keyboard.dismiss()
                    console.log("VERIFY WORKS", otp, mobile, from)
                    from === "changeNumber" ? verifyOtpForNewNumber({ otp, mobile, appuid: user.appuid, token: user.token })
                        : verifyNumberOtp({ otp, mobile, user_type })
                    unsubscribe()
                }
            }
            else {
                alert("Internet is not available")
            }
        });
        // else{
        //     this.setState({
        //         modalText: "Please Enter OTP",
        //         modalVisible:true
        //     })
        // }
    }
    resendOtp = () => {
        const { enable, mobile } = this.state
        if (enable) {
            // alert("ENABLE")
            this.props.resendOtp(mobile)
        }
        this.setState({ enable: false, time: 0 })
        let time = 60
        const t = setInterval(() => {
            // let { time } = this.state
            time = time - 1
            this.setState({
                time
            })
        }, 1000)
        setTimeout(() => {
            clearInterval(t)
            this.setState({ enable: true, time: 60 })
        }, 60000);
    }
    navigator = () => {
        const { user } = this.props
        switch (user.user_type) {
            case "customer":
                this.props.navigation.navigate("createCustomerProfile")
                return
            case "freelancer":
                this.props.navigation.navigate("createFreelancerProfile")
                return
            default:
                this.props.navigation.navigate("UserLoading")
                return
        }
    }
    navigatorForNumberChange = () => {
        const { user } = this.props
        switch (user.user_type) {
            case "customer":
                this.props.navigation.navigate("Services")
                return
            case "freelancer":
                this.props.navigation.navigate("FreelancerNotification")
                return
            default:
                this.props.navigation.navigate("UserLoading")
                return
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.verifyOtp !== this.props.verifyOtp) {
            const { verifyOtp } = this.props
            if (verifyOtp.message === "otp verified successfully") {
                console.log("ENTER OT NEXT PROPS", this.props.verifyOtp)
                this.props.setUserMobile({
                    token: this.props.verifyOtp.token,
                    mobile: this.props.verifyOtp.phone,
                    appuid: this.props.verifyOtp.appuid
                })
                this.setState({
                    modalVisible: true,
                    modalText: "Your OTP has successfully verified ",
                    error: false
                })
                setTimeout(() => {
                    this.setState({
                        modalVisible: false
                    }),
                        this.navigator()
                }, 3000)

            }
            if (verifyOtp.message === "otp for new number verified successfully") {
                console.log("ENTER OT NEXT PROPS", this.props.verifyOtp)
                this.props.setUserMobile({
                    mobile: this.props.verifyOtp.phone,
                })
                this.setState({
                    modalVisible: true,
                    modalText: "Your Phone number has changed!",
                    error: false
                })
                setTimeout(() => {
                    this.setState({
                        modalVisible: false
                    }),
                        this.navigatorForNumberChange()
                }, 3000)

            }
            else if (verifyOtp.message === "error in otp verification") {
                this.setState({ modalText: "Please Enter Valid OTP", error: true })
            }
        }
    }
    render() {
        const { modalVisible, focused, otp, modalText, error, enable, time } = this.state
        // console.log("OTP", otp)
        return (
            <Container style={{ backgroundColor: colors.greybg }}>
                <Content contentContainerStyle={styles.container}>
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
                        <TextInput keyboardType="numeric"
                            onFocus={() => this.setState({ focused: true })}
                            ref="otp1"
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
                            onKeyPress={(ev) => {
                                console.log("EVENT", ev.nativeEvent.key)
                                if (ev.nativeEvent.key === "Backspace") {
                                    let { otp } = this.state
                                    var toNull = otp.slice(0, 1)
                                    otp = otp.replace(toNull, '')
                                    this.setState({ otp })
                                }
                            }}
                            value={otp.slice(0, 1)}
                        />
                        <TextInput keyboardType="numeric"
                            onFocus={() => this.setState({ focused: true })}
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
                            onKeyPress={(ev) => {
                                if (ev.nativeEvent.key === "Backspace") {
                                    let { otp } = this.state
                                    var toNull = otp.slice(1, 2)
                                    otp = otp.replace(toNull, '')
                                    this.refs.otp1.focus();
                                    this.setState({ otp })
                                }
                            }}
                        />
                        <TextInput keyboardType="numeric"
                            onFocus={() => this.setState({ focused: true })}
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
                            onKeyPress={(ev) => {
                                if (ev.nativeEvent.key === "Backspace") {
                                    let { otp } = this.state
                                    var toNull = otp.slice(2, 3)
                                    otp = otp.replace(toNull, '')
                                    this.refs.otp2.focus();
                                    this.setState({ otp })
                                }
                            }}
                        />
                        <TextInput keyboardType="numeric"
                            onFocus={() => this.setState({ focused: true })}
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
                            onKeyPress={(ev) => {
                                if (ev.nativeEvent.key === "Backspace") {
                                    let { otp } = this.state
                                    var toNull = otp.slice(3, 4)
                                    otp = otp.replace(toNull, '')
                                    this.refs.otp3.focus();
                                    this.setState({ otp })
                                }
                            }}
                        />
                    </View>
                    {error && <Text style={{ marginTop: 5, color: "red" }}>{modalText}</Text>}
                    <View style={{ justifyContent: "space-between", width: "70%", height: 200, alignSelf: "center", marginTop: "8%" }}>
                        {/* {!focused && <Text style={styles.shortText}>
                        Didn't you recieve any code?
                    </Text>} */}
                        {/* {!focused && <RoundButton color="black" backgroundColor="white" height={60} value="Resend a new code"
                    // onPress={() =>this.props.navigation.navigate("customerApp")}
                    />} */}
                        <Text style={styles.shortText}>
                            Didn't you recieve any code?
                    </Text>
                        {!enable && <Text style={{ fontSize: 12, color: "white", textAlign: "center" }}>{time}</Text>}
                        <RoundButton
                            disabled={!enable}
                            color="black" backgroundColor="white" height={60} value="Resend a new code"
                            onPress={this.resendOtp} />
                        <RoundButton color="white" backgroundColor={colors.primaryBtn} height={60} value="Verify"
                            // onPress={()=>this.props.navigation.navigate("createCustomerProfile")}
                            onPress={this.verify}
                        />
                    </View>
                    <CustomModal modalVisible={modalVisible}
                        img={success}
                        height={60}
                        width={60}
                        text={modalText} />
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginTop: 5,
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
const mapStateToProps = ({ generateOtp, verifyOtp, user }) => ({
    generateOtp, verifyOtp, user
})
const mapDispatchToProps = dispatch => (
    {
        resendOtp: phone => dispatch(generateOtpMiddleWare(phone)),
        verifyNumberOtp: data => dispatch(VerifyOtpMiddleWare(data)),
        setUserMobile: data => dispatch(setUserMobile(data)),
        verifyOtpForNewNumber: data => dispatch(verifyOtpForNewMobileMiddleWare(data))
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(EnterOtp);