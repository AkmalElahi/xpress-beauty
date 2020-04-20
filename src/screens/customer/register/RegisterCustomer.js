import React, { Component, useState } from 'react';
import { ImageBackground, StyleSheet, Image, Dimensions, StatusBar, Platform, Keyboard, } from 'react-native';
import moment from "moment";
import { Header, Left, Button, Icon, Body, View, Container, Content, Text, Form, Item, Input, DatePicker, Label, CheckBox } from 'native-base'
import { getUniqueId, getManufacturer, getModel, getDeviceId } from 'react-native-device-info';
import { colors } from '../../../configs/colors'
import bg from '../../../assets/registerbg.png';
import location from '../../../assets/location.png';
import profile from '../../../assets/profile.png';
import { RoundButton } from '../../../components/buttons/Buttons';
import { connect } from 'react-redux';
import { setUserProfile, getCurrentUser } from '../../../redux/user/user.actions'
import { userMiddleWare } from '../../../redux/user/user.middlewares'
import Loader from '../../../components/loader/Loader';
import CustomModal from '../../../components/Modal/Modal';
import success from '../../../assets/success.png'


const width = Dimensions.get('window').width;


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showHide: false,
            username: "",
            email: "",
            dob: "",
            model: "",
            device_id: "",
            os: "",
            device: "",
            platform: "",
            house: "",
            building: "",
            street: "",
            area: "",
            city: "",
            submitted: false,
            modalVisible: false,
            checked: false
        }
    }
    componentDidMount() {
        console.log("USER IN REGISTER", this.props.user)
        const device_id = getUniqueId()
        const model = getModel()
        const os = Platform.Version
        const platform = Platform.OS
        const device = getDeviceId()
        this.setState({
            username: this.props.user.username,
            email: this.props.user.email,
            dob: this.props.user.dob,
            device_id,
            model,
            os,
            platform,
            device
        })
        // const device_id = getUniqueId()
        // const model = getModel()
        // const os = Platform.Version
        // const platform = Platform.OS
        // const device = getDevice()
        // this.setState({
        //     device_id,
        //     model,
        //     os,
        //     platform,
        //     device
        // })

    }
    setDate = (date) => {
        Keyboard.dismiss()
        console.log("DATE", moment(date).format('YYYY-MM-DD'))
        // if(Platform.OS==="android"){date = date.toString()}
        // alert(date)
        date = moment(date).format('YYYY-MM-DD')
        this.setState({ dob: date })
    }
    continue = () => {
        const { username, email, dob, checked, device_id, model, os, platform, device } = this.state
        this.setState({ submitted: true })
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // console.log(reg.test(email))
        if (username && username.length && email && email.length && dob && checked) {
            if (reg.test(email)) {
                console.log("every field exists")
                this.props.createProfile({
                    device, device_id, platform, model, os, user: {
                        username,
                        email,
                        dob, appuid: this.props.user.appuid,
                        token:this.props.user.token,
                        user_type:this.props.user.user_type
                    }
                })
                // this.props.navigation.navigate("MapView")
            }
            else {
                this.setState({
                    email: ""
                })
            }
        }
    }
    componentDidUpdate(prevProps) {
        const { user } = this.props
        if (user !== prevProps.user) {
            if (user.message === "user profile created successfully") {
                // this.props.setProfile({ username: user.username, email: user.email, dob: user.dob })
                this.setState({
                    modalVisible: true,
                })
                setTimeout(() => {
                    this.setState({
                        modalVisible: false
                    }),
                        this.props.navigation.navigate("Services")
                }, 3000)
            }
        }
    }
    render() {
        const { username, email, dob, building, street, house, area, city, submitted, modalVisible, checked } = this.state
        return (
            <Container >
                <ImageBackground source={bg} style={styles.container}>
                    <Header style={styles.header} androidStatusBarColor={colors.primaryBtn} iosBarStyle="dark-content"  >
                        {/* <Left >
                            <Button transparent>
                                <Icon name='arrow-back' style={{ color: "white" }} />
                            </Button>
                        </Left> */}
                        <Body />
                    </Header>
                    <Content style={styles.content}>
                        <View style={styles.top}>
                            <Text style={styles.profileText}>Profile</Text>
                            <Image source={profile} style={styles.img} />
                        </View>
                        <Form style={styles.form}>
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Username</Label>
                                <View style={styles.inputView}>
                                    <Input value={username} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ username: text })} />
                                    {/* <Image source={location} style={styles.icon} /> */}
                                </View>
                                {!!(submitted && !username) && <Text style={styles.error}> username is required</Text>}
                            </Item>
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Email</Label>
                                <View style={styles.inputView}>
                                    <Input value={email} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ email: text })} />
                                    {/* <Image source={location} style={styles.icon} /> */}
                                </View>
                                {!!(submitted && !email) && <Text style={styles.error}>valid email is required</Text>}
                            </Item>
                            {/* <Item regular style={styles.input} onPress={()=>this.props.navigation.navigate("MapView")}>
                                <Input placeholder="Address" style={styles.field} />
                            </Item> */}
                            <Item style={{
                                ...styles.input,
                                paddingTop: Platform.OS === 'ios' ? 2.5 : 6,
                                paddingLeft: Platform.OS === 'ios' ? 10 : 10,
                                // height: 50
                            }}
                            // onPress={()=>{this.setState((ps)=>({showHide:!ps.showHide}))}}
                            >
                                <Label style={styles.label}>Date Of Birth</Label>
                                <DatePicker
                                    // showDatePicker={this.state.showHide}  {...this.props}
                                    defaultDate={new Date(1980, 1, 1)}
                                    minimumDate={new Date(1950, 1, 1)}
                                    // maximumDate={new Date(2018, 12, 31)}
                                    // formatChosenDate={format("YYYY do, MM")}
                                    // formatChosenDate={date => {return moment(date).format('YYYY-MM-DD');}}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    // placeHolderText={dob ? dob : "Date of birth"}
                                    textStyle={{ width: width * 0.75, color: "white" }}
                                    // placeHolderTextStyle={{ width: width * 0.75, color: "black" }}
                                    onDateChange={this.setDate}
                                    disabled={false}
                                    icon={true}
                                    animationType="slide"
                                />
                                {/* <Icon name='calendar' style={styles.calenderIcon} /> */}
                                {!!(submitted && !dob) && <Text style={styles.error}>date is required</Text>}
                            </Item>
                            {/* <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Flat/Unit</Label>
                                <View style={styles.inputView}><Input value={house} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ house: text })} />
                                    <Image source={location} style={styles.icon} /></View>
                            </Item>
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Building</Label>
                                <View style={styles.inputView}>
                                    <Input value={building} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ building: text })} />
                                    <Image source={location} style={styles.icon} />
                                </View>
                            </Item>
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Street</Label>
                                <View style={styles.inputView}>
                                    <Input value={street} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ street: text })} />
                                    <Image source={location} style={styles.icon} />

                                </View>
                            </Item>
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Area</Label>
                                <View style={styles.inputView}>
                                    <Input value={area} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ area: text })} />
                                    <Image source={location} style={styles.icon} />
                                </View>
                            </Item>
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>City</Label>
                                <View style={styles.inputView}>
                                    <Input value={city} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ city: text })} />
                                    <Image source={location} style={styles.icon} />
                                </View>
                            </Item> */}
                            <View style={{
                                marginTop: "10%",
                                // backgroundColor: "blue",
                                width: "80%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: 'center',
                                height: 30
                            }}>
                                <CheckBox checked={checked}
                                    onPress={() => this.setState((ps) => ({ checked: !ps.checked }))}
                                    color={colors.primaryBtn} />
                                <Text style={{ color: 'white', paddingLeft: 20 }}>I accept terms and condition</Text>
                            </View>
                            <Item style={styles.continue} last>
                                {this.props.user.isloading ? <Loader />
                                    : <RoundButton height={50} backgroundColor={colors.primaryBtn}
                                        value="Continue" color="white" onPress={this.continue} />}
                            </Item>
                        </Form>
                        <CustomModal
                            modalVisible={modalVisible}
                            img={success}
                            height={60}
                            width={60}
                            text={"You have successfully registered"} />
                    </Content>
                </ImageBackground>
            </Container>
        )
    }
}



