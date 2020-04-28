import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, DatePicker, Toast } from 'native-base';
import { TextInput, Dimensions, StyleSheet, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { CustomButton } from '../../../components/buttons/Buttons';
import { colors } from '../../../configs/colors';
import FreelancerFooter from '../../../components/footer/freelancerFooter';
import { updateFreelancerProfileMiddleware } from '../../../redux/user/user.middlewares';
import CustomModal from '../../../components/Modal/Modal';
import loader from '../../../assets/loader.gif'
const width = Dimensions.get('window').width

class Personal extends Component {
    // console.log("PERSONAL", username, setChange)
    constructor(props) {
        super(props)
        this.state = {
            username: ""
        }
    }
    componentDidMount() {
        console.log("USER IN PERSONLA", this.props.user)
        const { user } = this.props
        this.setState({
            token: user.token,
            appuid: user.appuid,
            username: user.username,
            email: user.email,
            cnic: user.cnic,
            phone: user.mobile,
            dob: user.dob,
            house: user.house,
            building: user.building,
            street: user.street,
            city: user.city,
            area: user.area

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
    updateProfile = () => {
        const { username, email, cnic, dob, house, building, street, city, area, phone, } = this.state
        if( username && email && cnic && dob && house && building && street && city && area && phone){
            this.props.updateProfile({type:"personal", ...this.state})
        }
    }
    componentDidUpdate(prevProps){
        const { user } = this.props
        if(user !== prevProps){
            if(user.message === "update freelancer profile success"){
                this.props.navigation.navigate("FreelancerNotification")
                Toast.show({
                    text: "Profile Updated Successfully",
                    textStyle: { textAlign: "center" },
                    style: { width: "90%", alignSelf: "center", borderRadius: 10 },
                    position: "bottom",
                    type: 'success',
                    duration: 1500
                })   
            }
            if(user.message === "update freelancer profile false"){
                Toast.show({
                    text: "Error in Updating profile",
                    textStyle: { textAlign: "center" },
                    style: { width: "90%", alignSelf: "center", borderRadius: 10 },
                    position: "bottom",
                    type: 'warning',
                    duration: 1500
                })  
            }
        }
    }
    render() {
        const { username, email, cnic, dob, house, building, street, city, area, phone } = this.state
        return (
            <Content contentContainerStyle={{ width:Platform.OS === "android" ? "85%" :"100%", alignSelf: "center" }}>
                <Form style={{ marginBottom: 15 }}>
                    <Item fixedLabel style={styles.input}> 
                        <Label>Username</Label>
                        <Input
                            value={username}
                            onChangeText={(text) => this.setState({ username: text })} />
                    </Item>
                    <Item fixedLabel style={styles.input} >
                        <Label>Email</Label>
                        <Input value={email}
                            onChangeText={(text) => this.setState({ email: text })} />
                    </Item>
                    <Item fixedLabel style={styles.input} >
                        <Label>Phone</Label>
                        <Input value={phone} disabled={true} />
                    </Item>
                    <Item fixedLabel style={styles.input} >
                        <Label>CNIC</Label>
                        <Input value={cnic}
                            onChangeText={(text) => this.setState({ cnic: text })} />
                    </Item>
                    {/* <Item fixedLabel style={styles.input} style={{backgroundColor:"green", justifyContent:"flex-start"}} >
                        <Label>Date of Birth</Label>
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
                                placeHolderText={dob ? dob : "Tap here to select date"}
                                textStyle={{ width: width * 0.75, color: 'white' }}
                                placeHolderTextStyle={{ width: width * 0.75, color: "white" }}
                                onDateChange={this.setDate}
                                disabled={false}
                                icon={true}
                            />
                            <Icon name='calendar' style={styles.calenderIcon} />

                        </View>
                    </Item> */}
                    <View style={{ backgroundColor: "white", paddingLeft: 15, borderBottomWidth: 0.5, borderBottomColor: "lightgrey" }}>
                        <Label style={{ color: 'grey', fontSize: 15 }}>Date of Birth</Label>
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
                                placeHolderText={dob ? dob : "Tap here to select date"}
                                textStyle={{ width: width * 0.75, color: 'black' }}
                                placeHolderTextStyle={{ width: width * 0.75, color: "black" }}
                                onDateChange={this.setDate}
                                disabled={false}
                                icon={true}
                            />
                            {/* <Icon name='calendar' style={styles.calenderIcon} /> */}

                        </View>
                    </View>
                    <Item fixedLabel style={styles.input}>
                        <Label>House</Label>
                        <Input
                            value={house}
                            onChangeText={(text) => this.setState({ house: text })} />
                    </Item>
                    <Item fixedLabel style={styles.input} >
                        <Label>Building</Label>
                        <Input value={building}
                            onChangeText={(text) => this.setState({ building: text })} />
                    </Item>
                    <Item fixedLabel style={styles.input} >
                        <Label>Street</Label>
                        <Input value={street}
                            onChangeText={(text) => this.setState({ street: text })} />
                    </Item>
                    <Item fixedLabel style={styles.input} >
                        <Label>Area</Label>
                        <Input value={area}
                            onChangeText={(text) => this.setState({ area: text })} />
                    </Item>
                    <Item fixedLabel style={styles.input} >
                        <Label>City</Label>
                        <Input value={city}
                            onChangeText={(text) => this.setState({ city: text })} />
                    </Item>
                </Form>
                <CustomButton
                    onPress={this.updateProfile}
                    backgroundColor={colors.freelancerButton}
                    color={"white"}
                    value="Save"
                    height={50}
                />
                <CustomModal
                    modalVisible={this.props.user.isloading}
                    img={loader}
                    height={60}
                    width={60}
                    text={"loading..."} />
                {/* <FreelancerFooter navigation={this.props.navigation} isActive='profile' /> */}
            </Content>
        );
    }
}
const styles = StyleSheet.create({
    inputView: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        // backgroundColor: "blue",
        alignItems: 'center'
    },
    input:{
        flexDirection:"column",
        justifyContent:"flex-start",
        width:"100%",
        alignItems:"flex-start"
    }
})
const mapStateToProps = ({ user }) => ({ user })
const mapDispatchToProps = (dispatch) => ({
    updateProfile: data => dispatch(updateFreelancerProfileMiddleware(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Personal)