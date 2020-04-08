import React, { Component } from 'react';
import { StyleSheet, View, Text , TouchableOpacity, FlatList, Image} from 'react-native'
import checked from '../../../assets/checked.png'
import unchecked from '../../../assets/unchecked.png'
import { Content } from 'native-base';
import { connect } from 'react-redux';
import { skillsMiddleware } from '../../../redux/skills/skills.middleware'
import { toolsMiddleware } from '../../../redux/tools/tools.middleware';
import { CustomButton } from '../../../components/buttons/Buttons';
import { colors } from '../../../configs/colors';


class EditExpertise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills:[],
            tools:[],
            training:"yes"
        }
    }
    componentDidMount() {
        const { user } = this.props
        console.log("USER IN EXPERTISE", user)
        this.props.getSkills({ token:user.token, appuid:user.appuid})
        this.props.getTools({ token:user.token, appuid:user.appuid })
        // console.log("USEER FROM PARAMS", this.props.navigation.getParam("user"))
        // const user = this.props.navigation.getParam("user")
        this.setState({
            user,
            skills:user.freelancerSkills,
            tools:user.freelancerTools,
            training:user.training
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
    render() {
        const { skills, tools, file, uploading, training } = this.state

        return (
            <Content contentContainerStyle={{width:"85%", alignSelf:"center", height:"100%"}}>
                <View style={styles.skillsView}>
                    <Text style={{  marginVertical: "5%", fontWeight: "bold", fontSize: 16 }}>Select The Skills You have</Text>
                    <FlatList
                        style={{ marginBottom: "5%" }}
                        data={this.props.skills.skills}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={styles.skills} onPress={() => this.addSkill(item.id)} >
                                <Image source={skills.includes(item.id) ? checked : unchecked} style={styles.radio} />
                                <Text style={{  paddingLeft: 10, fontSize: 16, fontWeight: "bold" }}>{item.skill}</Text>
                            </TouchableOpacity>
                        )
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
                <View style={styles.toolsView}>
                    <Text style={{  marginVertical: "5%", fontWeight: "bold", fontSize: 16 }}>Tools</Text>
                    <FlatList
                        style={{ marginBottom: "5%" }}
                        data={this.props.tools.tools}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={styles.skills} onPress={() => this.addTools(item.id)} >
                                <Image source={tools.includes(item.id) ? checked : unchecked} style={styles.radio} />
                                <Text style={{  paddingLeft: 10, fontSize: 16, fontWeight: "bold" }}>{item.tool}</Text>
                            </TouchableOpacity>
                        )
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
                {/* <View style={styles.certificateView}>
                    <Text style={{  marginVertical: "5%", fontWeight: "bold", fontSize: 16 }}>Do you have any
                            Certification or Training?</Text>
                    <TouchableOpacity style={styles.skills} onPress={(() => this.setState({ training: "yes" }))}>
                        <Image source={training === 'yes' ? checked : unchecked} style={styles.radio} />
                        <Text style={{  paddingLeft: 10, fontSize: 16, fontWeight: "bold" }}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.skills} onPress={(() => this.setState({ training: "no" }))}>
                        <Image source={training === 'no' ? checked : unchecked} style={styles.radio} />
                        <Text style={{  paddingLeft: 10, fontSize: 16, fontWeight: "bold" }}>No</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity style={styles.upload} onPress={this.uploadFile}>
                            {uploading ? <Loader />
                                : <Text style={{  textAlign: "center", fontWeight: "bold" }}>Upload a file</Text>}
                        </TouchableOpacity>
                        {file && <Text style={{  textAlign: "center", padding: "5%", paddingTop: "10%" }}>{file.name}</Text>}
                    </View>
                </View> */}
                <CustomButton
                    backgroundColor={colors.freelancerButton}
                    color={"white"}
                    value="Save"
                    height={50}
                />
            </Content>);
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
        marginBottom:5,
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
export default connect(mapStateToProps, mapDisPatchToProps)(EditExpertise);