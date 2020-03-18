import React, { useState } from 'react';

import { connect } from 'react-redux'

import { Container, Content, View, Text, Card, CardItem } from 'native-base';
import { Image, StyleSheet, FlatList } from 'react-native';
import clock from '../../assets/clock.png'
import facialBanner from '../../assets/facialbanner.png';
import { colors } from '../../configs/colors';
import { RoundButton } from '../buttons/Buttons'
import DetailsModal from '../../components/Modal/service.details.modal'

const Tab = ({ services, serviceId, onPress }) => {
    const [modalVisible, closeModal] = useState(false)
    const [service, setService] = useState(null)
    return (
        <Container>
            {console.log("FACIAL COMPONENT", services)}
            <Content>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: services[0].image }} style={styles.img} />
                </View>
                <FlatList
                    // contentContainerStyle={{
                    //     flexDirection: 'row',
                    //     flexWrap: 'wrap',
                    //     flex: 1,
                    //     alignItems: "center"
                    // }}
                    data={services}
                    renderItem={({ item, index }) => (
                        <View style={{ width: "100%", borderBottomColor: "grey", borderBottomWidth: 0.3 }} >
                            <Card transparent style={styles.listCard} >
                                <CardItem
                                    button
                                    onPress={() => onPress(item)}
                                    style={{
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        width: "70%",
                                    }}>
                                    <Text style={{ fontWeight: "normal", textAlign: "left", fontSize: 18, width: "100%", }}>{item.service}</Text>
                                    <View style={{ flexDirection: "row", justifyContent: "flex-start", width: "100%", }}>
                                        <Image source={clock} style={{ width: 18, height: 18, }} />
                                        <Text style={{ textAlign: "left", justifyContent: "center", alignItems: "center", paddingLeft: 1 }}>{item.duration} mins</Text>
                                        <Text style={{ textAlign: "left", paddingLeft: 5 }}>Rs. {item.price}</Text>
                                    </View>
                                    { service &&<DetailsModal
                                        close={() => closeModal(false)}
                                        // DetailsModal={true}
                                        modalVisible={modalVisible}
                                        service={service}
                                        // serviceName={item.service}
                                        // details={item.description}
                                        duration={item.duration} />}
                                </CardItem>
                                <CardItem style={{
                                    justifyContent: 'center',
                                    width: "30%"
                                }}>
                                    <RoundButton
                                        ser
                                        backgroundColor={colors.primaryBtn}
                                        color="white"
                                        height={20}
                                        value="More Details"
                                        fontSize={10}
                                        onPress={() => {
                                            closeModal(true)
                                            setService(item)
                                        }} />
                                </CardItem>

                            </Card>
                        </View>
                    )
                    }
                    keyExtractor={item => item.id}
                />
            </Content>
        </Container>
    )
}


const styles = StyleSheet.create({
    imageContainer: {
        height: 175,
        width: "100%",
    },
    img: {
        width: "100%",
        height: "100%"
    },
    listCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"

    }
})

// const mapStateToProps = ({ services }) => (
//     services
// )
export default Tab;