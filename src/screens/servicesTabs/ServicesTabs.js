import React, { Component } from 'react';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import { StyleSheet } from 'react-native'
import CustomHeader from '../../components/header/customHeader';
import { colors } from '../../configs/colors';
import Facial from '../../components/facial/facial';
import CustomFooter from '../../components/footer/customfooter';

class ServicesTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Container style={styles.container}>
                <CustomHeader />
                <Tabs tabContainerStyle={{elevation: 0 }} initialPage={0} renderTabBar={() => <ScrollableTab />} t tabBarUnderlineStyle={{ backgroundColor: colors.primaryBtn }} onChangeTab={(i)=> console.log("TAB", i)} >
                    <Tab heading="Facial" tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize:12 }} activeTabStyle={{ backgroundColor: 'white', elevation:0 }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }} >
                        <Facial /> 
                    </Tab>
                    <Tab heading="Makeup" tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize:12 }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                        <Facial /> 
                    </Tab>
                    <Tab heading="Hair Care" tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize:12 }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                        <Facial /> 
                    </Tab>
                    <Tab heading="Manicure" tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize:12 }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                        <Facial /> 
                    </Tab>
                    <Tab heading="Pedicure" tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize:12 }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                        <Facial /> 
                    </Tab>
                    <Tab heading="Wax" tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize:12 }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                        <Facial /> 
                    </Tab>
                </Tabs>
                <CustomFooter/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: "3%",
        backgroundColor: "white"
    },
    tabs: {
        backgroundColor: "white",
        borderBottomWidth: 0,
        elevation:0,
    }
})
export default ServicesTabs;