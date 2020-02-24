import React, { Component } from 'react';
import { View, Input, Header, Text } from 'native-base';
import { ImageBackground, StyleSheet, TextInput } from 'react-native';
import { colors } from '../../configs/colors';
import { RoundButton } from '../../components/buttons/Buttons'
import CustomModal from '../../components/Modal/Modal';
import success from '../../assets/success.png'


// onChanged (text) {
//     this.setState({
//         mobile: text.replace(/[^0-9]/g, ''),
//     });
// }
class EnterOtp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opt: "",
            focus1: true,
            focus2: false,
            focus3: false,
            focus4: false,
            modalVisible:false
        }
    }

    setOtp = (text) => {
        this.setState((ps) =>
            ({ otp: ps.otp += text }))
        if (text.length === 1) {
            console.log("TEXT LENGTH", text.length)
            this.setState({
                focus1: false,
                focus2: true
            })
        }
    }
    render() {
        const { focus1, focus2, focus3, focus4, modalVisible} = this.state
        console.log("FOCUS", focus2)
        return (
            <View style={styles.container}>
                <Header transparent style={{ elevation: 0 }} />
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
                        maxLength={1}
                        style={{ ...styles.input }}
                        onChangeText={this.setOtp}
                        focus={true} />
                    <TextInput keyboardType="numeric"
                        maxLength={1}
                        style={{ ...styles.input }}
                        onChangeText={this.setOtp}
                        onSubmitEditing={() => this.setState({ focus2: false, focus3: true })}
                        focus={focus2} />
                    <TextInput keyboardType="numeric"
                        maxLength={1}
                        style={{ ...styles.input }}
                        onChangeText={this.setOtp}
                        focus={focus3} />
                    <TextInput keyboardType="numeric"
                        maxLength={1}
                        style={{ ...styles.input }}
                        onChangeText={this.setOtp}
                        focus={focus4} />
                </View>
                <View style={{ justifyContent: "space-between", width: "70%", height:200, alignSelf: "center", marginTop:"8%" }}>
                    <Text style={styles.shortText}>
                        Didn't you recieve any code?
                    </Text>
                    <RoundButton color="black" backgroundColor="white" height={60} value="Resend a new code"  />
                    <RoundButton color="white" backgroundColor={colors.primaryBtn} height={60} value="Verify" onPress={() => { this.props.navigation.navigate('Services') }}/>
                </View>
                <CustomModal modalVisible={modalVisible} 
                img={success}
                height={60}
                width={60}
                text="You have successfully logged in"/>
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
        textAlign:"center"
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

export default EnterOtp;