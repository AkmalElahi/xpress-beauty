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
import Loader from '../../../components/loader/Loader';



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
    componentDidUpdate(prevProps) {
        const { jobs, user } = this.props
        if (jobs !== prevProps) {
            if (jobs.message === "update job success") {
                // alert("FIND JOBS")
                this.props.getBookings({ appuid: user.appuid, token: user.token })
            }
        }
    }
    handleRefresh = () => {
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
                            <Icon name='home' style={{ color: "black", }} size={10} />
                        </Button>
                    </Right>
                </Header>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: colors.bg2 }}>
                    <Tab heading="Scheduled" tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                        {this.props.isloading ? <Loader /> : <Sheduled refreshing= {this.props.isloading} handleRefresh={this.handleRefresh} navigation={this.props.navigation} bookings={this.props.bookings.filter(booking => booking.job_status === "301" || booking.job_status === "401")} />}
                    </Tab>
                    <Tab heading="History" tabStyle={styles.tabs} textStyle={{ color: 'grey', fontSize: 12 }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                        {this.props.isloading ? <Loader /> : <History  refreshing= {this.props.isloading}  handleRefresh={this.handleRefresh} navigation={this.props.navigation} bookings={this.props.bookings.filter(booking => booking.job_status === "201" || booking.job_status === "500" || booking.job_status === "202")} />}
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
const mapStateToProps = ({ user, jobs, bookings: { bookings, isloading } }) => ({ user, bookings, isloading, jobs })
const mapDispatchToProps = dispatch => ({
    getBookings: data => dispatch(freelancerBookingsMiddleware(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(FreelancerBookings);