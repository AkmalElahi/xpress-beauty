import React from 'react';
import { ImageBackground, Text, StyleSheet, Image, TouchableOpacity, View,j, StatusBar } from 'react-native';
import { Container, Button, Header } from 'native-base';

import { connect } from 'react-redux';
import { setUserType } from '../../redux/user/user.actions'

import homebg from '../../assets/home.png';
import {RoundButton} from '../../components/buttons/Buttons';
import { colors } from '../../configs/colors'

const setUser = (navigation, setType, userType) =>{
    setType(userType)
    console.log("IN USER TYPE")
    navigation.navigate('UserLoading')
}
const Home = ({navigation, setType}) => {
    return(
        <ImageBackground source={homebg} style={styles.imageContainer}>
            <Header androidStatusBarColor="#7f7d7b" iosBarStyle="light-content" style={{display:"none"}}/>
            <Container style={styles.container}>
                <View style={{justifyContent:"space-between",width:"70%", height:"25%", alignSelf:"center"}}>
                    <RoundButton color="black" backgroundColor="white" height={60} value="Customer" onPress={()=>setUser(navigation, setType, "customer")}/>
                    <RoundButton color="white" backgroundColor={colors.primaryBtn}  height={60} value="Freelancer" 
                    // onPress={()=>setUser(navigation ,setType, "freelancer")}
                    />
                </View>
            </Container>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    imageContainer: {
        width: "100%",
        height: "100%"
    },
    container: {
        width: "100%",
        height: "100%",
        opacity: 0.9,
        backgroundColor: "#7f7d7b",
        // flex: 1,
        justifyContent: "center",
    },
    btn: {
        width: "70%",
        height: "100%"
    }
})

const mapDispatchToProps = dispatch => ({
    setType : user_type => dispatch(setUserType(user_type))
})
export default connect(null, mapDispatchToProps)(Home);