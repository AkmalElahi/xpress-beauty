import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import { Container, Content, Header, Left, Right, Body, Title, Button, Icon, Item, Footer, Toast } from 'native-base'
import bell from '../../../assets/bell.png'
import profile from '../../../assets/user.png'
import services from '../../../assets/services.png'
import payment from '../../../assets/payment.png'
import date from '../../../assets/date.png'
import distance from '../../../assets/distance.png'
import { CustomButton } from '../../../components/buttons/Buttons';
import { colors } from '../../../configs/colors';
import FreelancerFooter from '../../../components/footer/freelancerFooter';
import ReejctReasons from '../../../components/Modal/rejectJobModal';
import { connect } from 'react-redux';
import { updatejobMiddleWare } from '../../../redux/jobs/jobs.middleware';
import Loader from '../../../components/loader/Loader';

class JobDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            job: {},
            modalVisible: false,
            rejectReason: "",
            comments: "",
            user: {}
        }
    }
    componentDidMount() {
        const { user } = this.props
        this.setState({
            job: this.props.navigation.getParam("job"),
            user
        })
    }
    submit = () => {
        const { job, rejectReason, comments, user } = this.state
        if (!rejectReason || !comments || !job) {
            this.setState({
                error: true,
                type: "Rejected"
            })
            return
        }
        this.props.updateJob({
            booking_id: job.services && job.services[0].job_id,
            token: user.token,
            appuid: user.appuid,
            status: 202,
            reason: rejectReason,
            comment: comments,
            type: "reject"
        })

    }
    accept = () => {
        const { job, user } = this.state
        if (job && user) {
            this.setState({ type: "Accepted" })
            this.props.updateJob({
                booking_id: job.services && job.services[0].job_id,
                token: user.token,
                appuid: user.appuid,
                status: 301,
                type: "accept"
            })
        }
    }
    componentDidUpdate(prevProps) {
        const { jobs } = this.props
        if (prevProps.jobs !== jobs) {
            if (jobs.message === "update job success") {
                this.setState({
                    job: {},
                    modalVisible: false,
                    rejectReason: "",
                    comments: "",
                    user: {}
                })
                Toast.show({
                    text: `Job Updated successfully`,
                    textStyle: { textAlign: "center" },
                    // style: { width: "90%", alignSelf: "center", borderRadius: 10 },
                    position: "bottom",
                    type: 'success',
                    duration: 3000
                })
                this.props.navigation.navigate("FreelancerBookings")
            }
            if (jobs.message === "update job fail") {
                Toast.show({
                    text: "Error in updating job please try again",
                    textStyle: { textAlign: "center" },
                    // style: { width: "90%", alignSelf: "center", borderRadius: 10 },
                    position: "bottom",
                    type: 'warning',
                    duration: 3000
                })
            }
        }

    }
    render() {
        const { job, rejectReason, comments, modalVisible, user } = this.state
        // console.log(job.services && job.services[0].job_id)
        // console.log("user", user)
        console.log("JOB IN DETAIL", job)
        return (
            <Container >
                {/* {this.props.jobs.loading && <Loader />} */}
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
                <Content
                    nestedScrollEnabled={true}
                    contentContainerStyle={{ width: "80%", alignSelf: "center", }}>
                    <View style={{ flexDirection: "row", padding: 5, paddingLeft: 0, alignItems: "center" }}>
                        <Image source={profile} style={{ width: 30, height: 30 }} />
                        <Text style={{ paddingLeft: 10, textAlign: "center", fontSize: 20, fontWeight: "bold" }}>{job.customer_name}</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.heading}>
                            <Image source={services} style={{ width: 30, height: 25 }} />
                            <Text style={styles.headingText}>Service</Text>
                        </View>
                        <FlatList
                            data={job.services}
                            renderItem={({ item }) => (
                                <View style={styles.row}>
                                    <Text style={styles.padder}>{item.service}</Text>
                                    <Text>Rs. {item.price}</Text>
                                </View>
                            )}
                        />
                        <View style={styles.row}>
                            <Text style={{ ...styles.headingText, paddingLeft: 35 }}>Total</Text>
                            <Text style={styles.headingText}>Rs. {job.services && job.services.reduce((acc, service) => acc = acc + parseInt(service.price), 0)}</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.heading}>
                            <Image source={date} style={{ width: 30, height: 30 }} />
                            <Text style={styles.headingText}>Date and Time</Text>
                        </View>
                        <Text style={styles.padder}>{job.appointment_datetime}</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.heading}>
                            <Image source={distance} style={{ width: 18, height: 25 }} />
                            <Text style={{ ...styles.headingText, paddingLeft: 18 }}>Address</Text>
                        </View>
                        <Text style={styles.padder}>{job && `${job.house ? job.house : ""} ${job.building}, ${job.street} ${job.area}, ${job.city}`}</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.heading}>
                            <Image source={distance} style={{ width: 18, height: 25 }} />
                            <Text style={{ ...styles.headingText, paddingLeft: 18 }}>Distance from your current location</Text>
                        </View>
                        <Text style={styles.padder}>{job.distance}</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.heading}>
                            <Image source={payment} style={{ width: 30, height: 25 }} />
                            <Text style={styles.headingText}>Payment Method</Text>
                        </View>
                        <Text style={styles.padder}>{job.payment_method}</Text>
                    </View>
                </Content>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <View style={styles.button}>
                            <CustomButton
                                onPress={this.accept}
                                backgroundColor={colors.freelancerButton}
                                value="Accept"
                                height={50}
                                color="white"
                            />
                        </View>
                        <View style={styles.button}>
                            <CustomButton
                                onPress={() => this.setState({ modalVisible: true })}
                                backgroundColor="lightgrey"
                                value="Reject"
                                height={50}
                                color={colors.freelancerButton}
                            />
                        </View>
                    </View>
                </View>
                <ReejctReasons
                    onclose={() => this.setState({ modalVisible: false, comments: "", rejectReason: "" })}
                    submit={this.submit}
                    onChangeComment={(text) => this.setState({ comments: text })}
                    onChangeReject={(text) => this.setState({ rejectReason: text })}
                    rejectReason={rejectReason}
                    comments={comments}
                    modalVisible={modalVisible} />
                <FreelancerFooter navigation={this.props.navigation} />
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
        elevation: 0
    },
    heading: {
        flexDirection: "row",
        // backgroundColor:"blue"
    },
    headingText: {
        paddingLeft: 8,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    padder: {
        paddingLeft: 35
    },
    container: {
        marginTop: 25,
        paddingBottom: 5,
        // borderBottomWidth:0.5,
        // borderBottomColor:'grey'
    },
    button: {
        width: "50%"
    }
})
const mapStateToProps = ({ user, jobs }) => ({ user, jobs })
const mapDispatchToProps = (dispatch) => ({
    updateJob: data => dispatch(updatejobMiddleWare(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(JobDetail)