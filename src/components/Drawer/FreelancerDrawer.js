import React, { Component } from 'react';
import { Content, View, Thumbnail, Icon, } from 'native-base';
import { StyleSheet, Image, Text, Dimensions, TouchableOpacity, Platform } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { colors } from '../../configs/colors';
import profile from '../../assets/promotion1.png'
import avatar from '../../assets/user.png'
import notification from '../../assets/notification.png'
import loader from '../../assets/loader.gif'
import { connect } from 'react-redux';
import { logout } from '../../redux/user/user.actions';
import { uploadProfileImageMiddleWare } from '../../redux/user/user.middlewares';
import LogoutModal from '../Modal/LogoutModal';
import { version } from '../../configs/appversion';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const radius = width * 0.5


class FreelancerDrawer extends Component {

    // closeDrawer = () => {
    //   this.drawer._root.close()
    // }
    // openDrawer = () => {
    //   this.drawer._root.open()
    // };
    logout = () => {
        this.props.logout()
        this.props.navigation.navigate("UserLoading")
    }
    state = {
        photo: null,
        modalVisible: false,
    }
    handleChoosePhoto = () => {
        const { user } = this.props
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                console.log("IMAGE", response)
                this.setState({ photo: response }, () => {
                    this.props.uploadProfileImage({ appuid: user.appuid, token: user.token, image: this.state.photo })
                });
            }
        });
    };
    render() {
        const { user } = this.props
        const { photo, modalVisible } = this.state
        return (
            <Content style={styles.content}>
                <TouchableOpacity style={styles.imageViewer}
                    onPress={this.handleChoosePhoto}
                >
                    {!user.isloading && <Thumbnail source={user.profile_image ? { uri: user.profile_image } : avatar} style={styles.image} />}

                    {user.isloading && <Thumbnail source={loader} style={{ ...styles.image, backgroundColor: "white" }} />}

                    <Text style={styles.username}>{user?.username}</Text>
                </TouchableOpacity>
                <View style={styles.mainContent}>
                    <TouchableOpacity style={styles.option} onPress={() => {
                        this.props.navigation.navigate("FreelancerBookings")
                        this.props.close()
                    }} >
                        <Icon name="calendar" style={styles.optionImage} />
                        <Text style={styles.optionText}>Bookings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => {
                        this.props.navigation.navigate("Gallery")
                        this.props.close()
                    }}>
                        <Icon name="ios-image" style={styles.optionImage} />
                        <Text style={styles.optionText}>Gallery</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.option}>
            <Icon name="ios-chatboxes" style={styles.optionImage} />
            <Text style={styles.optionText}>Chats</Text>
          </TouchableOpacity> */}
                    <TouchableOpacity style={styles.option} onPress={() => {
                        this.props.navigation.navigate("EditProfile")
                        this.props.close()
                    }}>
                        <Icon name='md-settings' style={styles.optionImage} />
                        <Text style={styles.optionText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        <Icon name="md-help" style={styles.optionImage} />
                        <Text style={styles.optionText}>Help</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => this.setState({ modalVisible: true })}>
                        <Icon name="log-out" style={styles.optionImage} />
                        <Text style={styles.optionText}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <LogoutModal
                    logout={this.logout}
                    onclose={() => this.setState({ modalVisible: false })}
                    modalVisible={modalVisible}
                />
                <View style={styles.version}>
                    <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>{version.latest}</Text>
                </View>
            </Content>
        );
    }
}
const styles = StyleSheet.create({
    content: {
        backgroundColor: colors.freelancerButton,
        // marginTop:"5%",
        marginBottom: 0,
        flexDirection: "column",
        paddingBottom: 0
    },
    imageViewer: {
        height: height * 0.2,
        marginTop: "15%",
        width: "90%",
        alignSelf: "center",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: width * 0.2,
        width: width * 0.2,
        borderRadius: radius
    },
    username: {
        // paddingLeft: "10%",
        marginTop: "5%",
        fontSize: 20,
        color: "white",
        textAlign: "center"
    },
    mainContent: {
        marginTop: "10%",
        justifyContent: "space-between",
        width: "90%",
        alignSelf: "center",
        // height: height*0.6,
        // backgroundColor:"blue"
    },
    option: {
        flexDirection: "row",
        width: "100%",
        paddingVertical: Platform.OS === 'android' ? "5%" : '2%',
        // marginVertical:"5%",
        // backgroundColor:"green",
        alignItems: "center",
        alignSelf: "center",
    },
    optionText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        paddingLeft: "5%"
    },
    optionImage: {
        textAlign: "center",
        width: 40,
        // height: 20,
        // backgroundColor:'blue',
        color: "white"
    },
    version: {
        // backgroundColor:"blue",
        marginTop: 200,
        justifyContent: "center",
        height: 40,
        alignItems: "center"
    }
})
const mapStateToProps = ({ user }) => ({ user })
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    uploadProfileImage: (data) => dispatch(uploadProfileImageMiddleWare(data))

})
export default connect(mapStateToProps, mapDispatchToProps)(FreelancerDrawer)