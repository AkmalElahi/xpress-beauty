import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import ApprovalScreen from '../approvalScreen/approvalScreen'
import { Content, Container, Header, Left, Body, Icon, Button, Title, Right, Switch, Drawer } from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';
import { checkFreelancerStatus, setFreelancerStatusMiddleware } from '../../../redux/user/user.middlewares';
// import colors from '../../../configs/colors'
import bell from '../../../assets/bell.png'
import NotificationsList from './NotificationsList';
import { jobssMiddleware } from '../../../redux/jobs/jobs.middleware';
import InActive from '../approvalScreen/InActive';
import { colors } from '../../../configs/colors';
import { setActive } from '../../../redux/user/user.actions';
import FreelancerFooter from '../../../components/footer/freelancerFooter';
import Loader from '../../../components/loader/Loader';
import NotFound from '../../../components/not found/NotFound';
import FreelancerDrawer from '../../../components/Drawer/FreelancerDrawer';
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
        const { region } = this.state
        console.log("USER IN NOTIFFFF", user)
        this.props.checkStatus(user)
        this.getPosition()
        // if (user.is_approved === "1" && user.status === "Approved") {
    }
    componentDidUpdate(prevProps) {
        const { user, jobs } = this.props
        if (prevProps.user !== user) {
            if (user.message === "check freelancer status success" && user.is_approved === "1" && user.status === "Approved") {
                console.log("SUERRRRRRRRRRRRRRRr", user)
                const { region } = this.state
                console.log("REGIONNNN ============> ", region)
                this.props.getJobs({
                    appuid: user.appuid,
                    token: user.token,
                    latitute: region.latitude,
                    longitude: region.longitude
                })

            }
        }
        if (prevProps.jobs !== jobs) {
            if (jobs.message === "update job success") {
                this.getPosition()
                console.log("SUERRRRRRRRRRRRRRRr", user)
                const { region } = this.state
                this.props.getJobs({
                    appuid: user.appuid,
                    token: user.token,
                    latitute: region.latitude,
                    longitude: region.longitude
                })

            }
            if (jobs.message === "job rating success") {
                this.getPosition()
                console.log("SUERRRRRRRRRRRRRRRr", user)
                const { region } = this.state
                console.log("REGIONNNN ============> ", region)
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
    setFreelancerStatus = (value) => {
        const { user } = this.props
        this.props.setFreelancerStatus({ appuid: user.appuid, token: user.token, is_active: value })
    }
    openDrawer = () => {
        this.drawer._root.open()
    };
    closeDrawer = () => {
        this.drawer._root.close()
    }
    render() {
        const { region, active } = this.state
        const { user } = this.props
        return (
            <Drawer
                panOpenMask={.25}
                side="left"
                acceptPan={true}
                tapToClose={true}
                ref={(ref) => { this.drawer = ref; }}
                content={<FreelancerDrawer navigation={this.props.navigation} close={this.closeDrawer} />}
                onClose={() => this.closeDrawer()} >
                <Container>
                    {/* <Loader/> */}
                    <Header style={styles.header} androidStatusBarColor={"white"} iosBarStyle="dark-content">
                        <Left style={{ flex: 1 }}>
                            {user.isActive && user && user.is_approved === "1" && <Button
                                onPress={() => this.openDrawer()}
                                transparent>
                                <Icon name='menu' style={{ color: "black" }} />
                            </Button>}
                        </Left>
                        <Body style={{ flex: 1 }}>
                            <Title style={{ color: "black", fontWeight: "normal" }} >Jobs Feed</Title>
                        </Body>
                        <Right style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
                            {user && user.is_approved === "1" && <Button transparent style={{
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "column",
                                width: 80,
                            }}>
                                <Switch value={user.isActive}
                                    // iosBarStyle={{backgroundColor:"blue",}}
                                    style={{ transform: Platform.OS === "android" ? [{ scaleX: 1 }, { scaleY: 1 }] : [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                                    ios_backgroundColor="white"
                                    thumbColor={colors.freelancerButton}
                                    trackColor={{ false: "lightgrey", true: "lightgrey" }}
                                    onValueChange={(value) => this.setFreelancerStatus(value)} />
                                <Text style={{ fontSize: 12, textAlign: "center", width:"100%" }}>{user?.isActive ? "Active" : "In Active"}</Text>
                            </Button>}
                            {/* {user.isActive && user && user.is_approved === "1" && <Button transparent >
                                <Image source={bell} style={{ width: 20, height: 25 }} />
                            </Button>} */}
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
                    {this.props.jobs && !this.props.jobs.jobs && user.isActive && user && user.is_approved === "1" && <View style={{ height: "60%", }}>
                        <NotFound from={"notifications"} /></View>}
                    {!user.isActive && <InActive />}
                    {user.isActive && user && user.is_approved === "1" && <FreelancerFooter
                        navigation={this.props.navigation}
                    />}
                </Container>
            </Drawer>

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
    setFreelancerStatus: data => dispatch(setFreelancerStatusMiddleware(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Notification);