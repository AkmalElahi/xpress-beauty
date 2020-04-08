import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { Container, Card, CardItem, Thumbnail, Item, Button } from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import user from '../../../assets/user.png'
import chat from '../../../assets/chat.png'
import location from '../../../assets/location.png'

const NotificationsList = ({ jobs, handleRefresh, refreshing, navigation }) => {
    console.log("JOBS IN LIST", jobs)
    return (
        <Container>
            <FlatList
                refreshing={refreshing}
                onRefresh={handleRefresh}
                data={jobs}
                renderItem={({ item }) => (
                    <Card style={{ width: "95%", alignSelf: "center" }}>
                        <CardItem style={{ height: 10, alignSelf: "flex-end", justifyContent: "center" }}>
                            <Image source={location} style={{ width: 20, height: 20 }} />
                            <Text style={{ textAlign: "center" }}>{item.distance}</Text>
                        </CardItem>
                        <View style={{ flexDirection: "row" }}>
                            <CardItem style={{ width: '20%', paddingTop: 0, paddingBottom: 35 }}>
                                <Thumbnail source={user} style={{ width: 40, height: 40 }} />
                            </CardItem>
                            <CardItem style={{ flexDirection: 'column', paddingLeft: 0, alignItems: "flex-start", width: "80%" }}>
                                <Text>{item.customer_name}</Text>
                                <View style={{ flexWrap: "wrap", flexDirection: "row", width: "100%" }}>
                                    {item.services.map((service, index) => {
                                        if (index <= 3) {
                                            return <Text
                                                style={{
                                                    padding: 4,
                                                    paddingVertical: 1,
                                                    margin: 2,
                                                    borderColor: "grey",
                                                    borderWidth: 0.5,
                                                    borderRadius: 25
                                                }}>
                                                {service.service}
                                            </Text>
                                        }
                                    })}
                                    {item.services.length > 4 && <Text style={{ fontSize: 20 }}>...</Text>}
                                </View>
                                <View style={{
                                    alignSelf: "flex-end",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: '40%'
                                }}>
                                    <Image source={chat}
                                        style={{
                                            width: 25,
                                            height: 25
                                        }} />
                                    <TouchableOpacity
                                        onPress={()=>navigation.navigate("jobDetail", {
                                            job:item
                                        })}
                                        style={{
                                            borderRadius: 25,
                                            borderWidth: 1,
                                            backgroundColor: "#5b4e95",
                                            width: 60
                                        }}><Text style={{ color: "white", textAlign: "center" }}>Details</Text></TouchableOpacity>
                                </View>
                            </CardItem>
                        </View>
                    </Card>
                )}
                keyExtractor={item => item.id}
            />
        </Container>
    )
}

export default NotificationsList