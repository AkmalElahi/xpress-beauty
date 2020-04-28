import React, { Component } from 'react';
import { Content, ListItem, Text, View, Icon, Switch, Container, Toast } from 'native-base';
import { StyleSheet, Image, FlatList } from 'react-native';
import Details from '../../bookingDetails/bookingDetail';
import CustomHeader from '../../../components/header/customHeader';
import Customfooter from '../../../components/footer/customfooter';
import { connect } from 'react-redux';
import { jobsDetailsMiddleware, cancelJobMiddleware, rateJobMiddleware } from '../../../redux/jobs/jobs.middleware';
import { CustomButton } from '../../../components/buttons/Buttons';
import JobCancelModal from '../../../components/Modal/cancelJobModal'
import { colors } from '../../../configs/colors';
import Loader from '../../../components/loader/Loader';
import RatingModal from '../../../components/Modal/RatingModal';
// import { CustomButton } from '../buttons/Buttons'
// import clock from '../../assets/clock.png'
// import { colors } from '../../configs/colors'
// import { connect } from 'react-redux';
// import { removeServiceFromCart } from '../../redux/cart/cart.actions';

class BookingDetails extends Component {
    state = {
        rating: 0,
        details: null,
        rateModalVisible: false,
        modalVisible: false,
        cancelReason: "",
        comments: "",
        ratingComments: ""
    }
    componentDidMount() {
        const { user } = this.props
        const job = this.props.navigation.getParam("job")
        if (user && job) {
            this.props.getJobDetail({ appuid: user.appuid, token: user.token, booking_id: job.services[0].job_id,  user_type:user.user_type })
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
        
        if (jobs.message === "job cancel success") {
            Toast.show({
                text: "Job successfully cancelled",
                textStyle: { textAlign: "center" },
                style: { width: "90%", alignSelf: "center", borderRadius: 10 },
                position: "bottom",
                type: 'success',
                duration: 2000
            })
            this.props.navigation.navigate("Bookings")
        }
        if (jobs.message === "job rating success") {
            Toast.show({
                text: "Thank you for your feedback",
                textStyle: { textAlign: "center" },
                style: { width: "90%", alignSelf: "center", borderRadius: 10 },
                position: "bottom",
                type: 'success',
                duration: 2000
            })
            this.props.navigation.navigate("Bookings")
        }
        if (jobs.message === "job cancel fail") {
            this.setState({modalVisible:false})
            Toast.show({
                text: "error in camcel this job try again!",
                textStyle: { textAlign: "center" },
                style: { width: "90%", alignSelf: "center", borderRadius: 10 },
                position: "bottom",
                type: 'warning',
                duration: 1800
            })
        }if (jobs.message === "job rating fail") {
            Toast.show({
                text: "error in camcel this job try again!",
                textStyle: { textAlign: "center" },
                style: { width: "90%", alignSelf: "center", borderRadius: 10 },
                position: "bottom",
                type: 'warning',
                duration: 1800
            })
        }
    }
    }
    cancelJob = () => {
        const { user } = this.props
        const { comments, cancelReason } = this.state
        const job = this.props.navigation.getParam("job")
        if (user && job) {
            this.setState({ modalVisible: false, comments: "", cancelReason: "" })
            this.props.cancelJob({
                token: user.token,
                appuid: user.appuid,
                booking_id: job.services[0].job_id,
                reason: cancelReason,
                comments,
                status: "201"
            })
        }
    }
    rateFreelancer = () => {
        const { user } = this.props
        const { ratingComments, rating } = this.state
        const job = this.props.navigation.getParam("job")
        if (user && job) {
            this.setState({ rateModalVisible: false, ratingComments: "", rating: 0 })
            this.props.rateFreelancer({
                user_type:user.user_type,
                token: user.token,
                appuid: user.appuid,
                booking_id: job.services[0].job_id,
                rating,
                ratingComments,
            })
        }
    }
    render() {
        console.log("DETAIL ", this.state.details && this.state.details.freelancer)
        const { details, modalVisible, cancelReason, comments, rateModalVisible, rating, ratingComments } = this.state
        return (
            <Container>
                <CustomHeader header="Details" icon="arrow-back" leftButton={() => this.props.navigation.goBack()}
                    rightButton={() => this.props.navigation.navigate('Notification')} />
                {this.props.jobs.loading ? <Loader />
                    : <>
                        <Details details={details} type="freelancer"/>
                        {
                            details && details.job_status === "101" && <View>
                                <CustomButton backgroundColor={colors.primaryBtn}
                                    onPress={() => this.setState({ modalVisible: true })}
                                    width="100%"
                                    height={50}
                                    value="Cancel"
                                    color="white"
                                />
                            </View>
                        }
                        {
                            details && details.job_status === "500" && details.customer[0].rating_pending === 0 &&<View>
                                <CustomButton backgroundColor={colors.primaryBtn}
                                    onPress={() => this.setState({ rateModalVisible: true })}
                                    width="100%"
                                    height={50}
                                    value="Rate your Beautician"
                                    color="white"
                                />
                            </View>
                        }
                        <JobCancelModal
                            modalVisible={modalVisible}
                            onclose={() => this.setState({ modalVisible: false, comments: "", cancelReason: "" })}
                            submit={this.cancelJob}
                            onChangeComment={(text) => this.setState({ comments: text })}
                            onChangeReason={(text) => this.setState({ cancelReason: text })}
                            cancelReason={cancelReason}
                            comments={comments} />
                        <RatingModal
                            submit={this.rateFreelancer}
                            onclose={() => this.setState({ rateModalVisible: false, ratingComments: "", rating: 0 })}
                            rating={rating}
                            comments={ratingComments}
                            onChangeComment={(text) => this.setState({ ratingComments: text })}
                            onChangeRating={(value) => this.setState({ rating: value })}
                            modalVisible={rateModalVisible}
                        />
                    </>
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
    getJobDetail: data => dispatch(jobsDetailsMiddleware(data)),
    cancelJob: data => dispatch(cancelJobMiddleware(data)),
    rateFreelancer : data => dispatch(rateJobMiddleware(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(BookingDetails)