import React, { Component } from 'react';
import { Content, ListItem, Text, View, Icon, Switch, Container } from 'native-base';
import { StyleSheet, Image, FlatList } from 'react-native';
import Details from '../../bookingDetails/bookingDetail';
import CustomHeader from '../../../components/header/customHeader';
import Customfooter from '../../../components/footer/customfooter';
import { connect } from 'react-redux';
import { jobsDetailsMiddleware } from '../../../redux/jobs/jobs.middleware';
import { CustomButton } from '../../../components/buttons/Buttons';
import { colors } from '../../../configs/colors';
// import { CustomButton } from '../buttons/Buttons'
// import clock from '../../assets/clock.png'
// import { colors } from '../../configs/colors'
// import { connect } from 'react-redux';
// import { removeServiceFromCart } from '../../redux/cart/cart.actions';

class BookingDetails extends Component {
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
        return (
            <Container>
                <CustomHeader header="Details" icon="arrow-back" leftButton={() => this.props.navigation.goBack()}
                    rightButton={() => this.props.navigation.navigate('Notification')} />
                <Details details={details} />
                {
                    details && details.job_status === "101" && <View>
                        <CustomButton backgroundColor={colors.primaryBtn}
                            width="100%"
                            height={50}
                            value="Cancel"
                            color="white"
                        />
                    </View>
                }
                <Customfooter navigation={this.props.navigation} isActive='bookings' />
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
export default connect(mapStateToProps, mapDispatchToProps)(BookingDetails)