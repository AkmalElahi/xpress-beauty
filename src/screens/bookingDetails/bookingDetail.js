import React, { Component } from 'react';
import { Content, ListItem, Text, View, Icon, Switch } from 'native-base';
import { StyleSheet, Image, FlatList } from 'react-native';
import moment from 'moment';
// import { CustomButton } from '../buttons/Buttons'
// import clock from '../../assets/clock.png'
// import { colors } from '../../configs/colors'
// import { connect } from 'react-redux';
// import { removeServiceFromCart } from '../../redux/cart/cart.actions';

const Details = ({ details }) => {
    // console.log("SUMMARY", total, totalDuration, cart)
    const total = details && details.services.reduce((accumulatedValue, detailsItem) => accumulatedValue + parseInt(detailsItem.price), 0)
    const totalDuration = details && details.services.reduce((accumulatedValue, detailsItem) => accumulatedValue + parseInt(detailsItem.duration), 0)
    return (
        <Content showsVerticalScrollIndicator={false} contentContainerStyle={{ marginTop: "3%", justifyContent: "space-between", }}>
            <View style={styles.divider}>
                <Text style={styles.heading}>Services</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ width: "100%" }}
                    data={details && details.services}
                    renderItem={({ item }) => (
                        <ListItem style={{ paddingLeft: 0, marginLeft: 0 }}>
                            <Text style={{ width: "70%", textAlign: "left", }}>{item.service}</Text>
                            <Text style={{ width: "30%", textAlign: "right" }}>Rs. {item.price}</Text>
                        </ListItem>
                    )}
                    keyExtractor={item => item.id}
                />
                <ListItem style={{ paddingLeft: 0, marginLeft: 0 }}>
                    <Text style={{ width: "70%", textAlign: "left", fontWeight: "bold" }}>Total</Text>
                    <Text style={{ width: "30%", textAlign: "right", fontWeight: "bold" }}>Rs. {total}</Text>
                </ListItem>
            </View>
            <View style={styles.divider}>
                <Text style={styles.heading}>Date</Text>
                <Text>date</Text>
            </View>
            <View style={styles.divider}>
                <Text style={styles.heading}>Time</Text>
                <Text>{totalDuration} min, from {details && moment(details.appointment_datetime).format('hh.mm')}</Text>
            </View>
            <View style={styles.divider}>
                <Text style={styles.heading}>Address</Text>
                <Text>{details && `${details.house ? details.house : ""} ${details.building}, ${details.street} ${details.area}, ${details.city}`}</Text>

            </View>
            {/* <View style={styles.divider}>
                <Text style={styles.heading}>Name</Text>
                <Text>Public Order</Text>
            </View> */}
            <View style={{ ...styles.divider, marginBottom: "5%" }}>
                <Text style={styles.heading}>Payment Method</Text>
                <Text>{details && details.payment_method}</Text>
            </View>
        </Content>
    )
}

const styles = StyleSheet.create({
    divider: {
        width: "90%",
        // height: 100,
        // marginTop: "5%",
        paddingBottom: "2%",
        alignSelf: "center",
        justifyContent: "center"
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        paddingBottom: 10
    }
})
export default Details