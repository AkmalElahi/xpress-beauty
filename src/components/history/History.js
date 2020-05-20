import React from 'react'
import { Container, Content, View, Text, Card, CardItem } from 'native-base';
import { Image, StyleSheet, FlatList } from 'react-native';
import moment from 'moment'
import { colors } from '../../configs/colors';
import NotFound from '../not found/NotFound';
import { AirbnbRating } from 'react-native-ratings';

const bookings = [{
    date: new Date(),
    payment_method: "COS",
    services: [{ price: 20, duration: 50, name: "hairCare" }, { price: 20, duration: 50, name: "Was" }, { price: 20, duration: 50, name: "hairCare" }]
},
{
    date: new Date(),
    payment_method: "COS",
    services: [{ price: 20, duration: 50, name: "hairCare" }, { price: 20, duration: 50, name: "Wax" }, { price: 20, duration: 50, name: "hairCare" }, { price: 20, duration: 50, name: "Wax" }]
}
]
const History = ({ bookings, navigation, refreshing, handleRefresh }) => {
    console.log("BOOKINGS IN SCHEDULE", bookings.length)
    return (
        <Container  >
            {bookings.length ? <FlatList
                data={bookings}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                renderItem={({ item }) => (
                    <Card style={{ width: "100%", padding: 2 }}>
                        <CardItem
                            button
                            onPress={() => navigation.navigate("BookingsDetails", {
                                job: item
                            })}
                            style={{
                                // justifyContent: "center",
                                // flexDirection: "column",
                                // width: "70%",
                                // `${item.job_status} === "201" ? 0.5 : 1`
                                paddingLeft: 0,
                                paddingTop: 0,
                                paddingBottom: 0,
                            }}>
                            {/* Date View */}
                            {/* <View style={{ backgroundColor: colors.cl2, padding: 6, width: "25%" }}>
                                    <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 20, color: "white" }}>{moment(item.appointment_datetime).format('DD')}</Text>
                                    <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 16, color: "white", }}>{moment(item.appointment_datetime).format('MMMM')}</Text>
                                    <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 15, color: "white" }}>{moment(item.appointment_datetime).format('dddd')}</Text>
                                </View> */}
                            {/* service and duration View */}
                            <View style={{ width: "80%", padding: 5, paddingLeft: 10 }}>
                                <View style={{
                                    flexDirection: "row",
                                    // width: "100%",
                                    flexWrap: 'wrap',
                                    flexGrow: 0,

                                }}>
                                    {
                                        item.services.length > 2 ? item.services.map((service, index) => {
                                            return index < 3 && (
                                                <Text style={{
                                                    fontSize: 12,
                                                    // width:"100%",
                                                    color: colors.greybg
                                                }}>{service.service}{index < 2 ? ', ' : '...'}</Text>)

                                        }) :
                                            item.services.map((service, index) => {
                                                return (
                                                    <Text style={{
                                                        fontSize: 15,
                                                        color: colors.greybg
                                                    }}>{service.service}{index < item.services.length - 1 && ', '}</Text>)

                                            })
                                    }
                                </View>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        textAlign: "left",
                                        color: colors.greybg
                                    }}>Price {item.services.reduce((price, service) => (price += parseInt(service.price)), 0)}</Text>
                                {item.job_status === "500" &&
                                    <View style={{width:"40%"}}>
                                        <AirbnbRating
                                            isDisabled={true}
                                            defaultRating={item.rating}
                                            showRating={false}
                                            starStyle={{ width: 15, height: 15}}

                                        />
                                    </View>}
                            </View>
                            {/* Price and payment method*/}
                            <View style={{ justifyContent: "flex-end", height: 50, width: "20%" }} >
                                {/* <Text style={{ color: colors.greybg, textAlign: "left" }}>{item.payment_method}</Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            textAlign: "left",
                                            color: colors.greybg
                                        }}>Price {item.services.reduce((price, service) => (price += parseInt(service.price)), 0)}</Text> */}
                                {item.job_status === '201' && <Text style={{
                                    fontSize: 12,
                                    textAlign: "left",
                                    color: colors.greybg
                                }}>Canceled</Text>}
                                {item.job_status === '202' && <Text style={{
                                    fontSize: 12,
                                    textAlign: "left",
                                    color: colors.greybg
                                }}>Rejected</Text>}
                                {item.job_status === '500' && <Text style={{
                                    fontSize: 12,
                                    textAlign: "left",
                                    color: colors.greybg
                                }}>Completed</Text>}
                            </View>
                        </CardItem>
                    </Card>
                )
                }
                keyExtractor={item => item.id}
            />
                : <NotFound from="history" />

            }
            {/* <Content scrollEnabled={true} showsVerticalScrollIndicator={false}>
            </Content> */}
        </Container>
    )
}
export default History