import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import ApprovalScreen from '../approvalScreen/approvalScreen'
import { Content, Container, Header, Left, Body, Icon, Button, Title, Right, Switch } from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';
import { checkFreelancerStatus } from '../../../redux/user/user.middlewares';
import colors from '../../../configs/colors'
import bell from '../../../assets/bell.png'
import NotificationsList from './NotificationsList';
import { jobssMiddleware } from '../../../redux/jobs/jobs.middleware';
class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region:{}
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
    render() {
        const { user } = this.props
        return (
            <Container>
                <Header style={styles.header} androidStatusBarColor={"white"} iosBarStyle="dark-content">
                    <Left style={{ flex: 1 }}>
                        {user && user.is_approved === "1" && <Button transparent>
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
                            <Switch onValueChange={(value) => alert(value)} />
                            <Text style={{ fontSize: 10, textAlign: "center" }}>Active</Text>
                        </Button>
                        {user && user.is_approved === "1" && <Button transparent onPress={() => alert("BELL")}>
                            <Image source={bell} style={{ width: 20, height: 25 }} />
                        </Button>}
                    </Right>
                </Header>
                {user && user.is_approved === "0" && <ApprovalScreen />}
                {user && user.is_approved === "1" && <NotificationsList region={this.state.region} 
                jobs = {this.props.jobs && this.props.jobs.jobs}
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
    getJobs: data => dispatch(jobssMiddleware(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Notification);