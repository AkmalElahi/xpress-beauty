import React, { Component } from 'react';
import { Container, Tab, Tabs, Drawer, Header, Left, Body, Right, Button, Icon, Title, View } from 'native-base'
import { StyleSheet } from 'react-native'
import { colors } from '../../../configs/colors'
import CustomFooter from '../../../components/footer/customfooter'
import Sheduled from '../../../components/scheduled/Sheduled'
import History from '../../../components/history/History';
import { connect } from 'react-redux';
import { freelancerBookingsMiddleware } from '../../../redux/bookings/bookings.middleware';
import FreelancerFooter from '../../../components/footer/freelancerFooter';
import Personal from './personal';
import EditExpertise from './expertise'



const FreelancerEditProflie =({navigation}) => {
  
        return (
                <View style={styles.container}>
                <Header style={styles.header} androidStatusBarColor={"white"} iosBarStyle="dark-content">
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={()=>this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{ color: "black" }} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 0 }}>
                        <Title style={{ color: "black", fontWeight: "normal" }} >Profile</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        {/* <Button transparent onPress={() => alert("BELL")}>
                            <Image source={bell} style={{ width: 20, height: 25 }} />
                        </Button> */}
                    </Right>
                </Header> 
                <Tabs   tabBarUnderlineStyle={{ backgroundColor: colors.bg2 }}>
                    <Tab heading="Personal" tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                        <Personal navigation={navigation}/>
                    </Tab>
                    <Tab heading="Experise" tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                         <EditExpertise/>
                    </Tab>
                </Tabs>
                <FreelancerFooter navigation={navigation} isActive = 'profile'/>
            </View>
        )
    }


const styles = StyleSheet.create({
    container: {
        // marginTop: "3%",
        height:"100%",
        backgroundColor: "white"
    },
    header: {
        backgroundColor: "transparent",
        elevation: 0
    },
    tabs: {
        backgroundColor: "white",
        borderBottomWidth: 0,
        elevation: 0,
    }
})
export default FreelancerEditProflie