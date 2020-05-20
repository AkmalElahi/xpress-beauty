import React, { Component } from 'react';
import { Content, ListItem, Text, View, Icon, Switch } from 'native-base';
import { StyleSheet, Image, FlatList } from 'react-native';
import moment from 'moment';
// import { CustomButton } from '../buttons/Buttons'
import user from '../../assets/user.png'
import { AirbnbRating, Rating } from 'react-native-ratings';
import { colors } from '../../configs/colors';
// import { colors } from '../../configs/colors'
// import { connect } from 'react-redux';
// import { removeServiceFromCart } from '../../redux/cart/cart.actions';

const Details = ({ details, type }) => {
    // console.log("SUMMARY", total, totalDuration, cart)
    console.log("DETAILS IN COMPOMENT", details && details.job_status)
    const total = details && details.services.reduce((accumulatedValue, detailsItem) => accumulatedValue + parseInt(detailsItem.price), 0)
    const totalDuration = details && details.services.reduce((accumulatedValue, detailsItem) => accumulatedValue + parseInt(detailsItem.duration), 0)
    return (
        <Content showsVerticalScrollIndicator={false} contentContainerStyle={{ marginTop: "3%", justifyContent: "space-between", paddingBottom: 10 }}>
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
                <Text>{details && moment(details.appointment_datetime).format('LLL')}</Text>
            </View>
            <View style={styles.divider}>
                <Text style={styles.heading}>Time</Text>
                <Text>{totalDuration} min, from {details && moment(details.appointment_datetime).format('hh:mm a')}</Text>
            </View>
            <View style={styles.divider}>
                <Text style={styles.heading}>Address</Text>
                <Text >{details && `${details.house ? details.house+", " : ""}${details.building}, ${details.street} ${details.area}, ${details.city}`}</Text>

            </View>
            {/* <View style={styles.divider}>
                <Text style={styles.heading}>Name</Text>
                <Text>Public Order</Text>
            </View> */}
            <View style={{ ...styles.divider, marginBottom: "5%" }}>
                <Text style={styles.heading}>Payment Method</Text>
                <Text>{details && details.payment_method}</Text>
            </View>
            {type === "freelancer" && details && details.job_status === "301" && <View style={styles.divider}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Meet your Expert!</Text>
                    <Image source={user} style={{ width: 40, height: 40 }} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold" }}>{details.freelancer[0].username}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", paddingRight: 10 }}>Rating:</Text>
                    <AirbnbRating
                        showRating={false}
                        isDisabled={true}
                        defaultRating={details.freelancer[0].rating}
                        starStyle={{ width: 18, height: 18 }}
                    // starContainerStyle={{width: "70%" }}
                    />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", paddingRight: 10 }}>Experience:</Text>
                    <Text >{details.freelancer[0].experience} years</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", paddingRight: 10 }}>Jobs:</Text>
                    <Text >{details.freelancer[0].jobs}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", paddingRight: 10 }}>Time:</Text>
                    <Text >{moment(details.appointment_datetime).format('hh:mm a')}</Text>
                </View>
            </View>}
            {type === "freelancer" && details && (details.job_status === "500" || details.job_status === "401" ) && <View style={styles.divider}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Beautician</Text>
                    <Image source={user} style={{ width: 40, height: 40 }} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold" }}>{details.freelancer[0].username}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", paddingRight: 10 }}>Rating:</Text>
                    <AirbnbRating
                        showRating={false}
                        isDisabled={true}
                        defaultRating={details.freelancer[0].rating}
                        starStyle={{ width: 18, height: 18 }}
                    // starContainerStyle={{width: "70%" }}
                    />
                </View>
            </View>}
            {type === "customer" && details && details.job_status === "301" && <View style={styles.divider}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Meet your Customer!</Text>
                    <Image source={user} style={{ width: 40, height: 40 }} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold" }}>{details.customer[0].username}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", paddingRight: 10 }}>Rating:</Text>
                    <AirbnbRating
                        showRating={false}
                        isDisabled={true}
                        defaultRating={details.customer[0].rating}
                        starStyle={{ width: 18, height: 18, color:colors.primaryBtn }}
                    // starContainerStyle={{width: "70%" }}
                    />
                </View>
                {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", paddingRight: 10 }}>Experience:</Text>
                    <Text >{details.customer[0].experience} years</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", paddingRight: 10 }}>Jobs:</Text>
                    <Text >{details.customer[0].jobs}</Text>
                </View> */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", paddingRight: 10 }}>Time:</Text>
                    <Text >{moment(details.appointment_datetime).format('hh:mm a')}</Text>
                </View>
            </View>}
            {type === "customer" && details && (details.job_status === "500" || details.job_status === "401" ) && <View style={styles.divider}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Customer</Text>
                    <Image source={user} style={{ width: 40, height: 40 }} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold" }}>{details.customer[0].username}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", paddingRight: 10 }}>Rating:</Text>
                    <AirbnbRating
                        showRating={false}
                        isDisabled={true}
                        defaultRating={details.customer[0].rating}
                        starStyle={{ width: 18, height: 18 }}
                    // starContainerStyle={{width: "70%" }}
                    />
                </View>
            </View>}
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