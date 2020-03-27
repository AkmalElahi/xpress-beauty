import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import { Container, Content, Header, Body, Left, Button, Icon, H2, H3 } from 'native-base';
import bg from '../../../assets/registerbg.png';
import profile from '../../../assets/profile.png';
import checked from '../../../assets/checked.png'
import unchecked from '../../../assets/unchecked.png'

import { colors } from '../../../configs/colors';
import { connect } from 'react-redux';
import { skillsMiddleware } from '../../../redux/skills/skills.middleware';
import { toolsMiddleware } from '../../../redux/tools/tools.middleware';
import { RoundButton } from '../../../components/buttons/Buttons';
const skillsArr = [{ id: 1, title: "abcd" }, { id: 2, title: "def" }, { id: 1, title: "abcd" }, { id: 2, title: "def" }, { id: 1, title: "abcd" }, { id: 2, title: "def" }]
class SkillsAndTools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: []
        }
    }
    componentDidMount() {
        const { user: { token, appuid } } = this.props
        this.props.getSkills({ token, appuid })
        this.props.getTools({ token, appuid })
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
    render() {
        const { skills } = this.state
        console.log("SKILLS", skills)
        return (
            <Container>
                <ImageBackground source={bg} style={{ width: '100%', height: '100%' }}>
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
                            <H3 style={{ color: "white", marginVertical: "5%", fontWeight: "bold" }}>Select The Skills You have</H3>
                            <FlatList
                                data={this.props.skills.skills}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity style={styles.skills} onPress={() => this.addSkill(item.id)} >
                                        <Image source={skills.includes(item.id) ? checked : unchecked} style={styles.radio} />
                                        <Text style={{ color: "white", paddingLeft: 10, fontSize: 16, fontWeight: "bold" }}>{item.skill}</Text>
                                    </TouchableOpacity>
                                )
                                }
                                keyExtractor={skill => skill.id}
                            />
                        </View>
                        <View style={styles.toolsView}>
                            <H3 style={{ color: "white", marginVertical: "5%", fontWeight: "bold" }}>Tools</H3>
                            <FlatList
                                data={this.props.tools.tools}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity style={styles.skills} onPress={() => this.addSkill(item.id)} >
                                        <Image source={skills.includes(item.id) ? checked : unchecked} style={styles.radio} />
                                        <Text style={{ color: "white", paddingLeft: 10, fontSize: 16, fontWeight: "bold" }}>{item.tool}</Text>
                                    </TouchableOpacity>
                                )
                                }
                                keyExtractor={skill => skill.id}
                            />
                        </View>
                        <View style={styles.certificateView}>
                            <Text style={{ color: "white", marginVertical: "5%", fontWeight: "bold", fontSize: 18 }}>Do you have any
                            Certification or Training?</Text>
                            <TouchableOpacity style={styles.skills}  >
                                <Image source={unchecked} style={styles.radio} />
                                <Text style={{ color: "white", paddingLeft: 10, fontSize: 16, fontWeight: "bold" }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.skills}  >
                                <Image source={unchecked} style={styles.radio} />
                                <Text style={{ color: "white", paddingLeft: 10, fontSize: 16, fontWeight: "bold" }}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.upload}>
                                <Text style={{color:"white", textAlign:"center", fontWeight:"bold"}}>Upload a file</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:"5%"}}>
                        {this.props.user.isloading? <Loader />
                                    : <RoundButton height={50} backgroundColor={colors.primaryBtn}
                                        value="Submit" color="white" onPress={this.continue} />}
                        </View>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
        elevation: 0,
        borderBottomWidth: 0
    },
    skillsView: {
        // marginBottom: "5%",
        height: "35%",
        // backgroundColor: "blue"
    },
    toolsView: {
        marginTop: 5,
        height: "35%",
        // backgroundColor: "blue"
    },
    certificateView: {
        marginTop: 5,
        // height: "40%",
        // backgroundColor: "blue"
    },
    skills: {
        flexDirection: "row",
        marginTop: "2%",
        alignItems: "center"
    },
    radio: {
        width: 22,
        height: 22
    },
    upload:{
        borderWidth:1,
        marginTop:20,
        width:"50%",
        padding:5,
        borderColor:'white'
    }
})
const mapStateToProps = ({ user, skills, tools }) => ({ user, skills, tools })
const mapDisPatchToProps = (dispatch) => ({
    getSkills: data => dispatch(skillsMiddleware(data)),
    getTools: data => dispatch(toolsMiddleware(data))
})
export default connect(mapStateToProps, mapDisPatchToProps)(SkillsAndTools);