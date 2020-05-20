import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Image, Dimensions, DatePickerIOS, TouchableOpacity, Modal, } from 'react-native';
import { Header, Left, Button, Icon, Body, View, Container, Content, Text, Form, Item, Input, DatePicker, Label, CheckBox } from 'native-base'
import { TextInputMask } from 'react-native-masked-text'
import { colors } from '../../../configs/colors'
import bg from '../../../assets/registerbg.png';
import profile from '../../../assets/profile.png';
import { RoundButton, CustomButton } from '../../../components/buttons/Buttons';
import Loader from '../../../components/loader/Loader';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker'
const formData = new FormData()
import moment from 'moment'
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

class RegisterCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showHide: false,
            username: "",
            submitted: false,
            dob: "",
            email: "",
            house: "",
            building: "",
            street: "",
            area: "",
            city: "",
            checked: false
        }
    }
    componentDidMount() {
        console.log("USER IN REGISTER", this.props.user)
        this.setState({
            username: this.props.user.username,
            email: this.props.user.email,
            dob: this.props.user.dob,
            house: this.props.user.house,
            building: this.props.user.building,
            street: this.props.user.street,
            area: this.props.user.area,
            city: this.props.user.city,
            cnic: this.props.user.cnic
        })
    }
    setDate = (date) => {
        // Keyboard.dismiss()
        console.log("DATE", moment(date).format('YYYY-MM-DD'))
        // if(Platform.OS==="android"){date = date.toString()}
        // alert(date)
        date = moment(date).format('YYYY-MM-DD')
        this.setState({ dob: date })
    }
    continue = () => {
        const { username, email, dob, cnic, house, building, area, street, city, checked } = this.state
        this.setState({ submitted: true })
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log(reg.test(email))
        if (username && username && email && dob && checked && cnic && house && building && area && street && city) {
            if (reg.test(email)) {
                console.log("every field exists")
                const userFromRedux = this.props.user
                this.props.navigation.navigate('SkillsAndTools', {
                    user: {
                        username,
                        email,
                        dob,
                        cnic,
                        house,
                        building,
                        area,
                        street,
                        city,
                        token: userFromRedux.token,
                        appuid: userFromRedux.appuid,
                        user_type: userFromRedux.user_type,
                        skills: userFromRedux.freelancerSkills,
                        tools: userFromRedux.freelancerTools,
                        training: userFromRedux.freelancerTraining
                    }
                })
            }
            else {
                this.setState({
                    emailError: true
                })
            }
        }
        //         const { user } = this.props
        //         // this.props.createProfile({ user: { username, email, dob, ...this.props.user } }
        //         formData.append("language", "en")
        //         formData.append("country_id", 166)
        //         // formData.append("device", device)
        //         // formData.append("device_id", device_id)
        //         // formData.append("model", model)
        //         // formData.append("os", os)
        //         // formData.append("platform", )
        //         formData.append("appuid", user.appuid)
        //         formData.append("token", user.token)
        //         formData.append("user_type",user.user_type)
        //         formData.append("username", username)
        //         formData.append("email", email)
        //         formData.append("dob", dob)
        //         formData.append("building", building)
        //         formData.append("street", street)
        //         formData.append("area", area)
        //         formData.append("city", city)
        //         formData.append("house", house)
        //         formData.append("address_note", "")
        //         console.log("FORM DATA IN FREELANCER", formData)
        //         this,props.navigation.navigate('SkillsAndTools')
    }
    render() {
        const { username, submitted, email, cnic, dob, house, building, street, area, city, checked, emailError } = this.state
        console.log("CNIC", cnic)
        return (
            <Container >
                <ImageBackground source={bg} style={styles.container}>
                    <Header style={styles.header} androidStatusBarColor={colors.primaryBtn} iosBarStyle="dark-content">
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
                            </Item>
                            {!!(submitted && !username) && <Text style={styles.error}> username is required</Text>}
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Email</Label>
                                <View style={styles.inputView}>
                                    <Input value={email} keyboardType='email-address' style={styles.field} onChangeText={text => this.setState({ email: text })} />
                                    {/* <Image source={location} style={styles.icon} /> */}
                                </View>
                            </Item>
                            {!!(submitted && !email && !emailError) && <Text style={styles.error}>email is required</Text>}
                            {!!(submitted && !!emailError) && <Text style={styles.error}>email address is not valid</Text>}
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>CNIC</Label>
                                <View style={styles.inputView}>
                                    <TextInputMask
                                        maxLength={15}
                                        keyboardType="number-pad"
                                        type={'custom'}
                                        options={{
                                            mask: '99999-9999999-9'
                                        }}
                                        value={cnic}
                                        onChangeText={text => {
                                            console.log("PHONE", text)
                                            this.setState({
                                                cnic: text
                                            })
                                        }}
                                        style={styles.field}
                                    />
                                    {/* <Image source={location} style={styles.icon} /> */}
                                </View>
                            </Item>
                            {!!(submitted && !cnic) && <Text style={styles.error}> cnic is required</Text>}
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Date of Birth</Label>
                                <View style={styles.inputView}>
                                    <DatePicker
                                        // showDatePicker={this.state.showHide}  {...this.props}
                                        defaultDate={new Date(2018, 4, 4)}
                                        minimumDate={new Date(1950, 1, 1)}
                                        maximumDate={new Date(2002, 12, 31)}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText={dob ? dob : "Tap here to select date"}
                                        textStyle={{ paddingLeft: 0, width: width * 0.75, color: 'white' }}
                                        placeHolderTextStyle={{ paddingLeft: 0, width: width * 0.75, color: "white" }}
                                        onDateChange={this.setDate}
                                        disabled={false}
                                        icon={true}
                                    />
                                    {/* <Text  >{dob ? `${dob}` : "Tap here to select Date of birth"}  </Text> */}
                                    {/* <Icon name='calendar' style={styles.calenderIcon} /> */}

                                </View>
                            </Item>
                            {!!(submitted && !dob) && <Text style={styles.error}> date of birth is required</Text>}
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Flat/Unit</Label>
                                <View style={styles.inputView}>
                                    <Input value={house} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ house: text })} />
                                    {/* <Image source={location} style={styles.icon} /> */}
                                </View>
                            </Item>
                            {!!(submitted && !house) && <Text style={styles.error}> flat / unit  is required</Text>}
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Building</Label>
                                <View style={styles.inputView}>
                                    <Input value={building} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ building: text })} />
                                    {/* <Image source={location} style={styles.icon} /> */}
                                </View>
                            </Item>
                            {!!(submitted && !building) && <Text style={styles.error}> building is required</Text>}
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Street</Label>
                                <View style={styles.inputView}>
                                    <Input value={street} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ street: text })} />
                                    {/* <Image source={location} style={styles.icon} /> */}
                                </View>
                            </Item>
                            {!!(submitted && !street) && <Text style={styles.error}> street is required</Text>}
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Area</Label>
                                <View style={styles.inputView}>
                                    <Input value={area} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ area: text })} />
                                    {/* <Image source={location} style={styles.icon} /> */}
                                </View>
                            </Item>
                            {!!(submitted && !area) && <Text style={styles.error}> area is required</Text>}
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>City</Label>
                                <View style={styles.inputView}>
                                    <Input value={city} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ city: text })} />
                                    {/* <Image source={location} style={styles.icon} /> */}
                                </View>
                            </Item>
                            {!!(submitted && !city) && <Text style={styles.error}> city is required</Text>}
                            <Item style={{ borderBottomWidth: 0, width:"95%" }}>
                                <View style={{
                                    marginTop: "10%",
                                    // width: "90%",
                                    display: 'flex',
                                    // height:100,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    // backgroundColor:"green",
                                    // justifyContent: "flex-start",
                                }}>
                                    <View style={{width:35, justifyContent:"center"}} >
                                    <CheckBox checked={checked}
                                        onPress={() => this.setState((ps) => ({ checked: !ps.checked }))}
                                        color={colors.primaryBtn} />
                                    </View>
                                    <Text style={{ color: 'white', paddingLeft: 5 }}>I accept terms and Policy</Text>
                                </View>
                            </Item>
                            <Item style={styles.continue} last>
                                {this.props.user.isloading ? <Loader />
                                    : <CustomButton height={50} backgroundColor={colors.primaryBtn}
                                        value="Continue" color="white" onPress={this.continue} />}
                            </Item>
                            {/* <Modal
                                transparent={true}
                                animationType={"fade"}
                                visible={true}
                            // onRequestClose={this.closeModal}
                            >
                                <View style={styles.modal}>
                                    <View style={styles.modalView}>
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            // timeZoneOffsetInMinutes={0}
                                            minimumDate={new Date()}
                                            value={dob ? dob : new Date()}
                                            mode={"date"}
                                            is24Hour={false}
                                            display="default"
                                            onChange={this.setDate}
                                        />
                                        <View style={{ width: width * 0.7, alignSelf: "center", }}>
                                            <CustomButton
                                                // disabled={!rating || !comments}
                                                // onPress={submit}
                                                height={40}
                                                color="white"
                                                value="Select"
                                                backgroundColor={colors.primaryBtn}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Modal> */}
                        </Form>
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
            height: "100%"
        },
        content: {
            height: "100%"
        },
        header: {
            backgroundColor: "transparent",
            elevation: 0
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
            marginBottom: 10
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
        // input: {
        //     backgroundColor: "#ffffff",
        //     borderRadius: 50,
        //     paddingTop: 0,
        //     // paddingLeft: 25,
        //     marginLeft: 0,
        //     marginRight: 0,
        //     marginBottom: "1%",
        //     marginTop: "1%",
        //     width: "85%",
        //     alignItems: "center"
        // },
        input: {
            // backgroundColor: "#ffffff",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            // borderRadius: 50,
            paddingTop: 0,
            // paddingLeft: 10,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: "1%",
            marginTop: "1%",
            width: "85%",
            flexDirection: "column"
            // alignItems: "center",

        },
        inputView: {
            flex: 1,
            flexDirection: "row",
            // backgroundColor: "blue",
            alignItems: 'center'
        },
        label: {
            color: "white",
            fontWeight: 'bold',
            marginTop: 5
        },
        picker: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "85%"
        },
        calenderIcon: {
            position: 'absolute',
            left: "85%",
            top: 10,
            zIndex: -1,
            fontSize: 30,
            color: 'black'
        },
        continue: {
            // backgroundColor:"green",
            backgroundColor: "transparent",
            borderRadius: 50,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            marginTop: "20%",
            marginBottom: 0,
            width: "85%",
            borderBottomWidth: 0
        },
        field: {
            // paddingLeft: 25,
            // paddingRight: 25,
            // marginLeft: 10,
            // marginRight: 10,
            marginTop: 0,
            marginBottom: 0,
            paddingBottom: 0,
            color: "white",
            width: "100%",
            paddingTop: 15,
            paddingBottom: 10,
            // paddingLeft:10



        },
        error: {
            color: "#ff1654",
            alignSelf: "flex-start",
            paddingLeft: "8%"
        },
        modal: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "rgba(0, 0, 0, 0.7)"
        },
        modalView: {
            // paddingTop:"10%",
            // justifyContent:"center",
            // alignItems:"center",
            width: width * 0.8,
            height: height * 0.4,
            backgroundColor: "white",
            borderRadius: 15
        },
    }
)
const mapStateToProps = ({ user }) => ({
    user: user
})
export default connect(mapStateToProps)(RegisterCustomer);