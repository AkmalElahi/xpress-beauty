import React, { Component } from 'react';
import { Content, ListItem, Text, View, Icon, Input } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { StyleSheet, Image, } from 'react-native';
import { CustomButton } from '../buttons/Buttons'
import clock from '../../assets/clock.png'
import { colors } from '../../configs/colors'
import { connect } from 'react-redux';
import { removeServiceFromCart } from '../../redux/cart/cart.actions';

class Time extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            date: "",
            mode: 'date'
        }
    }
    onChange = (event, selectedDate) => {
        console.log("DATE", selectedDate, event.memoizedProps)
        const date = moment(selectedDate).format('llll')
        const time = moment(selectedDate).format('HH.mm')
        if (this.state.mode === "time") {
            this.setState({
                show: false,
                selectedDate,
                date,
                time,
                mode:"date"
            })
        }
        else{
            this.setState({
                selectedDate,
                date,
                mode: 'time',
                time
            })
        }

    }
    render() {
        const { show, date, mode, time, selectedDate } = this.state
        return <Content contentContainerStyle={{ marginTop: "5%" }} scrollEnabled={false}>
            <View style={{ height: 400, justifyContent: "flex-start", alignSelf: "center", width: "90%" }}>
                <View style={styles.head}>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>Choose Appointment</Text>
                    <Text style={{ fontSize: 18 }}>from 9:00 to 19:00 hours</Text>
                </View>
                <View style={styles.appointment}>
                    <View style={styles.input}>
                        <Text  >{date ? `${date}` : "Add Appintment Time"}  </Text>
                        <Icon onPress={() => this.setState({ show: true })} name="calendar" style={{ position: 'absolute', bottom: "1%", right: "1%", color: colors.primaryBtn }} />
                    </View>
                    {/* <View style={styles.input}>
                        <Text >Add Alternative Time (optional)</Text>
                    </View> */}
                </View>
                {show && <DateTimePicker
                    testID="dateTimePicker"
                    // timeZoneOffsetInMinutes={0}
                    minimumDate={new Date()}
                    value={selectedDate ? selectedDate : new Date()}
                    mode={mode}
                    is24Hour={false}
                    display="default"
                    onChange={this.onChange}
                />}
            </View>
        </Content>
    }
}
const styles = StyleSheet.create({
    head: {
        height: "20%",
        width: "80%",
        alignSelf: "center"
    },
    input: {
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        marginVertical: "5%",
        width: "85%",
        alignSelf: "center"
    },
    appointment: {
        // backgroundColor:"green",
        marginTop: "5%",
        height: "40%",
        justifyContent: 'center'

    }
})
const mapStateToProps = ({ cart }) => ({
    cart: cart,
    total: cart.services.reduce((accumulatedValue, cartItem) => accumulatedValue + parseInt(cartItem.price), 0),
    totalDuration: cart.services.reduce((accumulatedValue, cartItem) => accumulatedValue + parseInt(cartItem.duration), 0)

})
const mapDispatchToProps = dispatch => ({
    deleteItemFromCart: data => dispatch(removeServiceFromCart(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Time);