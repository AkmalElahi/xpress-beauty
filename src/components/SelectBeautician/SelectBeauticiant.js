import React, { Component } from "react";
import { Container, Header, Content, Icon, Accordion, Text, View, Label, Button } from "native-base";
import { StyleSheet } from 'react-native'
import { connect } from "react-redux";
import { beauticianMiddleware } from "../../redux/beautician/beautician.middleware";
import { colors } from "../../configs/colors";
import CustomHeader from "../header/customHeader";
import { TextInput } from "react-native-gesture-handler";
const dataArray = [
    {
        title: "First Element", skills: [
            {
                id: "2",
                skill: "Facial"
            },
            {
                id: "1",
                skill: "Hair Cut"
            }
        ],
    },
    // { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    // { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];

class SelectBeautician extends Component {
    constructor(props) {
        super(props);

        // this.openSite = this.openSite.bind(this);
        // this.editSite = this.editSite.bind(this);
    }

    // I am assuming you have written your functions like this and not as arrow functions
    componentDidMount() {
        const { appuid, token } = this.props.user
        this.props.getBeauticians({ appuid, token })
    }
    selectBeautician = (item) => {
        // alert(item.appuid)
        console.log("ON PRESS", item)
        if (item) {
            this.props.navigation.navigate("Checkout", {
                beautician: item
            })
        }
    }

    editSite(key) {
    }

    _renderAccordionContent(item, selectBeautician) {
        return (
            <View style={{ backgroundColor: "white" }}>
                <View style={{ flexDirection: "row", }}>
                    <Label style={styles.label}>email:</Label>
                    <Text style={styles.text}>{item.email}</Text>
                </View>
                <View style={{ flexDirection: "row", }}>
                    <Label style={styles.label}>DOB:</Label>
                    <Text style={styles.text}>{item.date_of_birth}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Label style={styles.label}>address:</Label>
                    <Text style={styles.text}>{`${item.house} ${item.building} ${item.street} ${item.city}`}</Text>
                </View>
                <View style={{ width: "30%", alignSelf: "flex-end", marginRight: "5%" }}>
                    <Button onPress={() => selectBeautician(item)} style={{ backgroundColor: "transparent", justifyContent: "center" }}>
                        <Text style={{ color: "black", textAlign: "right", fontSize: 13 }}>Select</Text>
                        <Icon name='checkmark' style={{ fontSize: 30, color: colors.primaryBtn }} />
                    </Button>
                </View>
            </View>
        )
    }
    _renderHeader(item, expanded) {
        return (
            <View style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-between",
            }}>
                <View style={{
                    justifyContent: "space-between",
                }}>
                    <Text style={{ fontWeight: "600" }}>
                        {item.username}
                    </Text>
                    <View style={{
                        flexDirection: "row",
                    }}>
                        {item.skills.map((skill, index) => {
                            if (index < 2) {
                                return <Text
                                    style={{
                                        fontSize: 12,
                                        fontStyle: "italic",
                                    }}
                                >
                                    {`${skill.skill} ${index < item.skills.length - 1 ? '&' : ''}`}
                                </Text>
                            }
                        })}
                        <Text style={{
                            fontSize: 12,
                            fontStyle: "italic",
                        }}>Expert</Text>
                    </View>
                </View>
                {expanded
                    ? <Icon style={{ fontSize: 18 }} name="arrow-up" />
                    : <Icon style={{ fontSize: 18 }} name="arrow-down" />}
            </View>
        );
    }
    render() {
        // console.log("BEAUTICIANS", this.props)
        const { beauticians } = this.props
        return (
            <Container>
                <CustomHeader header="Select Beautician" />
                <Content padder style={{ backgroundColor: "white" }}>
                    <View style={{
                        // padding: "5%",
                        backgroundColor: "white",
                        borderWidth: 0.5,
                        borderColor: "lightgrey",
                        flexDirection: "row",
                        justifyContent:"space-between",
                        alignItems:"center"
                    }}>
                        <TextInput placeholder="Search Beautician" style={{padding:8, width:"80%"}} />
                        <Icon name="search" style={{color:"grey",padding:8}}/>
                    </View>
                    <Accordion
                        dataArray={beauticians}
                        animation={true}
                        expanded={true}
                        renderHeader={(item, expanded) => this._renderHeader(item, expanded)}
                        renderContent={(item) => this._renderAccordionContent(item, this.selectBeautician)}
                    />
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    label:{
        padding: 10,
        width:"25%"
    },
    text:{
        width:"75%",
        // textAlign:"left",
        padding:10,
        // paddingLeft:50,
        // alignSelf:"flex-end"
    }
})
const mapStateToProps = ({ user, beauticians: { beauticians } }) => ({ user, beauticians })

const mapDispatchToProps = dispatch => ({
    getBeauticians: data => dispatch(beauticianMiddleware(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(SelectBeautician)