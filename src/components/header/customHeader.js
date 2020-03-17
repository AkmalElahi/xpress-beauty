import React from 'react';
import { StyleSheet, Image } from 'react-native'
import { Left, Body, Right, Header, Icon, Title, Button } from 'native-base';
import bell from '../../assets/bell.png'

const CustomHeader = ({ icon, header, leftButton }) => (
    <Header style={styles.header} androidStatusBarColor="white" iosBarStyle="dark-content">
        <Left style={{flex:1}}>
            <Icon onPress={leftButton}  name={icon} />
        </Left>
        <Body style={{flex:0}}>
            <Title style={{color:"black", fontWeight:"normal"}} >{header}</Title>
        </Body>
        <Right style={{flex:1}}>
            <Image source={bell} />
        </Right>
    </Header>

)


const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
        elevation: 0,
        borderBottomWidth:0
        // width: "95%",
        // alignSelf: "center",
    }
})
export default CustomHeader;