import React, { Component } from 'react';
import { Content, ListItem, Text, View, Icon, Container, Header, Left, Right, Body, Button, Title } from 'native-base';
import { StyleSheet, Image, } from 'react-native';
import Details from '../../bookingDetails/bookingDetail';
import Customfooter from '../../../components/footer/customfooter';
// import { CustomButton } from '../buttons/Buttons'
import bell from '../../../assets/bell.png'
import FreelancerFooter from '../../../components/footer/freelancerFooter';
import { connect } from 'react-redux';
import { jobsDetailsMiddleware } from '../../../redux/jobs/jobs.middleware';
import { CustomButton } from '../../../components/buttons/Buttons';
import { colors } from '../../../configs/colors';
// import { colors } from '../../configs/colors'
// import { connect } from 'react-redux';
// import { removeServiceFromCart } from '../../redux/cart/cart.actions';

class FreelancerBookingDetails extends Component {
    state = {
        details: null
    }
    componentDidMount() {
        const { user } = this.props
        const job = this.props.navigation.getParam("job")
        if (user && job) {
            this.props.getJobDetail({ appuid: user.appuid, token: user.token, booking_id: job.services[0].job_id, })
        }
    }
    componentDidUpdate(prevProps) {
        const { jobs } = this.props
        if (prevProps.jobs !== jobs) {
            if (jobs.message === "job details found successfully") {
                this.setState({
                    details: jobs.details
                })
            }
        }
    }
    render() {
        // console.log("SUMMARY", total, totalDuration, cart)
        const { details } = this.state
        console.log("DETAILS IN DETAILS ", details)
        return (
            <Container>
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
                        <Button transparent >
                            <Image source={bell} style={{ width: 20, height: 25 }} />
                        </Button>
                    </Right>
                </Header>
                <Details details={details} />
                {
                    details && details.job_status === "301" && <View>
                        <CustomButton backgroundColor={colors.freelancerButton}
                            width="100%"
                            height={50}
                            value="Check In"
                            color="white"
                        />
                    </View>
                }
                {
                    details && details.job_status === "401" && <View>
                        <CustomButton backgroundColor={colors.freelancerButton}
                            width="100%"
                            height={50}
                            value="End Job"
                            color="white"
                        />
                    </View>
                }
                <FreelancerFooter navigation={this.props.navigation} isActive="bookings" />
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    divider: {
        width: "90%",
        // height: 100,
        // marginTop: "5%",
        paddingBottom: "2%",
        alignSelf: "center",
        justifyContent: "center"
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        paddingBottom: 10
    }
})
const mapStateToProps = ({ user, jobs }) => ({ user, jobs })

const mapDispatchToProps = dispatch => ({
    getJobDetail: data => dispatch(jobsDetailsMiddleware(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(FreelancerBookingDetails)