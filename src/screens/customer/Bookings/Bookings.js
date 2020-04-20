import React, { Component } from 'react';
import { Container, Tab, Tabs, ScrollableTab, Drawer } from 'native-base'
import { StyleSheet } from 'react-native'
import { colors } from '../../../configs/colors'
import CustomHeader from '../../../components/header/customHeader'
import CustomFooter from '../../../components/footer/customfooter'
import Sheduled from '../../../components/scheduled/Sheduled'
import History from '../../../components/history/History';
import { connect } from 'react-redux';
import { bookingsMiddleware } from '../../../redux/bookings/bookings.middleware';
import DrawerContent from '../../../components/Drawer/Drawer';
import Loader from '../../../components/loader/Loader';



class Bookings extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        const { user } = this.props
        console.log("PROPS IN BOOKINGS", this.props.bookings)
        this.props.getBookings({ appuid: user.appuid, token: user.token })
    }
    openDrawer = () => {
        this.drawer._root.open()
    };
    closeDrawer = () => {
        this.drawer._root.close()
    }
    render() {
        return (
            <Drawer
                tapToClose={true}
                ref={(ref) => { this.drawer = ref; }}
                content={<DrawerContent navigation={this.props.navigation} close={this.closeDrawer} />}
                onClose={() => this.closeDrawer()}
            >
                <Container style={styles.container}>
                    <CustomHeader header="Bookings" icon="menu" leftButton={() => this.openDrawer()}
                        rightButton={() => this.props.navigation.navigate('Notification')} />
                    <Tabs tabBarUnderlineStyle={{ backgroundColor: colors.bg2 }}>
                        <Tab heading="Scheduled" tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                            {this.props.isloading ? <Loader /> : <Sheduled navigation={this.props.navigation} bookings={this.props.bookings.filter(booking => booking.job_status === "101" || booking.job_status === "301" || booking.job_status === "401")} />}
                        </Tab>
                        <Tab heading="History" tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                            {this.props.isloading ? <Loader /> : <History  navigation={this.props.navigation} bookings={this.props.bookings.filter(booking => booking.job_status === "201" || booking.job_status === "500")} />}
                        </Tab>
                    </Tabs>
                    <CustomFooter navigation={this.props.navigation} isActive='bookings' />
                </Container>
            </Drawer>
        )
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
const mapStateToProps = ({ user, bookings: { bookings, isloading } }) => ({ user, bookings, isloading })
const mapDispatchToProps = dispatch => ({
    getBookings: data => dispatch(bookingsMiddleware(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Bookings);