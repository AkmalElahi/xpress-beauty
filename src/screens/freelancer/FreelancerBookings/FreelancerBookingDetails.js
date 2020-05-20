import React, { Component } from 'react';
import { Content, ListItem, Text, View, Icon, Container, Header, Left, Right, Body, Button, Title, Toast } from 'native-base';
import { StyleSheet, Image, } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Details from '../../bookingDetails/bookingDetail';
import Customfooter from '../../../components/footer/customfooter';
// import { CustomButton } from '../buttons/Buttons'
import bell from '../../../assets/bell.png'
import FreelancerFooter from '../../../components/footer/freelancerFooter';
import { connect } from 'react-redux';
import { jobsDetailsMiddleware, updatejobMiddleWare, rateJobMiddleware } from '../../../redux/jobs/jobs.middleware';
import { CustomButton } from '../../../components/buttons/Buttons';
import { colors } from '../../../configs/colors';
import Loader from '../../../components/loader/Loader';
import RatingModal from '../../../components/Modal/RatingModal';
// import { colors } from '../../configs/colors'
// import { connect } from 'react-redux';
// import { removeServiceFromCart } from '../../redux/cart/cart.actions';

class FreelancerBookingDetails extends Component {
    state = {
        details: null,
        region: null,
        type: "",
        rating: 0,
        comments: "",
        modalVisible: false,
        disabble: false,
        loading:false
    }
    componentDidMount() {
        const { user } = this.props
        const job = this.props.navigation.getParam("job")
        console.log("USER AND JOB", user, job)
        if (user && job) {
            this.props.getJobDetail({ appuid: user.appuid, token: user.token, booking_id: job.services[0].job_id, user_type: user.user_type })
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
            const { type } = this.state
            if (jobs.message === "update job success") {
                Toast.show({
                    text: type === "checkin" ? "Job successfully checkedIn" : "You have completed job successfully",
                    textStyle: { textAlign: "center" },
                    style: { width: "90%", alignSelf: "center", borderRadius: 10 },
                    position: "bottom",
                    type: 'success',
                    duration: 2000
                })
                if (type === "complete") {
                    this.setState({ modalVisible: true, disabble: false, })
                }
                else {
                    this.props.navigation.navigate("FreelancerBookings")

                }
            }
            if (jobs.message === "job rating success") {
                this.setState({ modalVisible: false, comments: "", rating: 0 })
                Toast.show({
                    text: "Thank you for your feedback",
                    textStyle: { textAlign: "center" },
                    style: { width: "90%", alignSelf: "center", borderRadius: 10 },
                    position: "bottom",
                    type: 'success',
                    duration: 2000
                })
                this.props.navigation.navigate("FreelancerBookings")

            }
            if (jobs.message === "update job fail") {
                this.setState({ disabble: false })
                Toast.show({
                    // text: type === "checkin" ? "You need to be present at above address to start this job!" : "Take your proper time its too early to complete the job!",
                    text: jobs.errorMessage,
                    textStyle: { textAlign: "center" },
                    style: { width: "100%" },
                    position: "bottom",
                    type: 'warning',
                    duration: 3000
                })
            }
        }
    }

    handleCheckIn = async () => {
        this.setState({ disabble: true, loading:true })
        const job = this.props.navigation.getParam("job")
        Geolocation.getCurrentPosition(
            (position) => {
                const region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                // console.log("REGION", position)
                this.setState({ region, type: "checkin", loading:false }, () => {
                    this.props.updateJob({
                        latitude: region.latitude,
                        longitude: region.longitude,
                        appuid: this.props.user.appuid,
                        token: this.props.user.token,
                        type: "checkin",
                        status: "401",
                        booking_id: job.services[0].job_id,
                    })
                });
            },
            (error) => {
                alert("Please On your device location in order to proceed further!");
                this.setState({
                    error: error.message,
                    loading: false,
                    disabble: false

                })
            },
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
        );
    }
    handleCompleteJob = () => {
        const job = this.props.navigation.getParam("job")
        this.setState({ type: "complete" })
        this.props.updateJob({
            appuid: this.props.user.appuid,
            token: this.props.user.token,
            type: "complete",
            status: "500",
            booking_id: job.services[0].job_id,
        })
    }
    rateCustomer = () => {
        const { user } = this.props
        const { comments, rating } = this.state
        const job = this.props.navigation.getParam("job")
        if (user && job) {
            this.props.rateCustomer({
                user_type: user.user_type,
                token: user.token,
                appuid: user.appuid,
                booking_id: job.services[0].job_id,
                rating,
                comments,
            })
        }
    }
    render() {
        // console.log("SUMMARY", total, totalDuration, cart)
        const { details, modalVisible, rating, comments, disabble, loading } = this.state
        console.log("DETAILS IN DETAILS ", details && details.freelancer[0].rating_pending)
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
                            {/* <Image source={bell} style={{ width: 20, height: 25 }} /> */}
                        </Button>
                    </Right>
                </Header>
                {(this.props.jobs.loading || loading) ? <Loader /> :
                    <>
                        <Details details={details} type="customer" />
                        {
                            details && details.job_status === "301" && <View>
                                <CustomButton backgroundColor={!disabble ? colors.freelancerButton : "lightgrey"}
                                    onPress={this.handleCheckIn}
                                    width="100%"
                                    height={50}
                                    value="Check In"
                                    color="white"
                                    disabled={disabble}
                                />
                            </View>
                        }
                        {
                            details && details.job_status === "500" && details.freelancer[0].rating_pending === 0 && <View>
                                <CustomButton backgroundColor={colors.freelancerButton}
                                    onPress={() => this.setState({ modalVisible: true })}
                                    width="100%"
                                    height={50}
                                    value="Rate your Customer"
                                    color="white"
                                />
                            </View>
                        }
                        {
                            details && details.job_status === "401" && <View>
                                <CustomButton backgroundColor={colors.freelancerButton}
                                    onPress={this.handleCompleteJob}
                                    width="100%"
                                    height={50}
                                    value="End Job"
                                    color="white"
                                />
                            </View>
                        }
                        <RatingModal submit={this.rateCustomer}
                            text={"Rate Your Customer"}
                            onclose={() => this.setState({ modalVisible: false, comments: "", rating: 0 })}
                            rating={rating}
                            comments={comments}
                            onChangeComment={(text) => this.setState({ comments: text })}
                            onChangeRating={(value) => this.setState({ rating: value })}
                            modalVisible={modalVisible} />
                    </>}
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
    },
    header: {
        backgroundColor: "transparent",
        elevation: 0
    },
})
const mapStateToProps = ({ user, jobs }) => ({ user, jobs })

const mapDispatchToProps = dispatch => ({
    getJobDetail: data => dispatch(jobsDetailsMiddleware(data)),
    updateJob: data => dispatch(updatejobMiddleWare(data)),
    rateCustomer: data => dispatch(rateJobMiddleware(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(FreelancerBookingDetails)