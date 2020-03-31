import React, { Component } from 'react';
import { Container, Tab, Tabs, ScrollableTab, Toast } from 'native-base';
import { StyleSheet } from 'react-native'
import CustomHeader from '../../components/header/customHeader';
import { colors } from '../../configs/colors';
import CustomTab from '../../components/tab/Tab';
import CustomFooter from '../../components/footer/customfooter';
import { connect } from 'react-redux';
import { addServiceToCart } from '../../redux/cart/cart.actions';

class ServicesTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            initialPage: 0
        }
    }
    componentDidMount() {
        console.log("ROUTE", this.props.navigation.getParam("serviceId"))
        // const id = this.props.navigation.getParam("serviceId")
        // const services = this.props.categories[id].services
        const currentTab = this.props.navigation.getParam("currentTab")

        {
            Platform.OS === 'android' ?
                setTimeout(() => this.setState({
                    currentTab,
                    initialPage: currentTab,
                    // services
                }), 0)
                :
                this.setState({
                    currentTab,
                    initialPage: currentTab,
                    // services
                })
        }

    }
    setTab = (i) => {
        const id = i.ref.props.children.props.serviceId
        console.log("CURRENT TAB", id)
        // const services = this.props.categories[i.ref.props.serviceId-1].services
        // console.log("SERVICES IN SET TAB", services)
        this.setState({
            currentTab: i.i,
            // services
        })
    }
    addItem = (item) => {
        console.log("ITEM RECIVEEEED", item)
        // this.setState()
        if (item) {
            this.props.addItemToCart(item)
            // Toast.show({
            //     text: "Item Added to Cart",
            //     textStyle:{textAlign:"center"},
            //     style:{width:"90%", alignSelf:"center", borderRadius:10},
            //     position: "top",
            //     type:'success',
            //     duration:2000
            //   })
        }


    }
    render() {
        console.log("SERVICES TABS", this.state)
        const { currentTab, serviceId, initialPage, } = this.state
        return (
            <Container style={styles.container}>
                <CustomHeader header="Services" icon="arrow-back" leftButton={() => this.props.navigation.navigate('Services')}/>
                {this.props.categories && <Tabs initialPage={initialPage} page={currentTab} tabContainerStyle={{ elevation: 0 }} renderTabBar={() => <ScrollableTab />} tabBarUnderlineStyle={{ backgroundColor: colors.primaryBtn }}
                    onChangeTab={(i) => this.setTab(i)}>
                    {this.props.categories.map(service =>
                        <Tab serviceId={service.id} heading={service.category} tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                            <CustomTab serviceId={service.id} services={service.services} onPress={this.addItem} />
                        </Tab>)}
                </Tabs>}
                <CustomFooter navigation={this.props.navigation} />
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
        elevation: 0,
    }
})
const mapStataToProps = ({ categories }) => (categories)
const mapDispatchToProps = dispatch => ({
    addItemToCart: data => dispatch(addServiceToCart(data))
})
export default connect(mapStataToProps, mapDispatchToProps)(ServicesTabs);