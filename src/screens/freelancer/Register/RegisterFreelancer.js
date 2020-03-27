import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Image, Dimensions } from 'react-native';
import { Header, Left, Button, Icon, Body, View, Container, Content, Text, Form, Item, Input, DatePicker, Label, CheckBox } from 'native-base'
// import { Input } from '../../../components/inputs/inputs'
const width = Dimensions.get('window').width;
import { colors } from '../../../configs/colors'
import bg from '../../../assets/registerbg.png';
import profile from '../../../assets/profile.png';
import { RoundButton } from '../../../components/buttons/Buttons';
import Loader from '../../../components/loader/Loader';
import { connect } from 'react-redux';
const formData = new FormData()
import moment from 'moment'


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
        // this.setState({ submitted: true })
        // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // console.log(reg.test(email))
        this.props.navigation.navigate('SkillsAndTools')
        // if (username && username && email && dob && checked && cnic && house && area && street && city) {
        //     if (reg.test(email)) {
        //         console.log("every field exists")
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
        //     }
        //     else {
        //         this.setState({
        //             email: ""
        //         })
        //     }
        // }
    }
    render() {
        const { username, submitted, email, cnic, dob, house, building, street, area, city, checked } = this.state
        return (
            <Container >
                <ImageBackground source={bg} style={styles.container}>
                    <Content style={styles.content}>
                        <Header style={styles.header} androidStatusBarColor={colors.primaryBtn} iosBarStyle="dark-content">
                            <Left >
                                <Button transparent>
                                    <Icon name='arrow-back' style={{ color: "black" }} />
                                </Button>
                            </Left>
                            <Body />
                        </Header>
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
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>CNIC</Label>
                                <View style={styles.inputView}>
                                    <Input value={cnic} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ cnic: text })} />
                                    {/* <Image source={location} style={styles.icon} /> */}
                                </View>
                                {!!(submitted && !cnic) && <Text style={styles.error}> cnic is required</Text>}
                            </Item>
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Date of Birth</Label>
                                <View style={styles.inputView}>
                                    <DatePicker
                                        // showDatePicker={this.state.showHide}  {...this.props}
                                        defaultDate={new Date(2018, 4, 4)}
                                        minimumDate={new Date(1950, 1, 1)}
                                        // maximumDate={new Date(2018, 12, 31)}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText=""
                                        textStyle={{ width: width * 0.75, color: 'white' }}
                                        placeHolderTextStyle={{ width: width * 0.75, color: "white" }}
                                        onDateChange={this.setDate}
                                        disabled={false}
                                        icon={true}
                                    />
                                    {/* <Icon name='calendar' style={styles.calenderIcon} /> */}

                                </View>
                                {!!(submitted && !dob) && <Text style={styles.error}> date of birth is required</Text>}
                            </Item>
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Flat/Unit</Label>
                                <View style={styles.inputView}>
                                    <Input value={house} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ house: text })} />
                                    {/* <Image source={location} style={styles.icon} /> */}
                                </View>
                                {!!(submitted && !house) && <Text style={styles.error}> flat / unit  is required</Text>}
                            </Item>
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Building</Label>
                                <View style={styles.inputView}>
                                    <Input value={building} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ building: text })} />
                                    {/* <Image source={location} style={styles.icon} /> */}
                                </View>
                                {!!(submitted && !username) && <Text style={styles.error}> username is required</Text>}
                            </Item>
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Street</Label>
                                <View style={styles.inputView}>
                                    <Input value={street} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ street: text })} />
                                    {/* <Image source={location} style={styles.icon} /> */}
                                </View>
                                {!!(submitted && !street) && <Text style={styles.error}> street is required</Text>}
                            </Item>
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>Area</Label>
                                <View style={styles.inputView}>
                                    <Input value={area} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ area: text })} />
                                    {/* <Image source={location} style={styles.icon} /> */}
                                </View>
                                {!!(submitted && !area) && <Text style={styles.error}> area is required</Text>}
                            </Item>
                            <Item fixedLabel style={styles.input}>
                                <Label style={styles.label}>City</Label>
                                <View style={styles.inputView}>
                                    <Input value={city} keyboardType="default" style={styles.field} onChangeText={text => this.setState({ city: text })} />
                                    {/* <Image source={location} style={styles.icon} /> */}
                                </View>
                                {!!(submitted && !city) && <Text style={styles.error}> city is required</Text>}
                            </Item>
                           <Item style={{borderBottomWidth:0}}>
                           <View style={{
                                marginTop: "10%",
                                width: "80%",
                                display:'flex',
                                // height:100,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: 'center',
                            }}>
                                <Text style={{ color: 'white'}}>I accept terms and Policy</Text>
                                <CheckBox checked={checked}
                                    onPress={() => this.setState((ps) => ({ checked: !ps.checked }))}
                                    color={colors.primaryBtn} />
                            </View>
                           </Item>
                            <Item style={styles.continue} last>
                                {this.props.user.isloading? <Loader />
                                    : <RoundButton height={50} backgroundColor={colors.primaryBtn}
                                        value="Continue" color="white" onPress={this.continue} />}
                            </Item>
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
            paddingLeft: 10,
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
            // backgroundColor:"blue",
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
            // backgroundColor:"green",
            // paddingLeft: 25,
            // paddingRight: 25,
            // marginLeft: 10,
            // marginRight: 10,
            marginTop: 0,
            marginBottom: 0,
            paddingBottom: 0,
            color: "white",
            width: "100%",
            paddingTop: Platform.OS === "android" ? 15 : 0,

        }
    }
)
const mapStateToProps = ({user}) => ({
    user:user
})
export default connect(mapStateToProps)(RegisterCustomer);