import React from 'react'
import { Container, Content, View, Text, Card, CardItem } from 'native-base';
import { Image, StyleSheet, FlatList } from 'react-native';
import moment from 'moment'
import { colors } from '../../configs/colors';
import NotFound from '../not found/NotFound';

const bookings = [{
    date: new Date(),
    payment_method:"COS",
    services: [{ price: 20, duration: 50, name: "hairCare" }, { price: 20, duration: 50, name: "Was" }, { price: 20, duration: 50, name: "hairCare" }]
},
{
    date: new Date(),
    payment_method:"COS",
    services: [{ price: 20, duration: 50, name: "hairCare" }, { price: 20, duration: 50, name: "Wax" }, { price: 20, duration: 50, name: "hairCare" }, { price: 20, duration: 50, name: "Wax" }]
}
]
const Sheduled = ({bookings}) =>  {
    console.log("BOOKINGS IN SCHEDULE",bookings.length)
    return (
        <Container >
            <Content scrollEnabled={true} showsVerticalScrollIndicator={false}>
                {bookings.length ? <FlatList
                    data={bookings}
                    renderItem={({ item }) => (
                        <Card style={{ width: "100%", padding: 2 }}>
                            <CardItem
                                style={{
                                    // justifyContent: "center",
                                    // flexDirection: "column",
                                    // width: "70%",
                                    paddingLeft:0,
                                    paddingTop:0,
                                    paddingBottom:0,
                                }}>
                                {/* Date View */}
                                <View style={{ backgroundColor: colors.cl2, padding: 6, width:110 }}>
                                    <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 20, color: "white" }}>{moment(item.appointment_datetime).format('DD')}</Text>
                                    <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 16, color: "white", }}>{moment(item.appointment_datetime).format('MMMM')}</Text>
                                    <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 15, color: "white" }}>{moment(item.appointment_datetime).format('dddd')}</Text>
                                </View>
                                {/* service and duration View */}
                                <View style={{ width: "55%", padding: 5, paddingLeft: 20 }}>
                                    <View style={{
                                        flexDirection: "row",
                                        // backgroundColor:"green",
                                        width: "100%",
                                        flexWrap: 'wrap',
                                        flexGrow: 0,
    
                                    }}>
                                        {
                                           item.services.length > 2 ? item.services.map((service, index) => {
                                                return index < 3 && (
                                                    <Text style={{
                                                        // fontSize: 20,
                                                        color: colors.greybg
                                                    }}>{service.service}{index<2 ? ', ' : '...'}</Text>)
                                                
                                            }) :
                                            item.services.map((service , index) => {
                                                return (
                                                    <Text style={{
                                                        // fontSize: 20,
                                                        color: colors.greybg
                                                    }}>{service.service}{index<item.services.length-1 && ', ' }</Text>)
                                                
                                            })
                                        }
                                    </View>
                                    <Text
                                        style={{
                                            // fontSize: 20,
                                            color: colors.greybg
                                        }}>{item.services.reduce((duration, service) => (duration += parseInt(service.duration)), 0)} min</Text>
                                </View>
                                {/* Price and payment method*/}
                                <View style={{justifyContent:"space-between",height:50, width:100 }} >
                                    <Text style={{color: colors.greybg, textAlign:"left"}}>{item.payment_method}</Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            textAlign:"left",
                                            color: colors.greybg
                                        }}>Price {item.services.reduce((price, service) => (price += parseInt(service.price)), 0)}</Text>
                                </View>
                            </CardItem>
                        </Card>
                    )
                    }
                    keyExtractor={item => item.id}
                />
                : <NotFound from="schedule"/>
    
                }
            </Content>
        </Container>
    )
}
export default Sheduled