import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import { Container, Content, Header, Left, Right, Body, Title, Button, Icon, Item, Footer } from 'native-base'
import bell from '../../../assets/bell.png'
import user from '../../../assets/user.png'
import services from '../../../assets/services.png'
import payment from '../../../assets/payment.png'
import date from '../../../assets/date.png'
import distance from '../../../assets/distance.png'
import { CustomButton } from '../../../components/buttons/Buttons';
import { colors } from '../../../configs/colors';
import FreelancerFooter from '../../../components/footer/freelancerFooter';

class JobDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            job: {}
        }
    }
    componentDidMount() {
        this.setState({
            job: this.props.navigation.getParam("job")
        })
    }

    render() {
        const { job } = this.state
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
                        <Button transparent onPress={() => alert("BELL")}>
                            <Image source={bell} style={{ width: 20, height: 25 }} />
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={{ width: "80%", alignSelf: "center", }}>
                    <View style={{ flexDirection: "row", padding: 5, alignItems: "center" }}>
                        <Image source={user} style={{ width: 40, height: 40 }} />
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
                            <Text style={{...styles.headingText, paddingLeft:18}}>Address</Text>
                        </View>
                        <Text style={styles.padder}>{job.address}</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.heading}>
                            <Image source={distance} style={{ width: 18, height: 25 }} />
                            <Text style={{...styles.headingText, paddingLeft:18}}>Distance from your current location</Text>
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
                                backgroundColor={colors.freelancerButton}
                                value="Accept"
                                height={50}
                                color="white"
                            />
                        </View>
                        <View style={styles.button}>
                            <CustomButton
                                backgroundColor="lightgrey"
                                value="Reject"
                                height={50}
                                color={colors.freelancerButton}
                            />
                        </View>
                    </View>
                </View>
                <FreelancerFooter />
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
export default JobDetail