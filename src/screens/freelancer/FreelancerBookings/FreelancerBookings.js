import React, { Component } from 'react';
import { Container, Tab, Tabs, Drawer, Header, Left, Body, Right, Button, Icon, Title } from 'native-base'
import { StyleSheet } from 'react-native'
import { colors } from '../../../configs/colors'
import CustomFooter from '../../../components/footer/customfooter'
import Sheduled from '../../../components/scheduled/Sheduled'
import History from '../../../components/history/History';
import { connect } from 'react-redux';
import { freelancerBookingsMiddleware } from '../../../redux/bookings/bookings.middleware';
import FreelancerFooter from '../../../components/footer/freelancerFooter';



class FreelancerBookings extends Component {
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

    render() {
        return (
            <Container style={styles.container}>
                <Header style={styles.header} androidStatusBarColor={"white"} iosBarStyle="dark-content">
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{ color: "black" }} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 0 }}>
                        <Title style={{ color: "black", fontWeight: "normal" }} >Details</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.props.navigation.navigate("FreelancerNotification")}>
                            <Icon name='home' style={{ color: "black" }} />
                        </Button>
                    </Right>
                </Header>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: colors.bg2 }}>
                    <Tab heading="Scheduled" tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                        {!!this.props.bookings.length && <Sheduled navigation={this.props.navigation}  bookings={this.props.bookings.filter(booking => booking.job_status === "301" || booking.job_status === "401")} />}
                    </Tab>
                    <Tab heading="History" tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                        {!!this.props.bookings.length && <History navigation={this.props.navigation} bookings={this.props.bookings.filter(booking => booking.job_status === "201" || booking.job_status === "500" || booking.job_status === "202")} />}
                    </Tab>
                </Tabs>
                <FreelancerFooter navigation={this.props.navigation} isActive='bookings' />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // marginTop: "3%",
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
const mapStateToProps = ({ user, bookings: { bookings } }) => ({ user, bookings })
const mapDispatchToProps = dispatch => ({
    getBookings: data => dispatch(freelancerBookingsMiddleware(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(FreelancerBookings);