const styles = StyleSheet.create(
    {
        container: {
            width: "100%",
            height: "100%",
            marginTop: 0,
            backgroundColor: "transparent"
        },
        content: {
            height: "100%"
        },
        header: {
            backgroundColor: "transparent",
            elevation: 0,
        },
        top: {
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5%"
        },
        profileText: {
            textAlign: "center",
            width: "50%",
            fontSize: 18,
            color: "#ffffff",
            fontWeight: "bold",
            marginBottom: 10,

        },
        img: {
            width: 50,
            height: 50,
            marginLeft: 5
        },
        form: {
            height: "100%",
            // justifyContent:"center",
            alignItems: "center",
            marginTop: 20,
        },
        input: {
            // backgroundColor: "#ffffff",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            // borderRadius: 50,
            paddingTop: 0,
            paddingLeft: 10,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: "1%",
            marginTop: "1%",
            width: "85%",
            flexDirection: "column"
            // alignItems: "center",

        },
        picker: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "85%"
        },
        calenderIcon: {
            position: 'absolute',
            left: "95%",
            top: 30,
            zIndex: -1,
            fontSize: 30,
            color: 'white'
        },
        continue: {
            backgroundColor: "transparent",
            borderRadius: 50,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            marginTop: "5%",
            marginBottom: 0,
            width: "85%",
            borderBottomWidth: 0
        },
        inputView: {
            flex: 1,
            flexDirection: "row",
            // backgroundColor: "blue",
            alignItems: 'center'
        },
        field: {
            // paddingLeft: 25,
            // paddingRight: 25,
            // marginLeft: 10,
            // marginRight: 10,
            // marginTop: 0,
            color: "white",
            width: "100%",
            paddingTop: Platform.OS === "android" ? 15 : 0,
        },
        label: {
            color: "white"
        },
        icon: {
            width: 25,
            height: 25
        },
        error: {
            color: 'rgba(207, 0, 15, 1)'
        }
    }
)
const mapStateToProps = ({ user }) => ({ user: user })
const mapDispatchToProps = dispatch => ({
    setProfile: data => dispatch(setUserProfile(data)),
    getCurrentUser: () => dispatch(getCurrentUser()),
    createProfile: data => dispatch(userMiddleWare(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Register);