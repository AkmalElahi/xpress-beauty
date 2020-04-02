import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, FlatList, Platform } from 'react-native'
import { Container, Content, Header, Body, Left, Button, Icon, H2, H3 } from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import { getUniqueId, getModel, getDeviceId } from 'react-native-device-info'
import bg from '../../../assets/registerbg.png';
import profile from '../../../assets/profile.png';
import checked from '../../../assets/checked.png'
import unchecked from '../../../assets/unchecked.png'
import { colors } from '../../../configs/colors';
import { connect } from 'react-redux';
import { skillsMiddleware } from '../../../redux/skills/skills.middleware';
import { toolsMiddleware } from '../../../redux/tools/tools.middleware';
import { RoundButton } from '../../../components/buttons/Buttons';
import { userMiddleWare } from '../../../redux/user/user.middlewares';
import Loader from '../../../components/loader/Loader';
import { setFreelancerProfile } from '../../../redux/user/user.actions';
const skillsArr = [{ id: 1, title: "abcd" }, { id: 2, title: "def" }, { id: 1, title: "abcd" }, { id: 2, title: "def" }, { id: 1, title: "abcd" }, { id: 2, title: "def" }]
class SkillsAndTools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            tools: [],
            userProps: '',
            uploading: false,
            training: "yes"
        }
    }
    componentDidMount() {
        const device_id = getUniqueId()
        const model = getModel()
        const os = Platform.Version
        const platform = Platform.OS
        const device = getDeviceId()
        this.setState({
            device_id,
            model,
            os,
            platform,
            device
        })
        // getDevice().then(d => {
        //     this.setState({
        //         device_id,
        //         model,
        //         os,
        //         platform,
        //         device:d
        //     })
        // })
        const { user: { token, appuid } } = this.props
        this.props.getSkills({ token, appuid })
        this.props.getTools({ token, appuid })
        console.log("USEER FROM PARAMS", this.props.navigation.getParam("user"))
        const user = this.props.navigation.getParam("user")
        this.setState({
            user
        })
    }
    addSkill = (id) => {
        const { skills } = this.state
        const isExist = skills.find(item => item === id)
        if (!isExist) {
            const newSkills = [id, ...skills]
            this.setState({ skills: newSkills })
        }
        else {
            const newSkills = skills.filter(item => item !== id)
            this.setState({ skills: newSkills })
        }
    }
    addTools = (id) => {
        const { tools } = this.state
        const isExist = tools.find(item => item === id)
        if (!isExist) {
            const newTools = [id, ...tools]
            this.setState({ tools: newTools })
        }
        else {
            const newTools = tools.filter(item => item !== id)
            this.setState({ tools: newTools })
        }
    }
    uploadFile = async () => {
        try {
            this.setState({
                uploading: true
            })
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images || DocumentPicker.types.pdf],
            });
            // console.log(
            //   res.uri,
            //   res.type, // mime type
            //   res.name,
            //   res.size
            // );
            console.log(res)
            this.setState({
                file: res,
                uploading: false
            })
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
                console.log("ERROR IN PICKER", err)
                this.setState({
                    uploading: false
                })
            } else {
                // throw err;
                this.setState({
                    uploading: false
                })
            }
        }
    }
    submit = () => {
        console.log("STATE IN SUBMIT", this.state)
        const { skills, tools, file, user, device_id, model, os, platform, training } = this.state
        if (skills.length && tools.length && file && user) {
            this.props.createProfile({ skills, tools, file, training, device_id, model, os, platform, user })
        }
    }
    componentDidUpdate(prevProps) {
        const { user } = this.props
        if (user !== prevProps.user) {
            console.log("USER IN DID UPDATE", user)
            if (user.message === "user profile created successfully") {
                this.props.setProfile({
                    username: this.state.user.username,
                    email: this.state.user.email,
                    dob: this.state.user.dob,
                    building: this.state.user.building,
                    street: this.state.user.street,
                    area: this.state.user.area,
                    city: this.state.user.city,
                    house: this.state.user.house,
                })
                this.props.navigation.navigate("FreelancerNotification")
                // this.setState({
                //     modalVisible: true,
                // })
                // setTimeout(() => {
                //     this.setState({
                //         modalVisible: false
                //     }),
                //         this.props.navigation.navigate("Services")
                // }, 3000)
            }
        }
    }
    render() {
        const { skills, tools, file, uploading, training } = this.state
        console.log("SKILLS", skills)
        return (
            <Container>
                <ImageBackground source={bg} style={{ width: '100%', height: '100%', }}>
                    <Header style={styles.header} androidStatusBarColor={colors.primaryBtn} iosBarStyle="light-content">
                        <Left >
                            <Button transparent>
                                <Icon name='arrow-back' style={{ color: "white" }} onPress={() => this.props.navigation.goBack()} />
                            </Button>
                        </Left>
                        <Body />
                    </Header>
                    <Content contentContainerStyle={{ width: "80%", alignSelf: "center", justifyContent: 'flex-start' }}>
                        <View style={styles.skillsView}>
                            <Text style={{ color: "white", marginVertical: "5%", fontWeight: "bold", fontSize: 16 }}>Select The Skills You have</Text>
                            <FlatList
                                style={{ marginBottom: "5%" }}
                                data={this.props.skills.skills}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity style={styles.skills} onPress={() => this.addSkill(item.id)} >
                                        <Image source={skills.includes(item.id) ? checked : unchecked} style={styles.radio} />
                                        <Text style={{ color: "white", paddingLeft: 10, fontSize: 16, fontWeight: "bold" }}>{item.skill}</Text>
                                    </TouchableOpacity>
                                )
                                }
                                keyExtractor={item => item.id}
                            />
                        </View>
                        <View style={styles.toolsView}>
                            <Text style={{ color: "white", marginVertical: "5%", fontWeight: "bold", fontSize: 16 }}>Tools</Text>
                            <FlatList
                                style={{ marginBottom: "5%" }}
                                data={this.props.tools.tools}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity style={styles.skills} onPress={() => this.addTools(item.id)} >
                                        <Image source={tools.includes(item.id) ? checked : unchecked} style={styles.radio} />
                                        <Text style={{ color: "white", paddingLeft: 10, fontSize: 16, fontWeight: "bold" }}>{item.tool}</Text>
                                    </TouchableOpacity>
                                )
                                }
                                keyExtractor={item => item.id}
                            />
                        </View>
                        <View style={styles.certificateView}>
                            <Text style={{ color: "white", marginVertical: "5%", fontWeight: "bold", fontSize: 16 }}>Do you have any
                            Certification or Training?</Text>
                            <TouchableOpacity style={styles.skills} onPress={(() => this.setState({ training: "yes" }))}>
                                <Image source={training === 'yes' ? checked : unchecked} style={styles.radio} />
                                <Text style={{ color: "white", paddingLeft: 10, fontSize: 16, fontWeight: "bold" }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.skills} onPress={(() => this.setState({ training: "no" }))}>
                                <Image source={training === 'no' ? checked : unchecked} style={styles.radio} />
                                <Text style={{ color: "white", paddingLeft: 10, fontSize: 16, fontWeight: "bold" }}>No</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity style={styles.upload} onPress={this.uploadFile}>
                                    {uploading ? <Loader />
                                        : <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Upload a file</Text>}
                                </TouchableOpacity>
                                {file && <Text style={{ color: "white", textAlign: "center", padding: "5%", paddingTop: "10%" }}>{file.name}</Text>}
                            </View>
                        </View>
                        <View style={{ marginTop: "5%" }}>
                            {this.props.user.isloading ? <Loader />
                                : <RoundButton height={50} backgroundColor={colors.primaryBtn}
                                    value="Submit" color="white" onPress={this.submit} />}
                        </View>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        marginTop: "3%",
        backgroundColor: "transparent",
        elevation: 0,
        borderBottomWidth: 0
    },
    skillsView: {
        // marginBottom: "5%",
        // height: "35%",
        flex: 2
        // backgroundColor: "blue"
    },
    toolsView: {
        marginTop: 5,
        flex: 2
        // height: "35%",
        // backgroundColor: "blue"
    },
    certificateView: {
        marginTop: 5,
        flex: 1
        // height: "40%",
        // backgroundColor: "blue"
    },
    skills: {
        flexDirection: "row",
        marginVertical: "1%",
        alignItems: "center"
    },
    radio: {
        width: 22,
        height: 22
    },
    upload: {
        borderWidth: 1,
        marginTop: 20,
        width: "50%",
        padding: 5,
        borderColor: 'white',
        // flexDirection:'row'
    }
})
const mapStateToProps = ({ user, skills, tools }) => ({ user, skills, tools })
const mapDisPatchToProps = (dispatch) => ({
    getSkills: data => dispatch(skillsMiddleware(data)),
    getTools: data => dispatch(toolsMiddleware(data)),
    createProfile: data => dispatch(userMiddleWare(data)),
    setProfile: data => dispatch(setFreelancerProfile(data))
})
export default connect(mapStateToProps, mapDisPatchToProps)(SkillsAndTools);