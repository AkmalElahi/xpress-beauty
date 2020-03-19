import React from 'react';
import { StyleSheet, Image } from 'react-native'
import { Left, Body, Right, Header, Icon, Title, Badge, Text } from 'native-base';
import bell from '../../assets/bell.png'
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomHeader = ({ icon, header, leftButton, rightButton }) => (
    <Header style={styles.header} androidStatusBarColor="white" iosBarStyle="dark-content">
        <Left style={{ flex: 1 }}>
            <Icon onPress={leftButton} name={icon} />
        </Left>
        <Body style={{ flex: 0 }}>
            <Title style={{ color: "black", fontWeight: "normal" }} >{header}</Title>
        </Body>
        <Right style={{ flex: 1 }} >
            <TouchableOpacity onPress={rightButton} style={{ width: 50, alignItems: "flex-end", paddingRight: 5 }}>
                <Badge style={{width:18, height:18, justifyContent:"center", alignItems:"center", position:"absolute", right:0,zIndex:1}}>
                    <Text style={{ width:18, height:18, fontSize:10,fontWeight:"bold"}}>99</Text>
                </Badge>
                <Image source={bell} style={{ width: 20, height: 25 }} />
            </TouchableOpacity>
        </Right>
    </Header>

)


const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
        elevation: 0,
        borderBottomWidth: 0
        // width: "95%",
        // alignSelf: "center",
    }
})
export default CustomHeader;