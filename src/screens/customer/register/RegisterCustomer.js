import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Image, Dimensions, StatusBar, Platform } from 'react-native';
const width = Dimensions.get('window').width;
import { Header, Left, Button, Icon, Body, View, Container, Content, Text, Form, Item, Input, DatePicker, } from 'native-base'
// import { Input } from '../../../components/inputs/inputs'
import { colors } from '../../../configs/colors'
import bg from '../../../assets/registerbg.png';
import profile from '../../../assets/profile.png';
import { RoundButton } from '../../../components/buttons/Buttons';



class Register extends Component {
    constructor(props) {
        super(props);
        state = {
            showHide: false
        }
    }
    render() {
        return (
            <Container >
                <ImageBackground source={bg} style={styles.container}>
                    <Header style={styles.header} androidStatusBarColor={colors.primaryBtn} iosBarStyle="dark-content"  >
                        <Left >
                            <Button transparent>
                                <Icon name='arrow-back' style={{ color: "white" }} />
                            </Button>
                        </Left>
                        <Body />
                    </Header>
                    <Content style={styles.content}>
                        <View style={styles.top}>
                            <Text style={styles.profileText}>Profile</Text>
                            <Image source={profile} style={styles.img} />
                        </View>
                        <Form style={styles.form}>
                            <Item regular style={styles.input}>
                                <Input placeholder="Username" style={styles.field} />
                            </Item>
                            <Item regular style={styles.input}>
                                <Input placeholder="Email" style={styles.field} />
                            </Item>
                            <Item regular style={styles.input}>
                                <Input placeholder="Address" style={styles.field} />
                            </Item>
                            <Item regular style={{
                                ...styles.input,
                                paddingTop: Platform.OS === 'ios' ? 2.5 : 6,
                                paddingLeft: Platform.OS === 'ios' ? 20 : 25,
                                height:50
                            }}
                            // onPress={()=>{this.setState((ps)=>({showHide:!ps.showHide}))}}
                            >
                                <DatePicker
                                    // showDatePicker={this.state.showHide}  {...this.props}
                                    defaultDate={new Date(2018, 4, 4)}
                                    minimumDate={new Date(2018, 1, 1)}
                                    maximumDate={new Date(2018, 12, 31)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Date of birth"
                                    textStyle={{ width: width * 0.75 }}
                                    placeHolderTextStyle={{ width: width * 0.75, color: "grey"}}
                                    onDateChange={this.setDate}
                                    disabled={false}
                                    icon={true}
                                    animationType="slide"
                                />
                                {/* <Icon name='calendar' style={styles.calenderIcon} /> */}
                            </Item>
                            <Item style={styles.continue} last>
                                <RoundButton height={50} backgroundColor={colors.primaryBtn} value="Continue" color="white" onPress={() => this.props.navigation.navigate('MobileVerification')} />
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
            height: "100%",
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
            backgroundColor: "#ffffff",
            borderRadius: 50,
            paddingTop: 0,
            // paddingLeft: 25,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: "1%",
            marginTop: "1%",
            width: "85%",
            alignItems: "center",

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
            paddingLeft: 25,
            paddingRight: 25,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 0,
            paddingTop: Platform.OS === "android" ? 15 : 0,
        }
    }
)

export default Register;