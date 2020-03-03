import React, { Component } from 'react';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import { StyleSheet } from 'react-native'
import CustomHeader from '../../components/header/customHeader';
import { colors } from '../../configs/colors';
import CustomTab from '../../components/tab/Tab';
import CustomFooter from '../../components/footer/customfooter';
import { connect } from 'react-redux';

class ServicesTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab:0
        }
    }
    componentDidMount(){
        // console.log("ROUTE", this.props.navigation.getParam("serviceId"))
        const currentTab = this.props.navigation.getParam("currentTab")
        
        this.setState({
            currentTab,
            initialPage: currentTab
        })
    }
    setTab = (i) =>{
        console.log("CURRENT TAB", i)
        this.setState({
            currentTab:i.i,
        })
    }
    render() {
        console.log("SERVICES TABS", this.state)
        const {currentTab, serviceId, initialPage }  = this.state
        return (
            <Container style={styles.container}>
                <CustomHeader />
                {this.props.services && <Tabs initialPage={initialPage}  page={ currentTab } tabContainerStyle={{elevation: 0 }} renderTabBar={() => <ScrollableTab  />}  tabBarUnderlineStyle={{ backgroundColor: colors.primaryBtn }} 
                onChangeTab={(i)=> this.setTab(i)}
                // onScroll={(i) => this.setTab(i)} 
                >
                    {/* <Tab heading="Facial" tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize:12 }} activeTabStyle={{ backgroundColor: 'white', elevation:0 }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }} >
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
                    </Tab> */}
                    {this.props.services.map(service =>
                    <Tab heading={service.category} tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize:12 }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                        <CustomTab serviceId={serviceId}/> 
                    </Tab>)}
                </Tabs>}
                <CustomFooter navigation={this.props.navigation}/>
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
const mapStataToProps = ({services}) => (services)
export default connect(mapStataToProps)(ServicesTabs);