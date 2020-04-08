import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import ApprovalScreen from '../approvalScreen/approvalScreen'
import { Content, Container, Header, Left, Body, Icon, Button, Title, Right, Switch } from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';
import { checkFreelancerStatus } from '../../../redux/user/user.middlewares';
// import colors from '../../../configs/colors'
import bell from '../../../assets/bell.png'
import NotificationsList from './NotificationsList';
import { jobssMiddleware } from '../../../redux/jobs/jobs.middleware';
import InActive from '../approvalScreen/InActive';
import { colors } from '../../../configs/colors';
import { setActive } from '../../../redux/user/user.actions';
import FreelancerFooter from '../../../components/footer/freelancerFooter';
class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {},
            active: true,
            refreshing: false
        }
    }
    getPosition = async () => {
        // console.log("INSIDE GET POSTION")
        Geolocation.getCurrentPosition(
            (position) => {
                const region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                // console.log("REGION", position)
                this.setState({
                    region: region,
                    loading: false,
                });
            },
            (error) => {
                // alert(error);
                this.setState({
                    error: error.message,
                    loading: false,

                })
            },
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
        );
    }
    componentDidMount() {
        const { user } = this.props
        console.log("USER IN NOTIFFFF", user)
        this.props.checkStatus(user)
        this.getPosition()
    }
    componentDidUpdate(prevProps) {
        const { user } = this.props
        if (prevProps.user !== user) {
            if (user.message === "check freelancer status success" && user.is_approved === "1" && user.status === "Approved") {
                console.log("SUERRRRRRRRRRRRRRRr", user)
                const { region } = this.state
                this.props.getJobs({
                    appuid: user.appuid,
                    token: user.token,
                    latitute: region.latitude,
                    longitude: region.longitude
                })

            }
        }

    }
    handleRefresh = () => {
        // this.setState({
        //     refreshing:true
        // })
        const { user } = this.props
        const { region } = this.state
        this.props.getJobs({
            appuid: user.appuid,
            token: user.token,
            latitute: region.latitude,
            longitude: region.longitude
        })
    }
    render() {
        const { region, active } = this.state
        const { user } = this.props
        return (
            <Container>
                <Header style={styles.header} androidStatusBarColor={"white"} iosBarStyle="dark-content">
                    <Left style={{ flex: 1 }}>
                        {user.isActive && user && user.is_approved === "1" && <Button transparent>
                            <Icon name='menu' style={{ color: "black" }} />
                        </Button>}
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title style={{ color: "black", fontWeight: "normal" }} >Notifications</Title>
                    </Body>
                    <Right style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Button transparent style={{
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            width: 60
                        }}>
                            <Switch value={user.isActive}
                                ios_backgroundColor="white"
                                thumbColor={colors.freelancerButton}
                                trackColor={{ false: "lightgrey", true: "lightgrey" }}
                                onValueChange={(value) => this.props.setActive(value)} />
                            <Text style={{ fontSize: 10, textAlign: "center" }}>Active</Text>
                        </Button>
                        {user.isActive && user && user.is_approved === "1" && <Button transparent onPress={() => alert("BELL")}>
                            <Image source={bell} style={{ width: 20, height: 25 }} />
                        </Button>}
                    </Right>
                </Header>
                {user.isActive && user && user.is_approved === "0" && <ApprovalScreen />}
                {user.isActive && user && user.is_approved === "1" && <NotificationsList
                    refreshing={this.props.jobs.loading}
                    handleRefresh={this.handleRefresh}
                    region={region}
                    jobs={this.props.jobs && this.props.jobs.jobs}
                    navigation={this.props.navigation}
                />}
                {!user.isActive && <InActive />}
                {user.isActive && <FreelancerFooter
                    navigation={this.props.navigation}
                />}
            </Container>

        )
    }
}
const styles = StyleSheet.create({
    header: {
        // marginTop: "3%",
        backgroundColor: "transparent",
        elevation: 0,
        borderBottomWidth: 0
    },
})
const mapStateToProps = ({ user, jobs }) => ({ user, jobs })
const mapDispatchToProps = (dispatch) => ({
    checkStatus: data => dispatch(checkFreelancerStatus(data)),
    getJobs: data => dispatch(jobssMiddleware(data)),
    setActive: data => dispatch(setActive(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Notification);