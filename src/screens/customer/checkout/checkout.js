import React, { Component } from 'react';
import { Container, Content, Text, ListItem, CheckBox, Body, View, List, Toast } from 'native-base';
import moment from 'moment';
import { StyleSheet, Image, Platform } from 'react-native'
import CustomHeader from '../../../components/header/customHeader';
import { colors } from '../../../configs/colors';
import { CustomButton } from '../../../components/buttons/Buttons';
import CustomFooter from '../../../components/footer/customfooter';
import checked from '../../../assets/checked.png'
import unchecked from '../../../assets/unchecked.png'
import Review from '../../../components/review/Review';
import Time from '../../../components/review/Time';
import Address from '../../../components/review/Address';
import Summary from '../../../components/review/Summary';
import { connect } from 'react-redux';
import { cartMiddleWare } from '../../../redux/cart/cart.middleware';


class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            date: null,
            time: null,
            header: "Services",
            payment_method: "COS",
            beautician_id: 0,
            job_status: 101,
            isSelect:false
        }
    }
    goBack = () => {
        const { count } = this.state
        console.log("GO BACK", count)
        if(count === 1) {
            this.props.navigation.goBack()
        }
        if (count > 1) {
            this.setState((ps) => {
                console.log(count)
                return { count: --ps.count }
            })

        }
    }
    continue = () => {
        const { count } = this.state
        console.log("Count", count)
        if (count === 1 && this.props.cart) {
            if (count <= 3) {
                this.setState((ps) => {
                    console.log(count)
                    return { count: ++ps.count, header: "Time" }
                })

            }
        }
        else if (count === 2 && this.state.date && this.state.time) {
            if (count <= 3) {
                this.setState((ps) => {
                    console.log(count)
                    return { count: ++ps.count, header: "Address" }
                })

            }
        }
        else if (count === 3 && this.props.navigation.getParam("address")) {
            if (count <= 3) {
                this.setState((ps) => {
                    console.log(count)
                    return { count: ++ps.count, header: "Order Summary" }
                })

            }
        }
        if (count === 4) {
            const { appointmentDate, payment_method, job_status, beautician_id } = this.state
            const { navigation, cart, user } = this.props
            console.log("FROM SUMMARY")
            const order = {
                address: navigation.getParam("address"),
                services: cart.services.map(service => ({ service_id: service.id, quantity: service.quantity })),
                job_status,
                appointment_datetime: appointmentDate,
                alt_appointment_datetime: appointmentDate,
                payment_method,
                beautician_id:navigation.getParam("beautician")? navigation.getParam("beautician").appuid :0,
                user
            }
            console.log("ORDER", order)
            this.props.checkoutOrder(order)
        }
    }
    // componentDidUpdate(prevProps) {
    //     console.log("ADDRESS IN CHECKOUT", this.props.navigation.getParam("address"))
    //     const address = this.props.navigation.getParam("address")
    //     if(prevProps.address !== address){
    //         this.setState({
    //             address
    //         })
    //     }
    // }
    onDateTimeChange = (event, selectedDate) => {
        console.log("DATE", selectedDate)
        const date = moment(selectedDate).format('llll')
        const time = moment(selectedDate).format('LT')
        const appointmentDate = moment(selectedDate).format("YYYY-MM-DD HH.mm")
        console.log("INSIDE CHENCKOUT DATE CHANGE", appointmentDate)
        if (Platform.OS === 'ios') {
            this.setState({
                selectedDate,
                appointmentDate,
                date,
                // mode: 'time',
                time
            })
        }
        else {
            if (this.state.mode === "time") {
                this.setState({
                    show: false,
                    selectedDate,
                    appointmentDate,
                    date,
                    time,
                    mode: "date"
                })
            }
            else {
                this.setState({
                    appointmentDate,
                    date,
                    mode: 'time',
                    time,
                    selectedDate
                })
            }
        }

    }
    componentDidUpdate(prevProps) {
        if (this.props.cart !== prevProps.cart) {
            if(this.props.cart.message === "checkout done successfully")
            this.props.navigation.navigate("Services")
            Toast.show({
                text: "Booking has done successfully",
                textStyle: { textAlign: "center" },
                style: { width: "90%", alignSelf: "center", borderRadius: 10 },
                position: "bottom",
                type: 'success',
                duration: 3000
            })  
        }
    }
    render() {
        const { count, date, show, selectedDate, mode, isSelect } = this.state
        console.log("ADDRESS IN CHECKOUT", this.props.navigation.getParam("address"))
        return (
            <Container style={styles.container}>
                <CustomHeader androidStatusBarColor={colors.greybg}
                    leftButton={this.goBack}
                    iosBarStyle="light-content"
                    icon={"arrow-back"}
                    header={this.state.header} />
                <List style={styles.list}>
                    <ListItem style={styles.listItem} >
                        <Image source={checked} />
                        <Text style={styles.listText}>REVIEW</Text>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                        <Image source={count >= 2 ? checked : unchecked} />
                        <Text style={styles.listText}>TIME</Text>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                        <Image source={count >= 3 ? checked : unchecked} />
                        <Text style={styles.listText}>ADDRESS</Text>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                        <Image source={count >= 4 ? checked : unchecked} />
                        <Text style={styles.listText}>SUMMARY</Text>
                    </ListItem>
                </List>
                {count === 1 && <Review navigation={this.props.navigation} />}
                {count === 2 && <Time navigation={this.props.navigation}
                    date={date}
                    mode={mode}
                    show={show}
                    selectedDate={selectedDate}
                    setShow={() => this.setState((ps) => ({ show: !ps.show, mode: "date" }))}
                    setMode={() => this.setState({ mode: "time" })}
                    onChange={this.onDateTimeChange} />}
                {count === 3 && <Address navigation={this.props.navigation}
                    enableSelect={(value) =>this.setState({isSelect:value})}
                    isSelect={isSelect}
                    address={this.props.navigation.getParam("address")}
                    beautician={this.props.navigation.getParam("beautician")} />}
                {count === 4 && <Summary navigation={this.props.navigation}
                    cart={this.props.cart}
                    total={this.props.total}
                    totalDuration={this.props.totalDuration}
                    address={this.props.navigation.getParam("address")}
                    date={this.state.date}
                    time={this.state.time}

                />}


                <CustomButton
                    value="Continue" backgroundColor={colors.primaryBtn} height={60} color="white" fontSize={25} onPress={this.continue} />
                <CustomFooter navigation={this.props.navigation} isActive = 'checkout'/>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: "3%",
        paddingBottom: 0,
        marginBottom: 0,
        backgroundColor: "white"
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 0
    },
    list: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "95%",
        alignSelf: "center",
    },
    listText: {
        fontSize: 10,
        width: 60,
        paddingLeft: 2
        // textAlign:"right",
    }
})
const mapStateToProps = ({ cart, user }) => ({
    user: user,
    cart: cart,
    total: cart.services.reduce((accumulatedValue, cartItem) => accumulatedValue + parseInt(cartItem.price), 0),
    totalDuration: cart.services.reduce((accumulatedValue, cartItem) => accumulatedValue + parseInt(cartItem.duration), 0)

})
const mapDisptchToProps = dispatch => ({
    checkoutOrder: data => dispatch(cartMiddleWare(data))
})
export default connect(mapStateToProps, mapDisptchToProps)(Checkout)
