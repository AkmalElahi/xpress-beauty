import React from 'react';
import { ImageBackground, Text, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import homebg from '../../assets/home.png';

import { Container, Button } from 'native-base';
import {RoundButton} from '../../components/buttons/Buttons';
import Promotion from '../promotions/Promotion';
import { colors } from '../../configs/colors'

const Home = ({navigation}) => {
    // console.log(navigation)
    return(
        <ImageBackground source={homebg} style={styles.imageContainer}>
            <Container style={styles.container}>
                <View style={{justifyContent:"space-between",width:"70%", height:"20%", alignSelf:"center"}}>
                    <RoundButton color="black" backgroundColor="white" height={60} value="Customer" onPress={()=>{navigation.navigate('CustomerStack')}}/>
                    <RoundButton color="white" backgroundColor={colors.primaryBtn}  height={60} value="Freelancer"/>
                </View>
                {/* <Promotion/> */}
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
export default Home;